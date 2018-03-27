import React, { Component } from 'react';
import Layout from './layouts/default';

import resources from './config/resources.json';

const PAGE_ROOT = 'epm-ui-page-root';

const initScriptTmpl = ( ctx, props ) => `
  if ( window.EPMUI && window.EPMUIPage ) {
    EPMUI.context = ${ ctx };
    var container = document.getElementById( "${ PAGE_ROOT }" );
    var Page = EPMUIPage.default || EPMUIPage;
    ReactDOM.render(
      React.createElement( Page, ${ props } ),
      container
    );
  }
`.trim();

export default ( props ) => {
  const res = resources[ props.env ] || {};
  
  const context = props.context;
  const contextPath = context.contextPath;
  
  const page = props.component.epmUIPage || {};

  const initScript = initScriptTmpl( JSON.stringify( context ), props.data );

  return (
      <html lang="zh-cn" style={{height:'100%'}}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <title>{ page.title || 'EPM UI Page title' }</title>
        <link rel="shortcut icon" href={ `${ contextPath }/icons/favicon.ico` } />
        <link rel="apple-touch-icon" sizes="57x57" href={ `${ contextPath }/icons/apple-icon-57x57.png` } />
        <link rel="apple-touch-icon" sizes="60x60" href={ `${ contextPath }/icons/apple-icon-60x60.png` } />
        <link rel="apple-touch-icon" sizes="72x72" href={ `${ contextPath }/icons/apple-icon-72x72.png` } />
        <link rel="apple-touch-icon" sizes="76x76" href={ `${ contextPath }/icons/apple-icon-76x76.png` } />
        <link rel="apple-touch-icon" sizes="114x114" href={ `${ contextPath }/icons/apple-icon-114x114.png` } />
        <link rel="apple-touch-icon" sizes="120x120" href={ `${ contextPath }/icons/apple-icon-120x120.png` } />
        <link rel="apple-touch-icon" sizes="144x144" href={ `${ contextPath }/icons/apple-icon-144x144.png` } />
        <link rel="apple-touch-icon" sizes="152x152" href={ `${ contextPath }/icons/apple-icon-152x152.png` } />
        <link rel="apple-touch-icon" sizes="180x180" href={ `${ contextPath }/icons/apple-icon-180x180.png` } />
        <link rel="icon" type="image/png" sizes="192x192" href={ `${ contextPath }/icons/android-icon-192x192.png` } />
        <link rel="icon" type="image/png" sizes="32x32" href={ `${ contextPath }/icons/favicon-32x32.png` } />
        <link rel="icon" type="image/png" sizes="96x96" href={ `${ contextPath }/icons/favicon-96x96.png` } />
        <link rel="icon" type="image/png" sizes="16x16" href={ `${ contextPath }/icons/favicon-16x16.png` } />
        <link rel="manifest" href={ `${ contextPath }/icons/manifest.json` } />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content={ `${ contextPath }/icons/ms-icon-144x144.png` } />
        <meta name="theme-color" content="#FFFFFF" />
        { res.css && res.css.map( ( css, index ) => <link key={ index } rel="stylesheet" href={ contextPath + css } /> ) }
        { page.css && page.css.map( ( css, index ) => <link key={ index } rel="stylesheet" href={ contextPath + css } /> ) }
      </head>
      <body style={{height:'100%'}}>
      <Layout id={ PAGE_ROOT } contextPath={ contextPath }>
        { props.children }
      </Layout>
      { res.js && res.js.map( ( js, index ) => <script key={ index } src={ contextPath + js } /> ) }
      { page.js && page.js.map( ( js, index ) => <script key={ index } src={ contextPath + js } /> ) }
      { props.view ? <script src={ `${ contextPath }/views/${ props.view }.${ props.env === 'development' ? 'js' : 'min.js' }` } /> : null }
      <script dangerouslySetInnerHTML={ { __html: initScript } } />
      </body>
      </html>
  );

};
