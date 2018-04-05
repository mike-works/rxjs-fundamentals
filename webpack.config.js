// tslint:disable
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
    pong: './src/pong/index.ts',
    'demo-async-shortcomings': './src/demo/1-async-shortcomings.ts'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: './src/index.hbs'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: './pong/index.html',
      chunks: ['pong'],
      template: './src/pong/index.hbs'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: './demo/async-shortcomings/index.html',
      chunks: ['demo-async-shortcomings'],
      template: './src/demo/1-async-shortcomings/index.hbs'
    })
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.scss']
  }
};
