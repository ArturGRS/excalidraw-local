# Excalidraw - Edição Local 🚀

> *"Minha estrutura lógica de pensamento passa pelo Excalidraw."*

Esta é uma versão especial do Excalidraw, nascida de uma paixão e necessidade pessoal. 

Desde os tempos da faculdade até os projetos mais complexos do meu trabalho, o Excalidraw sempre foi mais que uma ferramenta: foi o lugar onde minhas ideias ganharam vida. Hoje, não consigo imaginar meu fluxo de trabalho sem ele.

Criei esta **Edição Local** para trazer as funcionalidades que sempre sonhei para meu uso diário: **privacidade total e controle absoluto dos meus arquivos**. Diferente da versão web, aqui seus desenhos são seus, salvos no seu disco, para sempre.

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
