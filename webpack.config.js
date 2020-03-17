const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    "v_": './src/js/autoEntry.js',
    "v_.min": './src/js/autoEntry.js',
    "v_manual": './src/js/manualEntry.js',
    "v_manual.min": './src/js/manualEntry.js',
    "v_ui": './src/scss/v_.scss',
    "v_ui.min": './src/scss/v_.scss'
  },
  mode: "production",
  target: "web",
  //watch: true,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "expanded",
                minimize: false,
                indentType: "tab",
                indentWidth: 1,
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin([
      {from: './src/html'}
    ]),
  ],
  externals: {
    "zxcvbn": true
  },
  optimization: {
    minimize: true,
    mergeDuplicateChunks: false,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/i
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.min\.css$/i
      }),
     ],
  },
};