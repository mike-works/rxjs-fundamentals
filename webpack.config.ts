import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as titleize from 'titleize';
import { Configuration } from 'webpack';
import { setupRoutes } from './api/index';

const DEMOS = [
  'compose-pipe',
  'generator-function',
  'generator-task',
  'async-shortcomings',
  'filtering-colors'
];
const EXERCISES = [
  'array-hof',
  'subscribe-to-observables',
  'cancelling',
  'filtering-operators',
  'error-recovery',
  'aggregate-exercise',
  'subjects',
  'timing-operators',
  'combining-observables',
  'hot-and-cold',
  'marble-tests'
];

const generateExampleInfo = (key, arr) =>
  arr.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      menuLink: {
        url: `/${key}/${id}-${item}/`,
        text: titleize(item.replace(/\-/g, ' '))
      },
      html: {
        template: `./src/${key}/${id}-${item}/index.hbs`,
        outfile: `./${key}/${id}-${item}/index.html`
      },
      entry: {
        name: `${key}/${id}-${item}/index`,
        file: `./src/${key}/${id}-${item}/index.ts`
      }
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

const WEBPACK_CONFIG: Configuration = {
  entry: {
    index: './src/index.ts',
    ...EXERCISE_ENTRIES,
    ...DEMO_ENTRIES
  },
  devtool: 'cheap-source-map',
  mode: 'development',
  devServer: {
    before(app) {
      setupRoutes(app);
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src'
            }
          }
        ]
      },
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
      { test: /\.(hbs|handlebars)$/, loader: 'handlebars-loader' },
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
    ...EXERCISE_HTML_PLUGINS
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.scss']
  }
};

export = WEBPACK_CONFIG;
