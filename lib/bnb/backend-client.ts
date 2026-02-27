/**
 * BNB Smart Chain (BSC) Backend Client
 * Used for administrative operations like withdrawals
 */

import { ethers } from 'ethers';
import { getBNBConfig } from './config';

/**
 * Get the treasury wallet for backend operations
 */
export function getTreasuryWallet(): ethers.Wallet {
    const config = getBNBConfig();
    const secretKey = process.env.BNB_TREASURY_SECRET_KEY;

    if (!secretKey) {
        throw new Error('BNB_TREASURY_SECRET_KEY is not configured');
    }

    const provider = new ethers.JsonRpcProvider(config.rpcEndpoint);
    return new ethers.Wallet(secretKey, provider);
}

/**
 * Transfer BNB from treasury to a user
 */
export async function transferBNBFromTreasury(
    toAddress: string,
    amountBNB: number
): Promise<string> {
    try {
        const wallet = getTreasuryWallet();
        if (!wallet.provider) {
            throw new Error('Treasury wallet has no provider configured');
        }
        // Round to 18 decimals to avoid floating-point precision issues (e.g. 0.000009800000000000001)
        const safeAmountStr = Number(amountBNB).toFixed(18);
        const amountWei = ethers.parseEther(safeAmountStr);

        const balance = await wallet.provider.getBalance(wallet.address);
        const gasEstimate = ethers.parseEther('0.001'); // rough gas buffer
        if (balance < amountWei + gasEstimate) {
            throw new Error(
                `Treasury has insufficient BNB. Balance: ${ethers.formatEther(balance)} BNB, required: ${amountBNB} BNB + gas. Please top up the treasury address: ${wallet.address}`
            );
        }

        const tx = await wallet.sendTransaction({
            to: toAddress,
            value: amountWei,
        });

        console.log(`Withdrawal transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log(`Withdrawal transaction confirmed: ${tx.hash}`);

        return tx.hash;
    } catch (error) {
        console.error('Failed to transfer BNB from treasury:', error);
        throw error;
    }
}
