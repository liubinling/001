const Router = require( 'koa-router' );

const testController = require( './controllers/test-ctl' );

const getRouter = () => {
  const router = new Router();

  // restful API
  router.get( '/sysconfig/search', testController.getPGTAbleData );


  return router;
};

module.exports = getRouter();