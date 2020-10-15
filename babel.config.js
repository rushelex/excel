module.exports = {
  presets: [
    ["@babel/preset-env",
    {
      targets: {
        node: "current"
      }
    }]
  ],
  // presets: ["@babel/preset-env"],
  plugins: ["@babel/plugin-proposal-class-properties"]
}
