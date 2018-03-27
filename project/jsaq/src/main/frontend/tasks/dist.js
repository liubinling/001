const runSequence  = require( 'run-sequence' );

module.exports = ( callback ) => {
  
  console.info( 'Distributing EPM UI docs' );
  
  runSequence( 'clean', [ 'build' ], callback );

};