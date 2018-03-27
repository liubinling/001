const Koa = require( 'koa' );

const router = require( './router' );

const app = module.exports = new Koa();

app.use( router.routes() );

if ( !module.parent ) app.listen( 3000 );