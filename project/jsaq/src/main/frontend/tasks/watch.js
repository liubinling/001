const gulp   = require( 'gulp' );
const path   = require( 'path' );

const config = require( './config/settings' );

const source = config.paths.source;

module.exports = ( callback ) => {
  
  console.info( 'Watching files for changes' );
  
  /* Watch Frame */
  gulp.watch( [
    path.join( source.frame, '**', '*.js' ),
    path.join( source.frame, '**', '*.jsx' ),
    path.join( source.frame, '**', '*.json' )
  ], [ 'build-frame' ]).on( 'change', ( event ) => {
    console.log( 'File ' + event.path + ' was ' + event.type + ', running tasks...' );
  } );
  
  /* Watch Views */
  gulp.watch( [
    path.join( source.views, '**', '*.jsx' )
  ], [ 'build-views' ]).on( 'change', ( event ) => {
    console.log( 'File ' + event.path + ' was ' + event.type + ', running tasks...' );
  } );

  /* Watch Custom Components */
  gulp.watch( [
    path.join( source.components, '**', '*.jsx' ),
    path.join( source.components, '**', '*.js' )
  ], [ 'build-components' ]).on( 'change', ( event ) => {
    console.log( 'File ' + event.path + ' was ' + event.type + ', running tasks...' );
  } );

};