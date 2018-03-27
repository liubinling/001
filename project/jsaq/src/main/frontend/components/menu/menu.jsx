import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Menu: 菜单组件
 */
class Menu extends Component {

  constructor( props ) {
    super( props );

    this.handleEvent = this.handleEvent.bind( this );
    this.handleExtended = this.handleExtended.bind( this );
  }

  /**
   * Menu: 菜单折叠与展开
   */
  handleEvent( event ) {
    this.props.linkClick && this.props.linkClick( event );

  	let target = event.target,
  	    curele = target.parentNode.nextElementSibling,
        arrow  = target.nextElementSibling,
        uls = "";

        if ( arrow.className != " epm-menu-i-arrow" ) {
          if ( arrow.className.includes( "down" ) ) {                 //根据箭头方向判断折叠与否
            curele.style.display = "none";
            arrow.className = "fa fa-angle-right";

            uls = curele.getElementsByTagName("ul");                 //关闭当前菜单项
          } else if ( arrow.className.includes( "right" ) ) {
            curele.style.display = "block";
            arrow.className = "fa fa-angle-down";

            uls = document.getElementsByClassName( "epm-menu-ul" );  //关闭所有不相干菜单项
          }

          if ( uls ) {
            uls = [].slice.call( uls );
          /*  this.handleExtended( curele, arrow.className, uls ); */	
          }
        }
  }

  /**
   * 遍历需要关闭的菜单项
   * 并修改箭头指示方向
   */
  handleExtended( curele, arrowStyle, targets ) {
    let targetId = curele.getAttribute( "id" );

    for( let i = 1; i < targets.length; i++ ) {
      let relateId  = targets[i].getAttribute("id"),
          targetArrow = targets[i].previousSibling.lastChild;

      if ( targetId.substring( 0, relateId.length ) == relateId ) {
        targets[i].style.display = curele.style.display;
        if ( targetArrow ) {
          targetArrow.className = arrowStyle;
        }
      } else {
        targets[i].style.display = "none";
        if ( targetArrow ) {
          targetArrow.className = "fa fa-angle-right";
        }
      }
    }
  }
 
  render() {
  	let { order, expanded, menu } = this.props;
    if ( order==undefined ) order = '';

    const cls = classNames( {
      "epm-menu-ul": true,
      "epm-menu-sub-expanded": expanded||order=='',
      "epm-menu-sub-closed": !expanded&&order!=''
    } );

    return (
	  <ul id={ order } className={ cls }>
	    {
	      menu.map( ( item, index ) => {
	        return <MenuItem key={ index } order={ order + '-'+ index } onClick={ this.handleEvent } { ...item } />;	
	      } )
	    }
	  </ul>
    );
  }

}

/**
 * MenuItem: 菜单项组件
 */
class MenuItem extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      isDisplay: false || props.expanded
    };

    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( event ) {

    this.props.onClick && this.props.onClick( event );
  }

  /**
   * 菜单项缩进规则
   */
  getRetract( size ) {
  	let list=size.split('-');
    let str = "";
    for( let i = 0; i < list.length - 2; i++ ) {
      str += "    "
    }

    return <span style={ { whiteSpace: 'pre', display: 'inline-block' } }>{ str }</span>;
  }

  render() {
    const { isDisplay } = this.state;
  	const { order, icon, url, name, expanded, submenu, targetUrl } = this.props;
	let hrefContent ='';
    if(url != null){
        hrefContent = url;
    }else{
    	hrefContent = "javascript:void(0);";
    }
    const cls = classNames( {
      'fa fa-angle-down': isDisplay,
      'fa fa-angle-right': !isDisplay
    } );

  	return (
  	  <li>
  	  {
        <div className="epm-menu-wrapper" onClick={ this.handleClick }>
          <a className="epm-menu-list" href={ hrefContent } target={targetUrl}>
            { this.getRetract( order ) }
            { icon? <i className={ "fa fa-" + icon + " epm-menu-i-icon" } />: null }
            { name }
          </a>
          { <i className={ submenu? cls: "" + " epm-menu-i-arrow" } /> }
        </div>
  	  }
  	  { submenu? <Menu order={ order } expanded={ expanded } menu={ submenu } />: null }
  	  </li>
  	);
  }
}

export default Menu;
export { Menu };
