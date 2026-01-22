# Excalidraw - Edição Local 🚀

> *"Minha estrutura lógica de pensamento passa pelo Excalidraw."*

Esta é uma contribuição para a comunidade **[Excalidraw](https://excalidraw.com)**, nascida de uma necessidade pessoal e do desejo de expandir as possibilidades dessa ferramenta incrível.

Este projeto é um **fork** do [Excalidraw Oficial](https://github.com/excalidraw/excalidraw), adaptado para rodar em ambientes locais (Localhost/VPN) com foco total em **soberania de dados**.

---

### ❤️ Créditos & Projeto Original
Este projeto só existe graças ao trabalho fantástico do time do Excalidraw.  
Se você busca a versão web colaborativa oficial, acesse: **[excalidraw.com](https://excalidraw.com)**.

---

## 📖 Sobre esta Versão (Local Edition)

Desde os tempos da faculdade até os projetos mais complexos do meu trabalho, o Excalidraw sempre foi mais que uma ferramenta: foi o lugar onde minhas ideias ganharam vida. Hoje, não consigo imaginar meu fluxo de trabalho sem ele.

Criei esta **Edição Local** para trazer recursos de nível premium para quem precisa de privacidade absoluta e controle de arquivos:

1.  **Soberania de Dados**: Seus desenhos são arquivos `.excalidraw` reais no seu disco.
2.  **Server-Side Local**: Um gerenciador de arquivos em Node.js incluído.
3.  **Ideal para VPNs**: Centralize desenhos de uma equipe em um servidor privado seguro.


## ✨ Principais Diferenciais

### 📂 Armazenamento em Arquivos Reais
Seus desenhos são salvos como arquivos `.excalidraw` reais dentro da pasta `projects/`. Isso significa que:
- Você tem posse total dos seus dados.
- Pode versionar seus desenhos com Git.
- Pode fazer backup facilmente.
- Sincronize via Dropbox/Google Drive/OneDrive se desejar.

### 🗄️ Navegador de Projetos Integrado
Adicionamos uma nova aba **"Projects"** na barra lateral (sidebar) que lista automaticamente todos os arquivos da sua pasta local.
- **Clique para abrir**: Carregamento instantâneo.
- **Auto-save**: Seus projetos são salvos automaticamente enquanto você edita.
- **Gestão Simples**: Crie e delete projetos diretamente da interface.

### 🔒 Privacidade Total
Nenhum dado é enviado para servidores externos. O backend é um servidor local simples (`file-server`) que roda na sua máquina e gerencia a leitura/escrita dos arquivos.

## 🛠️ Como Rodar

1. **Instale as dependências** (na raiz e na pasta do servidor):
   ```bash
   yarn install
   cd file-server && npm install && cd ..
   ```

2. **Inicie a aplicação**:
   ```bash
   # Terminal 1: Frontend (Client)
   yarn start

   # Terminal 2: Backend (File Server)
   cd file-server && npm start
   ```

3. **Acesse**:
   Abra [http://localhost:3000](http://localhost:3000) e comece a desenhar!

---
*Baseado no incrível projeto open-source [Excalidraw](https://github.com/excalidraw/excalidraw).*
