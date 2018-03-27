import React, { Component, PropTypes } from 'react';
import { compare } from '../base/deepEqual';

import echarts from 'echarts';


import 'zrender/lib/vml/vml';
import { isDomLevel2, addEventListener, removeEventListener } from '../base/event';

/**
 * EchartsBase
 */
class EchartsBase extends Component {

  /**
   * constructor
   */
  constructor( props ) {
    super( props );

    this.state
      = props.autoScaling
      ? { style: { width: '100%', height: '0' } }
      : { style: props.style }
    ;

    this.resizeHandler = this.resizeHandler.bind( this );
    this.eventHandler = this.eventHandler.bind( this );
  }

  /**
   * 初始化图表、监听浏览器窗口变化
   */
  componentDidMount() {
    //  初始化图表并且 setOption
    const instance = this.instance = echarts.init( this.element );

    if ( this.props.option ) {
      instance.setOption( this.props.option, true );
    }

    //  监听浏览器窗口变化
    addEventListener( window, 'resize', this.resizeHandler );
    if ( isDomLevel2 ) {
      addEventListener( document.body, 'resize', this.resizeHandler );
    }

    //  获取图表正确的宽高并 resize
    this.resizeHandler();

    //  获取图表点击事件
    this.eventHandler();
  }

  /**
   * 判断是否自适应并 resize
   */
  resizeHandler() {
    if ( this.props.autoScaling ) {
      const scale = this.props.scale;
      const width = this.element.offsetWidth;

      this.setState( { style: { width: '100%', height: '100%' } }, () => {
        this.instance.resize();
      } );
    } else {
      this.instance.resize();
    }
  }

  /**
   * 获取图表事件，返回事件信息
   */
  eventHandler() {
    this.instance.on( 'click', ( params ) => {
/*      const param = {};
      const data = {};
      const obj = {};

      param.event = params.event;
      param.data = [];

      data.item = params.seriesName;
      data.color = params.color;
      data.data = [];

      obj.key = params.name;
      obj.value = params.value;

      data.data.push( obj );
      param.data.push( data );*/

      if ( this.props.onClick ) {
        this.props.onClick( params );
      }
    } );
  }

  /**
   * 解除监听
   */
  componentWillUnmount() {
    removeEventListener( window, 'resize', this.resizeHandler );
    if ( isDomLevel2 ) {
      removeEventListener( document.body, 'resize', this.resizeHandler );
    }
  }

  /**
   * setOption
   */
  componentWillReceiveProps( nextProps ) {
    if ( nextProps.option && compare( nextProps.option, this.props.option ) === false ) {
      this.instance.setOption( nextProps.option, true );
    }
  }

  /**
   * render
   */
  render() {
    return (
      <div ref={ ( div ) => this.element = div } style={ this.state.style } />
    );
  }
}

EchartsBase.propTypes = {
  autoScaling: PropTypes.bool,
  scale: PropTypes.number,
  style: PropTypes.object,
  option: PropTypes.object,
  onClick: PropTypes.func
};

EchartsBase.defaultProps = {
  autoScaling: true,
  scale: 0.618
};

export { EchartsBase };
export default EchartsBase;
