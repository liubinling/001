const gulp        = require( 'gulp' );
const runSequence = require( 'run-sequence' );

const buildFrame      = require( './build/frame' );
const buildViews      = require( './build/views' );
const buildComponents = require( './build/components' );

gulp.task( 'build-frame', buildFrame );
gulp.task( 'build-views', buildViews );
gulp.task( 'build-components', buildComponents );

module.exports = ( callback ) => {
  
  console.info( 'Building' );
  
  runSequence( [ 'build-components', 'build-views', 'build-frame' ], callback );

};