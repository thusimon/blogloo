const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = function override(config) {
  const plugins = config.plugins;

  plugins.push(new WebpackAssetsManifest({
    publicPath: '/'
  }));

  return config;
}
