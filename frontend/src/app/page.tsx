'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DEMO_NFT_ABI, DEMO_NFT_ADDRESS } from '@/contracts';
import { useNFTData, useTokenBalance } from '@/hooks/useWeb3';
import { useState, useEffect } from 'react';
import { Loader2, Zap, Rocket, Shield, Trophy, Fingerprint } from 'lucide-react';

export default function Home() {
  const { isConnected } = useAccount();
  const { balance: actualBalance, totalSupply: actualTotal } = useNFTData();
  const { balance: actualTokenBalance, refetch: refetchTokens } = useTokenBalance();
  const [isMinting, setIsMinting] = useState(false);

  // Demo fallback values
  const balance = isConnected ? actualBalance : 3;
  const totalSupply = isConnected ? actualTotal : 157;
  const tokenBalance = isConnected ? actualTokenBalance : "1250.45";

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      setIsMinting(false);
      refetchTokens?.();
    }
  }, [isSuccess, refetchTokens]);

  const handleMint = async () => {
    try {
      setIsMinting(true);
      writeContract({
        address: DEMO_NFT_ADDRESS as `0x${string}`,
        abi: DEMO_NFT_ABI,
        functionName: 'mint',
      });
    } catch (err) {
      console.error(err);
      setIsMinting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-24 py-16 animate-in fade-in duration-1000">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse decoration-1000" />
      </div>

      <div className="text-center space-y-8 max-w-4xl px-4 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
          <Rocket size={14} className="animate-bounce" />
          Next-Gen Asset Protocol
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] italic">
          GENERATE. <br />
          <span className="bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">LOCK. EARN.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
          The most advanced NFT staking demo. Secure your units in the vault and generate yields with extreme rarity multipliers.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <FeatureBadge icon={<Shield size={16} />} text="Audited Security" />
          <FeatureBadge icon={<Trophy size={16} />} text="Rarity Based Yield" />
          <FeatureBadge icon={<Fingerprint size={16} />} text="Unique DNA" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl px-4">
        <StatCard label="Your Units" value={balance.toString()} subLabel="Active Inventory" />
        <StatCard label="Global Supply" value={totalSupply.toString()} subLabel="Minted To Date" />
        <StatCard
          label="Reserve Balance"
          value={`${parseFloat(tokenBalance).toFixed(2)}`}
          subLabel="$DMRT Tokens"
          highlight
        />
      </div>

      <div className="relative group perspective-1000">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-[#0a0a0c] p-12 rounded-[3rem] border border-white/10 flex flex-col items-center space-y-10 shadow-2xl backdrop-blur-3xl transform transition-transform duration-500 group-hover:rotate-x-2 group-hover:rotate-y-2">
          <div className="w-64 h-64 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-black p-1">
            <div className="w-full h-full rounded-[2.2rem] bg-slate-950 overflow-hidden relative border border-white/5 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${totalSupply}`}
                alt="NFT Preview"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
                <div className="w-1 h-1 rounded-full bg-blue-500/50" />
              </div>
            </div>
          </div>

          <div className="w-full space-y-4">
            {!isConnected ? (
              <div className="scale-110 transform flex justify-center">
                <ConnectButton />
              </div>
            ) : (
              <button
                onClick={handleMint}
                disabled={isMinting || isConfirming}
                className="group/btn w-full py-6 px-12 bg-white text-black hover:bg-blue-500 hover:text-white disabled:bg-slate-800 disabled:text-slate-500 rounded-3xl font-black text-xl transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-blue-500/40 relative overflow-hidden active:scale-95"
              >
                {isMinting || isConfirming ? (
                  <>
                    <Loader2 className="animate-spin" />
                    PROCESSING MINT...
                  </>
                ) : (
                  <>
                    <Zap className="fill-current text-blue-500 group-hover/btn:text-white transition-colors" />
                    AUTHORIZE MINT
                  </>
                )}
              </button>
            )}
            <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              GAS FEES APPLY · SEPOLIA TESTNET ONLY
            </p>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="fixed bottom-12 right-12 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(37,99,235,0.4)] animate-in slide-in-from-right-10 border border-blue-400 font-bold flex items-center gap-4">
          <Trophy className="text-yellow-400" />
          Unit Successfully Minted!
        </div>
      )}
    </div>
  );
}

function FeatureBadge({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 text-xs font-bold whitespace-nowrap">
      {icon} {text}
    </div>
  );
}

function StatCard({ label, value, subLabel, highlight = false }: { label: string, value: string, subLabel: string, highlight?: boolean }) {
  return (
    <div className={`
            p-10 rounded-[3rem] border transition-all duration-500 
            ${highlight
        ? 'bg-blue-600/10 border-blue-500/30'
        : 'bg-slate-900/40 border-white/5 hover:border-white/10'}
        `}>
      <div className="flex flex-col space-y-4">
        <span className={`text-xs font-black uppercase tracking-[0.2em] ${highlight ? 'text-blue-400' : 'text-slate-500'}`}>
          {label}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black tracking-tighter italic">{value}</span>
          {highlight && <span className="text-xl font-bold text-blue-400">$DMRT</span>}
        </div>
        <span className="text-sm font-medium text-slate-400">
          {subLabel}
        </span>
      </div>
    </div>
  );
}
