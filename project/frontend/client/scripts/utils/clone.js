

/**
 * 对象、数组、其他数据类型的深度克隆
 * @param data
 * @returns {*}
 */
function clone ( data ) {
  let o = null;

  if ( typeof data === 'object' ) {
    if ( data === null ) {
      o = null;
    } else if ( data instanceof Array ) {
      o = [];
      for ( let i = 0, len = data.length; i < len; i++ ) {
        o.push( clone( data[ i ] ) );
      }
    } else {
      o = {};
      for ( const j in data ) {
        o[ j ] = clone( data[ j ] );
      }
    }
  } else {
    o = data;
  }

  return o;
}

export { clone };
export default clone;

