module.exports = {
  presets: [
    ["@babel/preset-env"],
    ["@babel/preset-react", { runtime: "automatic" }], // Habilita el nuevo runtime automático
  ],
};