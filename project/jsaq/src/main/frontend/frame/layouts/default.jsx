import React, { Component, PropTypes } from 'react';

class DefaultLayout extends Component {
  
  render() {
    return (
      <div id={ this.props.id } style={{height:'100%'}}>
        { this.props.children }
      </div>
    );
  }
  
}

DefaultLayout.propTypes = {
  children: PropTypes.node
};

export default DefaultLayout;
