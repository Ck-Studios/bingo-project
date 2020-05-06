const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["swiper", "react-responsive-modal", "dom7"]);
const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withTM(
    withCSS(
        withSass(
            withFonts(
                withImages(
                    withSourceMaps({
                      webpack: config => {
                        config.node = {
                          fs: "empty"
                        };
                        return config;
                      }
                    })
                )
            )
        )
    )
);
