/* config-overrides.js */

module.exports = {
  webpack: function(config, env) {
    console.log(config.module.rules[0]);
    console.log(config.module.rules[2]);
    return config;
  },
}
