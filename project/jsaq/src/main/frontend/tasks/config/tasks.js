const config = require( './settings' );

const moduleConfig = config.module;
const filesConfig = config.files;

/* Remove Files in Clean */
const delTask = {
  force: true
};

/* Minified JS Settings */
const uglifyTask = {
  mangle: true,
  preserveComments: false
};

const babelTask = {
  frame: {
    presets: [ [ 'env',
      {
        "modules": false
      } ],
      'react' ]
  },

  views: {
    presets: [ 'env', 'react' ],
    plugins: [
      [ 'transform-es2015-modules-umd', {
        'globals': {
          'es6-promise': 'Promise',
          'react': 'React',
          'react-dom': 'ReactDOM',
          'epm-ui': 'EPMUI',
          [ moduleConfig.components.exports ]: moduleConfig.components.global
        }
      } ]
    ],
    moduleId: moduleConfig.views.global
  },

  components: {
    presets: [ [ 'env',
      {
        "modules": false
      } ],
      'react' ],
    plugins:['transform-object-rest-spread']
  }
};



const webpackTask = {
  frame: {
    output: {
      filename: filesConfig.frame.dist,
      library: moduleConfig.frame.global,
      libraryTarget: 'umd'
    },
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'epm-ui': {
        root: 'EPMUI',
        commonjs2: 'epm-ui',
        commonjs: 'epm-ui',
        amd: 'epm-ui'
      }
    },
    resolve: {
      extensions: [ '.js', '.jsx' ]
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: babelTask.frame
        }
      ]
    }
  },

  components: {
    output: {
      filename: filesConfig.components.dist,
      library: moduleConfig.components.global,
      libraryTarget: 'umd'
    },
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'epm-ui': {
        root: 'EPMUI',
        commonjs2: 'epm-ui',
        commonjs: 'epm-ui',
        amd: 'epm-ui'
      }
    },
    resolve: {
      extensions: [ '.js', '.jsx' ]
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: babelTask.components
        }
      ]
    }
  }
};

module.exports = {
  del: delTask,
  uglify: uglifyTask,
  babel: babelTask,
  webpack: webpackTask
};