# Observatório do Exame de Suficiência

Site público com estatísticas do Exame de Suficiência (CFC): evolução
nacional e por UF, ranking por IES (com busca e filtros) e desempenho
por área de conteúdo. Os dados são lidos diretamente da sua planilha
do Google Sheets, então quando você adicionar uma nova edição na
planilha, o site atualiza sozinho (com até 1h de cache).

## 1. Deixar a planilha acessível para o site

1. Abra a planilha "Base de Dados_Integrada" no Google Sheets.
2. Clique em **Compartilhar** (canto superior direito).
3. Em "Acesso geral", mude para **"Qualquer pessoa com o link"** e
   garanta que o papel seja **Leitor**.
4. Clique em **Concluído**.

Isso não deixa a planilha editável por ninguém — só permite que o
site leia os valores (como um link "somente visualização").

## 2. Descobrir o GID de cada aba

O GID é o número que aparece na URL depois de `#gid=` quando você
clica em cada aba da planilha. Clique em cada uma destas abas e
copie o número:

- **Aba 1 - Estatística Geral por Brasil e UF** → `GID_GERAL`
- **Aba 2 - Estatística por IES** → `GID_IES`
- **Aba 3 - Estatística de Conteúdo** → `GID_CONTEUDO_STATS`
- **Aba 4 - Conteúdos Cobrados** → `GID_CONTEUDOS_COBRADOS`
- **Aba 5 (estatística nacional por conteúdo/edição)** → `GID_CONTEUDO_NACIONAL`

Exemplo: se a URL ficar
`.../edit?gid=1790425418#gid=1790425418`, o GID daquela aba é
`1790425418`.

## 3. Configurar as variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha os 4 GIDs
que você acabou de copiar:

```bash
cp .env.local.example .env.local
```

## 4. Rodar localmente (opcional, para conferir antes de publicar)

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## 5. Publicar com domínio próprio (Vercel)

A forma mais simples de hospedar um site Next.js com domínio próprio
é a Vercel (tem plano gratuito):

1. Suba este projeto para um repositório no GitHub.
2. Entre em https://vercel.com, clique em **Add New → Project** e
   importe o repositório.
3. Em **Environment Variables**, adicione as mesmas 4 variáveis do
   seu `.env.local` (`SHEET_ID`, `GID_GERAL`, `GID_IES`,
   `GID_CONTEUDO_STATS`, `GID_CONTEUDOS_COBRADOS`).
4. Clique em **Deploy**.
5. Depois do deploy, vá em **Project → Settings → Domains**, digite
   seu domínio (ex: `observatorioexame.com.br`) e siga as instruções
   da Vercel para apontar o DNS no seu registrador (geralmente um
   registro `A` ou `CNAME`).

Alternativas à Vercel: Netlify e Cloudflare Pages também suportam
Next.js com App Router e rotas de API.

## Registro de quem faz o simulado

Para saber quantas pessoas fazem o simulado e de onde elas são (estado,
cidade e instituição), o formulário exibido antes do simulado envia esses
dados para uma planilha Google **sua e privada**, via um Web App do Google
Apps Script. Nenhum dado fica salvo no código nem em nenhum serviço externo
além dessa planilha.

1. Crie uma planilha Google nova (ex: "Observatório — Registros do Simulado")
   com esta primeira linha de cabeçalho: `Data/Hora | Estado | Cidade | Instituição | Modo`.
2. No menu da planilha, vá em **Extensões → Apps Script**.
3. Apague o conteúdo padrão e cole:

   ```javascript
   function doPost(e) {
     var dados = JSON.parse(e.postData.contents);
     var planilha = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     planilha.appendRow([
       dados.dataHora, dados.estado, dados.cidade, dados.instituicao, dados.modo
     ]);
     return ContentService.createTextOutput(
       JSON.stringify({ ok: true })
     ).setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Clique em **Implantar → Nova implantação**, escolha o tipo **App da Web**,
   em "Executar como" deixe você mesmo, e em "Quem pode acessar" escolha
   **Qualquer pessoa**. Implante.
5. Copie a URL do Web App gerada e cole em `SIMULADO_WEBHOOK_URL` no
   `.env.local` (e também nas variáveis de ambiente da Vercel).

A cada vez que alguém clicar em "Gerar simulado oficial" ou "Gerar simulado
personalizado", uma nova linha é adicionada automaticamente nessa planilha.
Se a variável não estiver configurada, o site funciona normalmente — só não
registra nada.

## Estrutura do projeto

- `lib/csv.ts` — busca e faz o parsing do CSV público do Google Sheets
- `lib/types.ts` — normalização de cada aba (conversão de números/percentuais no formato BR)
- `app/api/*` — rotas que filtram, ordenam e paginam os dados no servidor
- `app/page.tsx` — Visão Geral (Brasil x UF)
- `app/ies/page.tsx` — Busca e ranking por IES
- `app/conteudos/page.tsx` — Desempenho e frequência por área de conteúdo

## Próximos passos possíveis

- Adicionar a aba "Conteúdos" (dicionário Conteúdo → Assunto → Tema) para navegação hierárquica.
- Adicionar mapa do Brasil colorido por UF (ex: usando `react-simple-maps`).
- Exportar tabelas filtradas em CSV/Excel direto do site.
