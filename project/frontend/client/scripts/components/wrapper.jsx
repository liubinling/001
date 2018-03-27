import React, { Component } from 'react';

/**
 *  Define a Wrapper Component
 */
class Wrapper extends Component {

  /**
   *   The react to provide a render method is used to form a rendering
   */
  render() {

    return (
        <div className="wrapperContent" style={ { padding:"16px 16px"  }}>
          { this.props.children }
        </div>
    );
  }
}


export { Wrapper };
export default Wrapper;