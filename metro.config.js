const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Allow Metro to resolve .wasm files as assets (needed for expo-sqlite on web)
config.resolver.assetExts.push("wasm");

// expo-sqlite's web worker needs cross-origin isolation (SharedArrayBuffer)
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
