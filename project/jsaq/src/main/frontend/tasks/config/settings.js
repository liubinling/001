const path = require( 'path' );

const cwd = process.cwd();
const pkg = require( path.resolve( cwd, 'package.json' ) );

module.exports = {

  banner: [
    '/*!',
    ` * ${pkg.name} - ${pkg.description}`,
    ` * @version v${pkg.version}`,
    ` * @link ${pkg.homepage}`,
    ' * Copyright (C) 2017 BONC All rights reserved.',
    ' */',
    ''
  ].join('\n'),

  paths: {
    source: {
      frame: path.resolve( cwd, 'frame' ),
      views: path.resolve( cwd, 'views' ),
      components: path.resolve( cwd, 'components' )
    },
    output: {
      frame: path.resolve( cwd, '..', 'resources', 'frame' ),
      views: path.resolve( cwd, '..', 'resources', 'static', 'views' ),
      components: path.resolve( cwd, '..', 'resources', 'static', 'components' )
    },
    clean: [
      path.resolve( cwd, '..', 'resources', 'frame' ),
      path.resolve( cwd, '..', 'resources', 'static', 'views' ),
      path.resolve( cwd, '..', 'resources', 'static', 'components' )
    ]
  },

  files: {
    frame: {
      src: 'html.jsx',
      dist: 'html.js'
    },
    components: {
      src: 'index.js',
      dist: 'components.js'
    }
  },

  module: {
    frame: {
      global: 'EPMUIApp'
    },
    views: {
      global: 'EPMUIPage'
    },
    components: {
      global: 'Components',
      exports: 'components'
    }
  }

};