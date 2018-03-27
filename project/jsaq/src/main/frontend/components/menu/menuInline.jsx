import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Menu: 菜单组件
 */
class MenuInline extends Component {

    constructor( props ) {
        super( props );
        this.handleMenuInlineClick = this.handleMenuInlineClick.bind( this );
    }
    handleMenuInlineClick( event ,data) {
        this.props.onClick && this.props.onClick( event,data );
    }
    render() {
        let { menuInline } = this.props;
        return (
            <ul  className='my-ui-menu'>
                {
                    menuInline.map( ( item, index ) => {
                        return <MenuInlineItem key={ index }   { ...item } onClick={ this.handleMenuInlineClick }/>;
                    } )
                }
            </ul>
        );
    }

}

/**
 * MenuItem: 菜单项组件
 */
class MenuInlineItem extends Component {
    constructor( props ) {
        super( props );

        this.handleMenuInlineItemClick = this.handleMenuInlineItemClick.bind( this );
    }

    handleMenuInlineItemClick( event ) {
        this.props.onClick && this.props.onClick( event, this.props );
    }


    render() {
        const { id, icon, url, name,  submenu, targetUrl } = this.props;
        let hrefContent ='';
        if(url != null){
            hrefContent = url;
        }else{
            hrefContent = "javascript:void(0);";
        }

        return (
            <li className = 'my-ui-inline_li'>
                {
                    <div className="epm-menu-wrapper" onClick={ this.handleMenuInlineItemClick }>
                        <a className="my-menu-list" href={ hrefContent } target={targetUrl}>
                            { icon? <i className={ "fa fa-" + icon + " epm-menu-i-icon" } />: null }
                            { name }
                        </a>
                    </div>
                }
                { submenu? <MenuInline  menuInline={ submenu } />: null }
            </li>
        );
    }
}

export default MenuInline;
export { MenuInline };
