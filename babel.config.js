module.exports = {
  presets: [
    '@babel/env',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
    // '@babel/plugin-transform-object-assign'
  ],
};
