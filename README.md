# 🚀 Next-Gen NFT Staking Ecosystem

![Banner](https://api.dicebear.com/7.x/avataaars/svg?seed=staking-demo&backgroundColor=b6e3f4)

Una plataforma DApp profesional y lista para producción que integra un ecosistema completo de **NFTs con rarezas, Staking de activos y Recompensas en Tokens ERC-20**. Diseñada con una estética futurista y de alto impacto para impresionar a clientes y usuarios.

## ✨ Características Principales

### 🎨 NFT Collection (ERC-721)
- **Sistema de Rarezas**: Algoritmo on-chain que asigna rareza al azar (Common, Rare, Epic, Legendary) en el momento del mint.
- **Arte Dinámico**: Integración con DiceBear API para generar avatares únicos basados en el `tokenId`.
- **Enumerable**: Optimizado para lectura rápida de inventarios de usuario.

### 🥩 Premium Staking Vault
- **Yield dinámico**: Gana tokens `$DMRT` por cada hora que tu NFT esté bloqueado.
- **Multiplicadores por Rareza**:
  - `Common`: 1x Rewards
  - `Rare`: 2x Rewards
  - `Epic`: 5x Rewards
  - `Legendary`: 10x Rewards
- **Safe Custody**: Transferencias seguras hacia el contrato de la bóveda (Vault).

### 🪙 Reward Token ($DMRT)
- **Utility Token**: Token ERC-20 diseñado para recompensar a los holders.
- **Estructura de Minting**: Solo el contrato de Staking tiene permisos para emitir nuevos tokens como recompensa.

### 🖥️ Frontend High-Fidelity
- **Next.js 15 + Tailwind CSS**: Rendimiento ultrarrápido y diseño responsive.
- **RainbowKit & Wagmi**: La mejor experiencia de conexión de wallet (MetaMask, Coinbase, WalletConnect).
- **Glassmorphism Design**: Interfaz moderna con efectos de cristal, gradientes dinámicos y micro-animaciones.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Blockchain** | Solidity, Hardhat, OpenZeppelin |
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| **Web3 Library** | Wagmi v2, Viem, RainbowKit |
| **Animations** | Framer Motion, Lucide React |

---

## 🚀 Guía de Inicio Rápido

### 1. Clonar y Configurar
```bash
git clone https://github.com/ricardobing/NFT-full.git
cd NFT-full
npm install
```

### 2. Variables de Entorno
Crea un archivo `.env` en la raíz (usa `.env.example` como base):
```env
SEPOLIA_RPC_URL=tu_rpc_url
PRIVATE_KEY=tu_wallet_private_key
ETHERSCAN_API_KEY=tu_api_key
```

### 3. Smart Contracts
Compila y despliega en la testnet de Sepolia:
```bash
npx hardhat --config hardhat.config.cjs run scripts/deploy.js --network sepolia
```
*Nota: El script configurará automáticamente los permisos de minting para el contrato de Staking.*

### 4. Frontend Setup
Copia las direcciones de los contratos desplegados en `frontend/src/contracts/index.ts` y luego:
```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Estética del Proyecto

El frontend utiliza una paleta de colores **Slate-950** con acentos en **Blue-600** y **Purple-600**, creando una atmósfera de "protocolo institucional descentralizado". Todas las transacciones incluyen estados de carga visuales y notificaciones de éxito optimizadas.

## 📝 Roadmap & Mejoras (Opcionales)
- [ ] Integración de Subgraph (The Graph) para indexación avanzada.
- [ ] Sistema de Governance (Snapshot) basado en el Token $DMRT.
- [ ] Marketplace interno para intercambio de unidades.

---

Desarrollado con ❤️ para la comunidad Web3. 🚀
