/**
 * 事件订阅/发布 用于 react 无嵌套关系的组件进行通信
 * @type {{_events: {}, subscribe: eventProxy.subscribe, publish: eventProxy.publish, remove: eventProxy.remove}}
 */
const eventProxy = {
  _events : {} ,
  /* 事件订阅  创建一个新事件数组*/
  subscribe : function ( key , fn ) {
    //空事件
    if ( this._events[ key ] === undefined ) {
      this._events[ key ] = [];
    }
    this._events[ key ].push ( fn );
  } ,
  /* 发布事件 将除第一参数（事件名）的其他参数，作为新的参数，触发使用 subscribe 进行订阅的函数*/
  publish : function () {

    let key , args;

    if ( arguments.length == 0 ) {
      return false;
    }
    key = arguments[ 0 ];
    args = [].concat ( Array.prototype.slice.call ( arguments , 1 ) );

    if ( this._events[ key ] !== undefined && this._events[ key ].length > 0 ) {
      for ( let i in this._events[ key ] ) {
        this._events[ key ][ i ].apply ( null , args );
      }
    }
  } ,
  /* 解除订阅事件 */
  remove : function () {

    let key;
    this._events[ key ] = [];
  }
};

export default eventProxy;

