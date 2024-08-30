
module.exports = {
  content: ["src//*.jsx"],
  theme: {
    extend: {
      animation:{
        "loop-scroll":"loop-scroll 30s linear infinite",
      },
      keyframes:{
        "loop-scroll":{
          from:{ transform: "translateX(0)" },
          to:{ transform: "translateX(-300%)" },
        }
      }
    },
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-modules-commonjs'] // Ensures CommonJS format
            ],
          },
        },
      },
    ],
  },
};
