# Portfólio Roni Amorim

Portfólio pessoal com efeitos interativos, starfield animado e CMS integrado.

## 🚀 Como rodar localmente

### Requisitos
- Node.js instalado (para usar `npx`)

### Passo a passo

1. **Abra o terminal na pasta do projeto**

2. **Rode o servidor local:**
   ```bash
   npx serve .
   ```

3. **Acesse no navegador:**
   - Home: http://localhost:3000
   - Exemplo de case: http://localhost:3000/case.html?id=fadelito-flow
   - CMS (secreto): http://localhost:3000/cms-roni-9347.html

## 📁 Estrutura do projeto

```
/
├── index.html
├── case.html
├── cms-roni-9347.html
└── README.md
```

## 🎨 Funcionalidades

### Home (index.html)
- Starfield interativo com efeito de gravidade no mouse
- Efeito glitch Matrix verde no nome
- Grid de cases com links funcionais
- Seção de contato com scroll suave
- Sem links visíveis para o CMS

### Página do Case (case.html)
- Layout limpo e profissional
- Renderização dinâmica a partir do localStorage
- Seções ocultas quando vazias
- Galeria de imagens opcional
- Starfield no fundo (sem efeito glitch)
- Fallback para case não encontrado

### CMS (cms-roni-9347.html)
- Acesso via URL secreta
- Criar/editar/excluir cases
- Campos completos
- Auto-geração de slug
- Dados salvos em localStorage

## 💾 Dados

Todos os dados dos cases são armazenados no localStorage na chave `portfolioCases`.

## 🔐 Acesso ao CMS

O CMS não possui links visíveis no site público. Para acessar:

```
http://localhost:3000/cms-roni-9347.html
```

⚠️ Nunca compartilhe esta URL publicamente.

## 🌐 Deploy (Vercel/Netlify)

- Home: https://seu-site.vercel.app
- Case: https://seu-site.vercel.app/case.html?id=exemplo
- CMS: https://seu-site.vercel.app/cms-roni-9347.html

## 📝 Notas

- localStorage é local ao navegador
- Para backup:
  ```javascript
  console.log(localStorage.getItem('portfolioCases'))
  ```
- Mobile: efeito magnético desativado
- Personalização via variáveis CSS

Desenvolvido para impressionar recrutadores.
