const triggerResize = () => {
  if ( document.createEvent ) {
    const event = document.createEvent( 'HTMLEvents' );

    event.initEvent( 'resize', true, true );
    window.dispatchEvent( event );
  } else if ( document.createEventObject ) {
    const event = document.createEventObject();

    event.type = 'resize';
    document.body.fireEvent( 'onresize', event );
  }
};

const isDomLevel2 = ( typeof window !== 'undefined' ) && !!window.addEventListener;

const addEventListener = ( el, name, handler ) => {
  if ( isDomLevel2 ) {
    el.addEventListener( name, handler );
  }
  else {
    el.attachEvent( `on${ name }`, handler );
  }
};

const removeEventListener = ( el, name, handler ) => {
  if ( isDomLevel2 ) {
    el.removeEventListener( name, handler );
  }
  else {
    el.detachEvent( `on${ name }`, handler );
  }
};

export { triggerResize, addEventListener, removeEventListener, isDomLevel2 };
