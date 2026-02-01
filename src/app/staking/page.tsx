'use client';

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DEMO_NFT_ABI, DEMO_NFT_ADDRESS, NFT_STAKING_ABI, NFT_STAKING_ADDRESS } from '@/contracts';
import { useStakingData } from '@/hooks/useWeb3';
import { useState, useEffect, useMemo } from 'react';
import { Loader2, Coins, ArrowUpCircle, ArrowDownCircle, Zap } from 'lucide-react';
import { formatEther } from 'viem';
import Link from 'next/link';
import Image from 'next/image';

export default function StakingPage() {
    const { address, isConnected } = useAccount();
    const { stakedTokens } = useStakingData();
    const [isActionLoading, setIsActionLoading] = useState(false);

    // Demo Mode rewards (Hardcoded for demo visual)
    const [demoRewards] = useState('42.85');

    // Read non-staked NFTs of user
    const { data: balanceData, refetch: refetchBalance } = useReadContract({
        address: DEMO_NFT_ADDRESS as `0x${string}`,
        abi: DEMO_NFT_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    const { writeContract, data: hash } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isActionSuccess } = useWaitForTransactionReceipt({ hash });

    // Compute user NFTs based on balanceData instead of using useEffect/setState
    const userNFTs = useMemo(() => {
        if (balanceData && address) {
            const balance = Number(balanceData);
            return Array.from({ length: balance }, (_, i) => i);
        }
        return [];
    }, [balanceData, address]);

    // Handle Action Completion
    useEffect(() => {
        if (isActionSuccess) {
            refetchBalance();
            const timer = setTimeout(() => {
                setIsActionLoading(false);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [isActionSuccess, refetchBalance]);

    // Demo Mode logic: populate with mock data if not connected
    const displayInventory = isConnected ? userNFTs : [12, 45, 89];
    const displayStaked = isConnected ? stakedTokens : [5, 23];
    const displayRewards = isConnected ? '0.00' : demoRewards; // Real rewards will be handled by contract read later

    const handleStake = async (tokenId: number) => {
        setIsActionLoading(true);
        try {
            writeContract({
                address: NFT_STAKING_ADDRESS as `0x${string}`,
                abi: NFT_STAKING_ABI,
                functionName: 'stake',
                args: [[BigInt(tokenId)]],
            });
        } catch (err) {
            console.error(err);
            setIsActionLoading(false);
        }
    };

    const handleUnstake = async (tokenId: number) => {
        setIsActionLoading(true);
        try {
            writeContract({
                address: NFT_STAKING_ADDRESS as `0x${string}`,
                abi: NFT_STAKING_ABI,
                functionName: 'unstake',
                args: [[BigInt(tokenId)]],
            });
        } catch (err) {
            console.error(err);
            setIsActionLoading(false);
        }
    };

    return (
        <div className="space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase italic text-blue-500">STAKING VAULT</h1>
                    <p className="text-slate-400 mt-2 font-medium">Earn daily passive income by locking your unique digital assets.</p>
                </div>
                <div className="bg-linear-to-br from-blue-600/20 to-purple-600/10 border border-blue-500/30 px-8 py-5 rounded-3xl flex items-center gap-6 backdrop-blur-xl shadow-2xl shadow-blue-900/20 group hover:border-blue-400/50 transition-all duration-500">
                    <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-600/40 group-hover:scale-110 transition-transform">
                        <Coins size={32} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Estimated Rewards</span>
                        <span className="text-3xl font-mono font-black text-white">{displayRewards} <span className="text-blue-500 text-lg">$DMRT</span></span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Available NFTs */}
                <div className="space-y-8 bg-slate-900/30 p-8 rounded-[2rem] border border-slate-800/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500">
                                <ArrowUpCircle size={24} />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight">Your Inventory</h2>
                        </div>
                        <span className="bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                            {displayInventory.length} Total
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {displayInventory.length === 0 ? (
                            <div className="col-span-full py-20 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500 space-y-4 group">
                                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                                    <Zap size={24} />
                                </div>
                                <p className="font-medium">No NFTs detected in wallet</p>
                                <Link href="/" className="px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-blue-500 hover:text-white transition-all scale-95 hover:scale-100 uppercase text-xs">Mint New NFT</Link>
                            </div>
                        ) : (
                            displayInventory.map(id => (
                                <NFTCard key={id} id={id} onAction={() => handleStake(id)} actionLabel="Lock into Vault" isLoading={isActionLoading || isConfirming} />
                            ))
                        )}
                    </div>
                </div>

                {/* Staked NFTs */}
                <div className="space-y-8 bg-purple-900/10 p-8 rounded-[2rem] border border-purple-800/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-500">
                                <ArrowDownCircle size={24} />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-purple-100">Vaulted Assets</h2>
                        </div>
                        <span className="bg-purple-900/30 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                            {displayStaked.length} Staked
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {displayStaked.length === 0 ? (
                            <div className="col-span-full py-20 border-2 border-dashed border-purple-800/20 rounded-3xl flex flex-col items-center justify-center text-slate-500 space-y-4 group">
                                <div className="w-16 h-16 bg-purple-950/30 rounded-full flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
                                    <ArrowDownCircle size={24} className="text-purple-700" />
                                </div>
                                <p className="font-medium text-purple-400/50 italic underline decoration-dotted underline-offset-4">Vault is currently empty</p>
                            </div>
                        ) : (
                            displayStaked.map(id => (
                                <NFTCard key={id} id={id} onAction={() => handleUnstake(id)} actionLabel="Release & Claim" variant="purple" isLoading={isActionLoading || isConfirming} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function NFTCard({ id, onAction, actionLabel, variant = 'blue', isLoading }: { id: number, onAction: () => void, actionLabel: string, variant?: 'blue' | 'purple', isLoading?: boolean }) {
    const rarities = ['COMMON', 'RARE', 'EPIC', 'LEGENDARY'];
    const rarity = rarities[id % 4];

    return (
        <div className="bg-slate-950 border border-white/5 rounded-[2.5rem] p-5 group hover:border-blue-500/50 transition-all duration-700 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
                <div className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter shadow-lg ${variant === 'blue' ? 'bg-blue-600 text-white shadow-blue-500/20' : 'bg-purple-600 text-white shadow-purple-500/20'
                    }`}>
                    {rarity}
                </div>
            </div>

            <div className="flex flex-col space-y-5">
                <div className="aspect-square bg-linear-to-br from-slate-900 to-black rounded-4xl overflow-hidden border border-white/10 relative group-hover:scale-[1.02] transition-transform duration-500">
                    <Image
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`}
                        alt={`NFT #${id}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors pointer-events-none" />
                </div>

                <div className="flex flex-col space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Unit Designation</span>
                    <span className="text-xl font-black text-slate-100 tracking-tight italic uppercase">DNFT Proto-{id.toString().padStart(3, '0')}</span>
                </div>

                <button
                    onClick={onAction}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[12px] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group/btn ${variant === 'blue'
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-blue-600/50'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_10px_20px_rgba(147,51,234,0.3)] hover:shadow-purple-600/50'
                        } disabled:opacity-50 disabled:grayscale`}
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            <span>{actionLabel}</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
