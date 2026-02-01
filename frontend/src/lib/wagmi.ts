import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = 'YOUR_PROJECT_ID' // Demo project id

export const config = getDefaultConfig({
    appName: 'NFT Staking Demo',
    projectId: projectId,
    chains: [sepolia],
    ssr: true,
    transports: {
        [sepolia.id]: http(),
    },
})
