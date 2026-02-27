/**
 * Wallet state slice for Zustand store
 * Manages wallet connection status and address (BNB Chain only).
 * Actual wallet connection is handled by BNB integration in lib/bnb/wallet.ts and Privy.
 */

import { StateCreator } from "zustand";

export type BnbNetwork = 'BNB' | null;

export interface WalletState {
  address: string | null;
  walletBalance: number;
  isConnected: boolean;
  isConnecting: boolean;
  network: BnbNetwork;
  preferredNetwork: BnbNetwork;
  error: string | null;
  isConnectModalOpen: boolean;

  connect: () => Promise<void>;
  disconnect: () => void;
  refreshWalletBalance: () => Promise<void>;
  clearError: () => void;
  setConnectModalOpen: (open: boolean) => void;

  setAddress: (address: string | null) => void;
  setIsConnected: (connected: boolean) => void;
  setNetwork: (network: BnbNetwork) => void;
  setPreferredNetwork: (network: BnbNetwork) => void;
}

export const createWalletSlice: StateCreator<WalletState> = (set, get) => ({
  address: null,
  walletBalance: 0,
  isConnected: false,
  isConnecting: false,
  network: null,
  preferredNetwork: typeof window !== 'undefined' ? (localStorage.getItem('bynomo_preferred_network') as BnbNetwork) || null : null,
  error: null,
  isConnectModalOpen: false,

  connect: async () => {
    set({ isConnectModalOpen: true });
  },

  disconnect: () => {
    const state = get() as any;
    const accountType = state.accountType;
    set({
      address: null,
      walletBalance: 0,
      isConnected: false,
      isConnecting: false,
      network: null,
      error: null
    } as any);
    const currentAccessCode = state.accessCode;
    if (accountType !== 'demo' && !currentAccessCode) {
      set({
        username: null,
        accessCode: null
      } as any);
    }
  },

  refreshWalletBalance: async () => {
    const { address, isConnected, network } = get();
    if (!isConnected || !address || network !== 'BNB') return;
    try {
      const { getBNBBalance } = await import('@/lib/bnb/client');
      const bal = await getBNBBalance(address);
      set({ walletBalance: bal });
    } catch (error) {
      console.error("Error refreshing wallet balance:", error);
    }
  },

  clearError: () => set({ error: null }),
  setConnectModalOpen: (open: boolean) => set({ isConnectModalOpen: open }),
  setAddress: (address: string | null) => set({ address }),
  setIsConnected: (connected: boolean) => set({ isConnected: connected }),

  setNetwork: (network: BnbNetwork) => set({ network }),

  setPreferredNetwork: (network: BnbNetwork) => {
    set({ preferredNetwork: network });
    if (typeof window !== 'undefined') {
      if (network) localStorage.setItem('bynomo_preferred_network', network);
      else localStorage.removeItem('bynomo_preferred_network');
    }
  }
});
