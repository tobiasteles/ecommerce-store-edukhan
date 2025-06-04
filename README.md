# 🛍️ E-commerce Edukhan - Plataforma de Arrecadação

[![Deploy with Vercel](https://vercel.com/button)](https://ecommerce-store-edukhan.vercel.app/) 
![Status](https://img.shields.io/badge/status-Functional%20MVP-brightgreen)

> Plataforma de e-commerce desenvolvida para arrecadar fundos para projetos educacionais do Edukhan

## 🚀 Visão Geral

Projeto funcional de e-commerce desenvolvido para o **Edukhan**, com foco em:
- Gerar recursos para iniciativas educacionais
- Oferecer experiência de compra moderna e intuitiva
- Facilitar gestão de produtos e vendas através de painel administrativo

**Estado atual:** Primeira versão operacional - pronto para uso com ajustes incrementais em andamento

## ✨ Funcionalidades Implementadas

### 💻 Frontend & UX
- Catálogo de produtos com filtros (categoria, cor, tamanho)
- Carrinho de compras persistente
- Fluxo completo de checkout
- Layout responsivo (mobile/desktop)
- Banners promocionais customizáveis

### 🛠️ Painel Administrativo
- CRUD completo de produtos
- Gerenciamento de categorias, cores e tamanhos
- Controle de banners promocionais
- Dashboard de vendas e pedidos
- Gestão de estoque

### ⚙️ Backend & Infra
- Autenticação segura
- API RESTful
- Banco de dados relacional
- Deploy automatizado na Vercel

## 🛠️ Stack Tecnológica

| Camada           | Tecnologias                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Frontend**     | Next.js, React, Tailwind CSS, TypeScript                                    |
| **Backend**      | Next.js API Routes                                                          |
| **Banco de Dados**| Prisma ORM + PostgreSQL                                                     |
| **Autenticação** | NextAuth                                                                    |
| **Deploy**       | Vercel                                                                      |
| **UI**           | Shadcn/ui, Headless UI                                                      |

## 🔍 Visualização do Projeto

[**Acesse o site em produção**](https://ecommerce-store-edukhan.vercel.app/)

### Capturas de Tela
![Página Inicial](https://via.placeholder.com/800x400?text=Homepage+Edukhan)
![Painel Admin](https://via.placeholder.com/800x400?text=Dashboard+Administrativo)

## 🚧 Próximos Passos & Desafios

Atualmente buscamos parceiros para:
- 🔄 **Integrações com fornecedores**
- 📦 **Solução de logística de entregas**
- 🎨 **Seleção de produtos iniciais**
- 🔐 **Aprimoramentos de segurança**
- 📱 **Otimização mobile**

## 🤝 Como Contribuir

Estamos especialmente buscando:
1. Parceiros comerciais (fornecedores de produtos)
2. Especialistas em logística
3. Mentores técnicos (Next.js/Prisma)
4. UX Designers voluntários
5. Testadores de usabilidade

**Se interessou?** Entre em contato via [LinkedIn](https://www.linkedin.com/in/seu-perfil) ou abra uma issue neste repositório!

## ⚙️ Execução Local

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/ecommerce-edukhan.git

# Instalar dependências
npm install

# Configurar variáveis de ambiente (crie .env baseado em .env.example)
cp .env.example .env

# Executar migrações do banco
npx prisma migrate dev

# Iniciar servidor
npm run dev
