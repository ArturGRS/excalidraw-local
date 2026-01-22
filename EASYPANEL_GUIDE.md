# 🚀 Como Instalar no Easypanel

Siga este passo a passo para colocar seu Excalidraw Local no ar usando Easypanel.

## 1. Criar Serviço
No seu painel do Easypanel:
1. Vá em seu **Projeto**.
2. Clique no botão **+ Service** (ou Novo Serviço).
3. Escolha o tipo **App**.

## 2. Configurar a Fonte (Source)
Configure de onde o código virá:
- **Source Type**: Git
- **Repository URL**: `https://github.com/ArturGRS/excalidraw-local`
- **Branch**: `master`
- **Build Path**: `/` (pode deixar vazio ou barra)
- **Docker Compose File**: `docker-compose.yml`

> **Importante**: Certifique-se de que a opção de usar **Docker Compose** esteja selecionada ou detectada.

## 3. Configurar Domínio (Opcional)
Se quiser acessar por um link bonito (ex: `excalidraw.seudominio.com`):
1. Vá na aba **Domains**.
2. Adicione o seu domínio.
3. Porta do Container: `5000` (Isso é importante! O app roda na porta 5000).

## 4. Deploy
1. Clique em **Create** ou **Deploy**.
2. Acompanhe os logs. O build inicial pode demorar alguns minutos pois ele vai instalar todas as dependências.
3. Quando aparecer "Server running on http://localhost:5000", está pronto!

---

### 💾 Sobre os Dados (Persistência)
O projeto já está configurado para usar um **Volume Persistente** (`excalidraw-data`).
Isso significa que o Easypanel vai criar um disco virtual para guardar seus desenhos. Você pode reiniciar ou atualizar o container que seus projetos continuarão lá.
