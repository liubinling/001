const isObj = ( object ) => {
  return object && typeof ( object ) == 'object' && Object.prototype.toString.call( object ).toLowerCase() === '[object object]';
};

const isArray = ( object ) => {
  return object && typeof ( object ) == 'object' && object.constructor === Array;
};

const compareObj = ( objA, objB, flag ) => {
  for ( const key in objA ) {
    // 跳出整个循环
    if ( !flag ) {
      break;
    }

    if ( !objB.hasOwnProperty( key ) ) {
      flag = false; break;
    }

    // 子级不是数组时,比较属性值
    if ( !isArray( objA[ key ] ) ) {
      if ( !isArray( objB[ key ] ) ) {
        flag = false;
        break;
      }

      const oA = objA[ key ];
      const oB = objB[ key ];

      if ( oA.length !== oB.length ) {
        flag = false;
        break;
      }

      for ( const k in oA ) {
        // 这里跳出循环是为了不让递归继续
        if ( !flag ) {
          break;
        }

        flag = compareObj( oA[ k ], oB[ k ], flag );
      }
    } else if ( objB[ key ] !== objA[ key ] ) {
      flag = false;
      break;
    }
  }

  return flag;
};

const compare = ( objA, objB ) => {
  // 判断类型是否正确
  if ( !isObj( objA ) || !isObj( objB ) ) {
    return false;
  }

  // 默认为true
  return compareObj( objA, objB, true );
};

export { compare };
export default compare;