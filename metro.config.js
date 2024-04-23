const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const blacklist = require('metro-config/src/defaults/exclusionList');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        assetExts: ['bin', 'txt', 'jpg', 'png', 'ttf'],
        sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
        blacklistRE: blacklist([/platform_node/]),
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);