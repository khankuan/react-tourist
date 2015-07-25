
module.exports = {
  entry: {
    app: getEntrySources(['./src/app/app.jsx'])
  },
  output: {
    path: './src/www',
    publicPath: '/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: getLoaders(['jsx', 'babel']),
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  externals: {
    react: 'React'
  }
};

function getEntrySources(sources) {
  if (process.env.NODE_ENV === 'dev') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

function getLoaders(loaders){
  if (process.env.NODE_ENV === 'dev') {
    loaders.unshift('react-hot');
  }

  return loaders;
}
