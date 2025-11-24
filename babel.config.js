// babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    // 🚀 O plugin que resolve o .env DEVE vir antes de expo-router/babel
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        // Geralmente 'safe: true' ou 'safe: false' não importa para este erro, 
        // mas é bom ter uma configuração completa.
        safe: false, 
        allowUndefined: true,
      },
    ],
    // O plugin do Expo Router deve vir por último
    'expo-router/babel', 
  ],
};