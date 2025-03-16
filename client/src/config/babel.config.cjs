// Provides Babel presets so Jest can parse modern JavaScript/JSX

module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }],
    ],
};