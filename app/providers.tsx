'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useBynomoStore } from '@/lib/store';
import { ToastProvider } from '@/components/ui/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth';
import { bsc } from 'viem/chains';
import { WagmiProvider, useAccount } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import { config as wagmiConfig } from '@/lib/bnb/wagmi';

// Custom Components
import { WalletConnectModal } from '@/components/wallet/WalletConnectModal';
import { ReferralSync } from './ReferralSync';

// Wallet Sync component to bridge all wallet states with our Zustand store
function WalletSync() {
  const { user, authenticated, ready: privyReady } = usePrivy();
  const { wallets: privyWallets } = useWallets();
  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount();

  const {
    address,
    accountType,
    setAddress,
    setIsConnected,
    setNetwork,
    refreshWalletBalance,
    fetchProfile,
    preferredNetwork
  } = useBynomoStore();


  // Main Sync Effect
  useEffect(() => {
    // 0. Check Demo Mode (Priority)
    if (accountType === 'demo') {
      if (address !== '0xDEMO_1234567890') {
        setAddress('0xDEMO_1234567890');
        setIsConnected(true);
        setNetwork('BNB');
      }
      return;
    }

    // 1. Check BNB (Wagmi or Privy)
    if (preferredNetwork === 'BNB') {
      if (wagmiConnected && wagmiAddress) {
        if (address !== wagmiAddress) {
          setAddress(wagmiAddress);
          setIsConnected(true);
          setNetwork('BNB');
          refreshWalletBalance();
          fetchProfile(wagmiAddress);
        }
        return;
      }
      if (privyReady && authenticated && privyWallets[0]) {
        const addr = privyWallets[0].address;
        if (address !== addr) {
          setAddress(addr);
          setIsConnected(true);
          setNetwork('BNB');
          refreshWalletBalance();
          fetchProfile(addr);
        }
        return;
      }
    }

    // 2. Cleanup/Sync Decision
    const state = useBynomoStore.getState();
    const isDemoMode = state.accountType === 'demo';
    const hasBNB = (wagmiConnected && !!wagmiAddress) || (privyReady && authenticated && !!privyWallets[0]);

    // Determine if we should clear
    let shouldClear = false;

    // If we are in demo mode, NEVER clear the address (wait for manual exit)
    if (isDemoMode) {
      shouldClear = false;
    } else {
      if (preferredNetwork === 'BNB' && !hasBNB) shouldClear = true;
      else if (!preferredNetwork && !hasBNB) shouldClear = true;
    }

    if (shouldClear && address !== null) {
      setAddress(null);
      setIsConnected(false);
      setNetwork(null);
    }
  }, [
    user, authenticated, privyWallets, privyReady,
    wagmiAddress, wagmiConnected,
    preferredNetwork, address, accountType,
    setAddress, setIsConnected, setNetwork, refreshWalletBalance, fetchProfile
  ]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initializeApp = async () => {
      try {
        const { updateAllPrices, loadTargetCells, startGlobalPriceFeed } = useBynomoStore.getState();

        await loadTargetCells().catch(console.error);
        const stopPriceFeed = startGlobalPriceFeed(updateAllPrices);
        setIsReady(true);
        return () => { if (stopPriceFeed) stopPriceFeed(); };
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'cm7377f0a00gup9u2w4m3v6be';

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="dark">
          <PrivyProvider
            appId={PRIVY_APP_ID}
            config={{
              appearance: {
                theme: 'dark',
                accentColor: '#A855F7',
                showWalletLoginFirst: true,
              },
              supportedChains: [bsc],
              defaultChain: bsc,
              embeddedWallets: {
                createOnLogin: 'users-without-wallets',
              },
            }}
          >
            <WalletSync />
            <ReferralSync />
            {children}
            <WalletConnectModal />
            <ToastProvider />
          </PrivyProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
