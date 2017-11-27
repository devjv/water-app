const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const pkg = require('./package.json')

const PATHS = {
  app: './src/index.js',
  html: './src/index.html',
  dist: path.join(__dirname, './dist')
}

const isProd = process.env.NODE_ENV === 'production'

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: { warnings: false }
  })
]

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    version: JSON.stringify(pkg.version),
    API_BASE: JSON.stringify(process.env.API_BASE)
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      sassLoader: {
        includePaths: [path.resolve(__dirname, './src/styles')]
      },
      postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
    }
  })
]

if (isProd) {
  plugins = plugins.concat(prodPlugins)
}

module.exports = {
  entry: {
    app: [PATHS.app, PATHS.html]
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: {
      index: 'src/index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.(html|png|svg)$/,
        use: {
          loader: 'file-loader?name=[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader/webpack',
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: plugins
}
