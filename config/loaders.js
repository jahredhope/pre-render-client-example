module.exports.jsLoaders = [
  {
    test: /.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader'
      }
    ]
  }
];
module.exports.imageLoaders = [
  {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }
  }
];

module.exports.svgLoaders = [
  {
    test: /.svg$/,
    use: [
      {
        loader: 'raw-loader'
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            {
              addAttributesToSVGElement: {
                attribute: 'focusable="false"'
              }
            },
            {
              removeViewBox: false
            }
          ]
        }
      }
    ]
  }
];
