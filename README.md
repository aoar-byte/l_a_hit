# 🎵 L'A HIT - Plataforma de Cartão-Catálogo Musical

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?logo=supabase)

## 🚀 Sobre o Projeto

Plataforma web para exibição e licenciamento de catálogo musical. 
Os dados são carregados dinamicamente de planilhas Google Sheets via CSV, 
permitindo atualização em tempo real sem necessidade de deploy.

### ✨ Funcionalidades

- 🎧 **Player de música persistente** com controle de playlist
- 🔍 **Busca inteligente** por título, artista, gênero, BPM e mood
- 🏷️ **Filtro por gênero musical**
- 📋 **Modal de licenciamento** com 5 modalidades (Simples, Exclusiva, Sync, Publicidade, Buyout)
- 📞 **Integração WhatsApp** para contato direto
- 🎨 **Design cyberpunk/tech** com animações Framer Motion
- 📊 **Cases de sucesso** com métricas de streaming
- 📱 **Totalmente responsivo**

### 🛠️ Stack Técnica

| Tecnologia | Uso |
|-----------|-----|
| Next.js 16 | Framework React com SSR |
| Tailwind CSS | Estilização utility-first |
| Framer Motion | Animações e transições |
| PapaParse | Parser de CSV |
| Lucide Icons | Biblioteca de ícones |
| Google Sheets | CMS para dados dinâmicos |

### 📂 Estrutura de Dados

Os dados são carregados de 5 abas do Google Sheets:

| Aba | Conteúdo |
|-----|----------|
| `gid=0` | Catálogo de músicas |
| `gid=5493861` | Serviços oferecidos |
| `gid=1357706581` | Cases de sucesso |
| `gid=918950045` | Links de contato |
| `gid=319719436` | Tipos de licenciamento |

### 🎨 Design System

- **Cores principais**: `#00F0FF` (ciano), `#DFFF00` (limão), `#020617` (fundo)
- **Tipografia**: Sans-serif, tracking widest, uppercase para labels
- **Componentes**: MagneticButton, NoiseOverlay, DynamicTerrainCanvas
- **Animações**: Entrada staggered, hover com scale, gradientes animados

### 📦 Instalação

```bash
npm install
npm run dev
