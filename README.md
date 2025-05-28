🚀 React + TypeScript + Vite — O TEMPLATE JEDI 🛸
Salve, jovem padawan! Esse aqui é o template básico pra você começar sua jornada na galáxia do React com TypeScript e Vite. Já vem com o hyperdrive do HMR ativado e uns linterzinhos pra não fazer besteira.

Plugins Oficiais da Aliança Rebelde:
@vitejs/plugin-react → usa o Babel pra um Fast Refresh nível X-Wing.

@vitejs/plugin-react-swc → usa o SWC, que é tipo o motor da Millennium Falcon: rápido e furioso!

🛠️ Evoluindo o Linter pro lado da Força
Se tu for criar um app de produção (não brinque com o Império!), é melhor turbinar o ESLint com regras que conhecem os tipos:

ts
Copiar
Editar
export default tseslint.config({
  extends: [
    // Joga fora o recomendado padrão e equipa o TypeChecked
    ...tseslint.configs.recommendedTypeChecked,
    // Quer ir pro Modo Sith? Usa o Strict!
    ...tseslint.configs.strictTypeChecked,
    // E se quiser estilizar a parada, bota o Stylistic também
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
🕶️ Plugins Extras — Só pros verdadeiros mestres Jedi:
Pode instalar o eslint-plugin-react-x e o eslint-plugin-react-dom pra proteger sua base rebelde com regras específicas do React:

ts
Copiar
Editar
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Adiciona as armas secretas
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // Libera as recomendações padrão
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
Que a Força esteja com você no deploy!
(E lembre-se: push sem lint é coisa do Lado Sombrio 😈)
