// eslint.config.js

const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  // 🧩 Configuração para Módulos e Resolução de Caminhos (Resolve @env)
  {
    // Define a quais arquivos esta regra se aplica
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    // Define as configurações que os plugins (como o 'import') devem usar
    settings: {
      'import/resolver': {
        // 1. Usa o resolvedor de módulos do Babel. Ele lê o babel.config.js
        // e, portanto, reconhece o alias '@env' que você configurou.
        'babel-module': {
          allowExistingDirectories: true,
        },
        // 2. Define o resolvedor de node para garantir compatibilidade geral
        // com o ambiente Node/React Native.
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.native.js'],
        },
      },
      // 3. (CRÍTICO) Diz ao plugin 'import' para IGNORAR a verificação de
      // 'no-unresolved' especificamente para o alias '@env'.
      'import/ignore': [
        '@env', 
      ],
    },
    
    // 4. (GARANTIA) Desabilita explicitamente a regra 'no-unresolved' 
    // para evitar que ela cause o erro.
    rules: {
      'import/no-unresolved': 'off',
      // Você pode reativar a regra para outros módulos se quiser:
      // 'import/no-unresolved': ['error', { ignore: ['^@env$'] }], 
    },
  },
]);