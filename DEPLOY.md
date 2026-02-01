# NFT Staking DApp - Demo Mode Enabled 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/nft-staking-demo)

Una aplicación descentralizada (DApp) Full-Stack que combina NFTs, Staking y Tokens de Recompensa ERC-20, con **Demo Mode** para presentaciones sin wallet conectada.

## 🌟 Características

- **Mint NFTs**: Genera tokens únicos con metadatos dinámicos
- **Staking Vault**: Bloquea tus NFTs para generar recompensas pasivas
- **Reward Token**: Gana tokens $DMRT por hacer staking
- **Demo Mode**: Muestra datos ficticios cuando no hay wallet conectada
- **UI/UX Premium**: Diseño moderno con Tailwind CSS y animaciones

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Wagmi v3** + **viem v2**
- **RainbowKit** para conexión de wallets
- **Framer Motion** para animaciones

### Smart Contracts
- **Solidity 0.8.20**
- **Hardhat** para desarrollo y testing
- **OpenZeppelin Contracts** para estándares seguros
- **Sepolia Testnet** para despliegue

## 🚀 Deploy en Vercel (Recomendado)

### Opción 1: Deploy Directo con Botón
1. Haz clic en el botón "Deploy with Vercel" arriba
2. Conecta tu repositorio de GitHub
3. Vercel detectará automáticamente la configuración de Next.js
4. ¡Deploy completado! Tu DApp estará disponible en segundos

### Opción 2: Deploy Manual
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. En la raíz del proyecto
vercel

# 3. Seguir las instrucciones
# Framework Preset: Next.js
# Root Directory: ./
# Build Command: npm run build
# Output Directory: .next
```

### Variables de Entorno (Opcional)
Si deseas conectar contratos reales, agrega estas variables en Vercel:
```
NEXT_PUBLIC_DEMO_NFT_ADDRESS=0x...
NEXT_PUBLIC_STAKING_ADDRESS=0x...
NEXT_PUBLIC_REWARD_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_ENABLE_TESTNETS=true
```

## 💻 Desarrollo Local

### Prerequisitos
- Node.js 18+ 
- npm o yarn
- MetaMask u otra wallet compatible

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repo>
cd nft-full-eco

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Compilar Contratos (Opcional)

```bash
# Compilar contratos Solidity
npm run hh:compile

# Ejecutar tests
npm run hh:test

# Deploy local (Hardhat Network)
npm run hh:deploy
```

## 🎭 Demo Mode Explicado

El **Demo Mode** es una característica especial que permite mostrar la funcionalidad de la DApp sin necesidad de conectar una wallet real:

- **Sin conexión**: Muestra 3 NFTs ficticios y un balance de 1250 $DMRT
- **Con conexión**: Carga datos reales del blockchain

Esto es perfecto para:
- ✅ Presentaciones a clientes
- ✅ Testing de UI/UX sin gas
- ✅ Demos en eventos sin setup previo

### Implementación Técnica

```typescript
// En src/app/page.tsx
const balance = isConnected ? actualBalance : 3;
const tokenBalance = isConnected ? actualTokenBalance : "1250.45";
```

## 📂 Estructura del Proyecto

```
nft-full-eco/
├── src/                    # Frontend Next.js
│   ├── app/               # App Router (Next.js 15)
│   │   ├── page.tsx      # Minting Page
│   │   └── staking/
│   │       └── page.tsx  # Staking Dashboard
│   ├── components/        # Componentes reutilizables
│   ├── hooks/            # Custom hooks (useWeb3)
│   ├── lib/              # Configuración Wagmi
│   └── providers/        # Context providers
├── contracts/             # Smart Contracts Solidity
│   ├── DemoNFT.sol
│   ├── NFTStaking.sol
│   └── RewardToken.sol
├── artifacts/            # ABIs compilados
├── scripts/              # Scripts de deployment
├── next.config.ts        # Configuración Next.js
├── vercel.json          # Configuración Vercel
└── package.json
```

## 🔧 Configuraciones Importantes

### next.config.ts
- Optimizado para ignorar archivos de Hardhat durante build
- Configuración de webpack para Vercel

### vercel.json
- Define el framework y comandos de build
- Optimizado para deployments en Edge Network

### .vercelignore
- Excluye cache y artifacts innecesarios
- Reduce el tamaño del bundle

## 🌐 Rutas de la Aplicación

- `/` - Página de Minting de NFTs
- `/staking` - Dashboard de Staking

Ambas rutas funcionan con y sin wallet conectada gracias al Demo Mode.

## 🎨 Personalización

### Cambiar Colores
Edita `src/app/globals.css` y las clases de Tailwind en los componentes.

### Cambiar Direcciones de Contratos
Edita `src/contracts/index.ts`:
```typescript
export const DEMO_NFT_ADDRESS = '0x...';
export const NFT_STAKING_ADDRESS = '0x...';
export const REWARD_TOKEN_ADDRESS = '0x...';
```

### Cambiar Red (Network)
Edita `src/lib/wagmi.ts` y cambia la configuración de chains.

## 📊 Testing

### Frontend
```bash
npm run dev
# Visitar http://localhost:3000
```

### Smart Contracts
```bash
npm run hh:test
```

## 🐛 Troubleshooting

### Error 404 en Vercel
- ✅ **Solucionado**: La configuración actual en `vercel.json` y `next.config.ts` está optimizada
- Verifica que Root Directory esté en `./` (raíz)
- Asegúrate de que `npm run build` funcione localmente

### Problemas de Build
```bash
# Limpiar caché
rm -rf .next node_modules
npm install
npm run build
```

### Wallet no Conecta
- Asegúrate de estar en Sepolia Testnet
- Verifica que MetaMask esté actualizado
- Revisa la consola del navegador para errores

## 📝 Licencia

MIT License - Libre para usar en proyectos personales y comerciales

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor abre un Issue o Pull Request.

---

**Hecho con ❤️ para la comunidad Web3**

*¿Preguntas? Abre un issue en GitHub*
