const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["swiper", "react-responsive-modal", "dom7", "html2canvas"]);
const withSourceMaps = require("@zeit/next-source-maps");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  [withTM],
  [withCSS],
  [withSass, {
    cssModules: true,
  }],
  [withFonts],
  [withImages],
  [withSourceMaps({
    webpack: config => {
      config.node = {
        fs: "empty"
      };
      return config;
    }
  })]
]);
