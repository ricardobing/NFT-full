import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Use environment variable or fallback to demo project id
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'a01e2f3b4c5d6e7f8g9h0i1j2k3l4m5n' // Demo fallback

export const config = getDefaultConfig({
    appName: 'NFT Staking Demo',
    projectId: projectId,
    chains: [sepolia],
    ssr: true,
    transports: {
        [sepolia.id]: http(),
    },
})
