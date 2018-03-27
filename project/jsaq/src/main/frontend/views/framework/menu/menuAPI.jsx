import React, { Component, PropTypes } from 'react';
import { Menu } from '../../components/';

const page = {
	title:'微服务手册'
} 
class MenuIndex extends Component {

    /**
     * The initial state to define
     * @param {object} props The first props
     */
    constructor( props ) {
        super( props );
        this.state = {
            menuData : null || props.menuList,
            iframeUrl : '' || props.initUrl
        };
        
    }

 
    render() {

       /* menu菜单数据格式*/
        const treeData = [
            {
                'id': '1',
                'name': '表格下钻',
                "link": `${this.props.site.baseContextPath}/Example/example`,
                "targetUrl" : "menuFrame"
            },
            {
                'id': '2',
                'name': '上传下载功能',
                'expanded': true,
                'submenu': [
                    {
                        'id': '1-1',
                        'name': '下载',
                        "link": `${this.props.site.baseContextPath}/downloadlogs/index`,
                        "targetUrl" : "menuFrame",
                    },
                ]
            }

        ];

        return (
			<div style={{width:'100%',height:'100%'}} >
				<div style={{width:'83%', height:'100%',float: 'right'}}>
                    {/*    <iframe id="menuFrame" name="menuFrame"   scrolling="no" onLoad={this.changeFrameHeight} height={this.state.iframeHeight} style={{ borderWidth:'0px',width:'100%' }} />
                    */}
					<iframe id="menuFrame" name="menuFrame" src={ this.state.iframeUrl } style={{ borderWidth:'0px',width:'100%',height:'100%' }} />
                    
				</div>
				<div style={{width:'17%'}}>
					<Menu menu={ this.state.menuData } />
				</div>
			</div>
            
        );
    }

}

MenuIndex.epmUIPage = page;

export default MenuIndex;
