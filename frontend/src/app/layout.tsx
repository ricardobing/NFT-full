import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Web3Provider";
import { CustomConnectButton } from "@/components/ConnectButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT Staking Demo",
  description: "Mint, Stake and Earn Rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen`}>
        <Providers>
          <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">D</div>
                <span className="font-bold text-xl tracking-tight">NFT STAKING</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="/" className="hover:text-blue-400 transition-colors">Mint</a>
                <a href="/staking" className="hover:text-blue-400 transition-colors">Staking</a>
                <div id="connect-button-container">
                  <CustomConnectButton />
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
