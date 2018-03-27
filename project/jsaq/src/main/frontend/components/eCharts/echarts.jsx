import React, { Component } from 'react';
import EchartsBase from './base-echarts';

class Echarts extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      option: {},
      onEvents: { 'click': this.props.onClick }
    };
  }

  componentDidMount() {
    const option = this.props.option;

    if ( typeof option === 'string' && fetch ) {
      fetch( option, { credentials: 'same-origin' } )
        .then( ( response ) => response.json() )
        .then( ( option ) => { this.setState( { option } ) } )
        .catch( ( err ) => console.error( option, err.toString() ) );
    }
  }

  componentWillReceiveProps( nextProps ) {
    const { option } = nextProps;

    if ( option && option !== this.props.option ) {
      if ( typeof option === 'string' && fetch ) {
        fetch( option, { credentials: 'same-origin' } )
          .then( ( response ) => response.json() )
          .then( ( option ) => { this.setState( { option } ) } )
          .catch( ( err ) => console.error( option, err.toString() ) );
      } else {
        this.setState( { option } );
      }
    }
  }

  render() {
    return(
      <EchartsBase { ...this.state } { ...this.props }/>
    );
  }
}

export { Echarts };
export default Echarts;