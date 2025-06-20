# 🎨 Gerador de Paletas de Cores Interativo

Um aplicativo web moderno e intuitivo para gerar paletas de cores harmónicas baseadas em princípios da teoria das cores e em "energias" específicas. Ideal para qualquer pessoa que precise de inspiração cromática\!

## ✨ Funcionalidades

  * **Geração de Paletas por Harmonia:** Escolha entre diferentes tipos de harmonia de cores:
      * **Aleatória (Pura):** Cores aleatórias, mas que podem ser guiadas por uma energia.
      * **Monocromática:** Variações de uma única cor base.
      * **Análoga:** Cores adjacentes no círculo cromático.
      * **Complementar:** Cores opostas no círculo cromático.
      * **Triádica:** Três cores igualmente espaçadas no círculo cromático.
  * **Geração de Paletas por Energia/Sentimento:** Selecione uma "energia" (ex: Paixão, Calma, Alegria) para guiar a matiz, saturação e luminosidade das cores geradas, garantindo que a paleta transmita a emoção desejada.
  * **Visualização Clara:** Veja instantaneamente as cores da paleta gerada.
  * **Cópia Rápida:** Clique em botões dedicados para copiar os códigos HEX, RGB ou HSL de cada cor para a área de transferência.
  * **Design Responsivo:** Layout adaptável para desktop e dispositivos móveis, garantindo uma ótima experiência em qualquer tela.
  * **UI/UX Aprimorada:** Interface limpa e moderna com transições suaves e feedback visual.

## 🚀 Tecnologias Utilizadas

  * **Vue.js 3:** Framework progressivo para construção da interface de usuário.
  * **Vuex 4:** Gerenciamento de estado centralizado para a aplicação.
  * **Vue CLI:** Ferramenta padrão para desenvolvimento rápido de aplicações Vue.
  * **Sass (SCSS):** Pré-processador CSS para estilos mais organizados e poderosos.
  * **Flexbox & Media Queries:** Para um layout responsivo e adaptável.
  * **JavaScript (ES6+):** Lógica principal da aplicação.
  * **HTML5 & CSS3:** Estrutura e estilização.

## 🛠️ Instalação e Uso

Siga estas instruções para configurar e rodar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/) (que inclui o npm) e o [Vue CLI](https://cli.vuejs.org/) instalados globalmente.

```bash
# Verifique a instalação do Node.js
node -v
npm -v

# Instale o Vue CLI globalmente (se ainda não tiver)
npm install -g @vue/cli
# OU
yarn global add @vue/cli
```

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/color-palette-gen.git # Substitua pelo link do seu repositório
cd color-palette-gen
```

### Instalar Dependências

```bash
npm install
# OU
yarn install
```

### Rodar o Projeto

Este comando inicia o servidor de desenvolvimento em `http://localhost:8080`. A aplicação recarregará automaticamente no navegador sempre que você fizer alterações no código-fonte.

```bash
npm run serve
# OU
yarn serve
```

### Compilar para Produção

Este comando compila e minifica a aplicação para um diretório `dist/`, pronto para deploy em um servidor web.

```bash
npm run build
# OU
yarn build
```

## 📂 Estrutura do Projeto

A estrutura de pastas segue as convenções do Vue CLI, com algumas adições para melhor organização:

```
color-palette-gen/
├── public/
│   └── index.html             # Template HTML principal
├── src/
│   ├── assets/                # Imagens, ícones, etc.
│   ├── components/
│   │   ├── ColorCard.vue      # Componente para exibir uma única cor
│   │   └── PaletteGenerator.vue # Componente principal de geração de paletas
│   ├── store/
│   │   └── index.js           # Configuração do Vuex store
│   ├── utils/
│   │   └── colorUtils.js      # Funções utilitárias para manipulação de cores (HSL/RGB/HEX)
│   ├── App.vue                # Componente raiz da aplicação
│   └── main.js                # Ponto de entrada da aplicação Vue
├── .gitignore
├── package.json               # Gerenciamento de dependências e scripts
└── README.md                  # Este arquivo
```


