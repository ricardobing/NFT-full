'use client';

import { useAccount, useReadContract } from 'wagmi';
import { DEMO_NFT_ABI, DEMO_NFT_ADDRESS, NFT_STAKING_ABI, NFT_STAKING_ADDRESS, REWARD_TOKEN_ABI, REWARD_TOKEN_ADDRESS } from '@/contracts';
import { formatEther } from 'viem';

export function useNFTData() {
    const { address } = useAccount();

    const { data: balance, refetch: refetchBalance } = useReadContract({
        address: DEMO_NFT_ADDRESS as `0x${string}`,
        abi: DEMO_NFT_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    const { data: totalSupply, refetch: refetchTotal } = useReadContract({
        address: DEMO_NFT_ADDRESS as `0x${string}`,
        abi: DEMO_NFT_ABI,
        functionName: 'totalSupply',
    });

    const refetch = () => {
        refetchBalance();
        refetchTotal();
    };

    return { balance: Number(balance || 0), totalSupply: Number(totalSupply || 0), refetch };
}

export function useStakingData() {
    const { address } = useAccount();

    const { data: stakedTokens, refetch } = useReadContract({
        address: NFT_STAKING_ADDRESS as `0x${string}`,
        abi: NFT_STAKING_ABI,
        functionName: 'getStakedTokens',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    return { stakedTokens: (stakedTokens as bigint[] || []).map(t => Number(t)), refetch };
}

export function useTokenBalance() {
    const { address } = useAccount();

    const { data: balance, refetch } = useReadContract({
        address: REWARD_TOKEN_ADDRESS as `0x${string}`,
        abi: REWARD_TOKEN_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    return { balance: balance ? formatEther(balance as bigint) : '0', refetch };
}
