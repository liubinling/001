const deepcopy = ( obj ) => {
  const newobj = obj.constructor === Array ? [] : {};

  if ( typeof obj !== 'object' ) {
    return;
  } else if ( typeof obj === 'object' ) {
    for( let i in obj ) {
      newobj[i] = typeof obj[i] === 'object' ?
        deepcopy( obj[i] )
        :
        obj[i];
    }
  }

  return newobj;
};

export { deepcopy };
export default deepcopy;