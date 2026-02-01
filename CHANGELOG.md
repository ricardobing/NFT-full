# Changelog - Fix Vercel Deployment

## v1.0.1 - 2026-02-01

### 🔧 Fixes Críticos para Vercel

#### 1. **Downgrade React 19 → 18** (CRÍTICO)
- ❌ **Antes**: React 19.2.3 (incompatible con Web3 libs)
- ✅ **Ahora**: React 18.3.1
- ✅ **Ahora**: Next.js 15.1.6 (más estable)
- **Razón**: valtio y otras dependencias Web3 solo soportan React ≤18

```json
"react": "^18.3.1",
"react-dom": "^18.3.1",
"next": "15.1.6"
```

#### 2. **Wagmi 3.x → 2.x** (CRÍTICO)
- ❌ **Antes**: wagmi 3.4.1
- ✅ **Ahora**: wagmi 2.15.0
- **Razón**: RainbowKit 2.x no es compatible con Wagmi 3.x

#### 3. **next.config.ts - Webpack Config**
- Ignora archivos de Hardhat (fs, net, tls)
- watchOptions para excluir cache/

#### 4. **vercel.json - Configuración Específica**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

#### 5. **.vercelignore - Archivos Excluidos**
- cache/, artifacts/build-info/, test/
- Reduce bundle size

#### 6. **tsconfig.json - Optimizado**
- moduleResolution: "node" (era "bundler")
- jsx: "preserve" (era "react-jsx")
- Excluye cache y artifacts

### ✅ Verificaciones Pre-Deploy

```bash
# 1. Limpiar
rm -rf node_modules package-lock.json .next

# 2. Reinstalar
npm install

# 3. Build local
npm run build

# 4. Testear local
npm run start
# Verificar: http://localhost:3000

# 5. Push a GitHub
git add .
git commit -m "fix: React 18 downgrade + Vercel optimization"
git push origin main
```

### 🎯 Resultado Esperado en Vercel

✅ Build exitoso
✅ React 18.3.1 instalado
✅ Sin conflictos de peer dependencies
✅ Demo Mode funcional
✅ Rutas / y /staking operativas

### 📊 Dependencias Finales

```json
{
  "dependencies": {
    "@rainbow-me/rainbowkit": "^2.2.0",
    "@tanstack/react-query": "^5.90.20",
    "next": "15.1.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "viem": "^2.45.1",
    "wagmi": "^2.15.0"
  }
}
```

### 🔍 Cambios en Código

- ✅ Demo Mode verificado en page.tsx y staking/page.tsx
- ✅ Clases Tailwind CSS 4 actualizadas
- ✅ Variables de entorno en wagmi.ts

---

**Notas**:
- React 19 es demasiado nuevo para el ecosistema Web3
- Next.js 15.1.6 es más estable que 16.x
- Todas las dependencias ahora son compatibles entre sí
