// tslint:disable
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const titleize = require('titleize');

const DEMOS = ['async-shortcomings', 'generator-function', 'compose-pipe'];
const EXERCISES = ['array-hof', 'pong'];

const generateExampleInfo = (key, arr) => arr.map((item, idx) => {
  const id = idx + 1;
  return {
    id,
    menuLink: {
      url: `/${key}/${id}-${item}`,
      text: titleize(item.replace(/\-/g, ' '))
    },
    html: {
      template: `./src/${key}/${id}-${item}/index.hbs`,
      outfile: `./${key}/${id}-${item}/index.html`
    },
    entry: { name: `${key}/${id}-${item}/index`, file: `./src/${key}/${id}-${item}/index.ts` }
  };
}, {});

const generateExampleEntries = arr =>
  arr.reduce((acc, item, idx) => {
    acc[item.entry.name] = item.entry.file;
    return acc;
  }, {});

const generateHtmlPlugins = arr =>
  arr.map(
    (item, idx) =>
      new HtmlWebpackPlugin({
        inject: true,
        filename: item.html.outfile,
        chunks: [item.entry.name],
        template: item.html.template
      }),
    {}
  );

const DEMO_INFO = generateExampleInfo('demo', DEMOS);
const EXERCISE_INFO = generateExampleInfo('exercise', EXERCISES);

const DEMO_ENTRIES = generateExampleEntries(DEMO_INFO);
const EXERCISE_ENTRIES = generateExampleEntries(EXERCISE_INFO);

const DEMO_HTML_PLUGINS = generateHtmlPlugins(DEMO_INFO);
const EXERCISE_HTML_PLUGINS = generateHtmlPlugins(EXERCISE_INFO);

module.exports = {
  entry: {
    index: './src/index.ts',
    ...EXERCISE_ENTRIES,
    ...DEMO_ENTRIES
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
    // filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      templateParameters: {
        demos: DEMO_INFO,
        exercises: EXERCISE_INFO
      },
      template: './src/index.hbs'
    }),
    ...DEMO_HTML_PLUGINS,
    ...EXERCISE_HTML_PLUGINS,
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.scss']
  }
};
