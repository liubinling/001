import React, { Component, PropTypes } from 'react';
import { Page, Container,Button, Icon,DateTimePicker, PagiTable ,Col, Row, Select, Divider, Table, Column, Label,  Input, TreeSelect, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormItem , Option } from 'epm-ui';
import { MenuInline, Menu, InsertMenu } from '../components';

const page = {
    title:'微服务菜单'
}
class MenuInlineIndex extends Component {

    /**
     * The initial state to define
     * @param {object} props The first props
     */
    constructor( props ) {
        super( props );
        this.state = {
            flag:false,
            urlFlag:false,
            display:'none',
            menuInlineList : null || props.menuInlineList,
            menuHorizontaList : null || props.menuHorizontaList,
            initUrl : '' || props.initUrl,
            insertUrl : `${this.props.site.baseContextPath}/micro/GetInsertMenuView`,
            project_name : props.project_name || '',
	        project_icon : props.project_icon || '',
	        project_id : props.project_id || '',
	        height : '310px',
            dataSource:`${this.props.site.baseContextPath}/micro/MenuHorizonta`
        };
        this.changeUrl = this.changeUrl.bind( this );
        this.handleClick = this.handleClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);

    }
    componentDidMount() {
    	let height = (document.body.clientHeight-70)+"px" ;
    	this.setState({height:height});
    	window.addEventListener('resize',this.handleResize.bind(this));
    }
    
    componentWillUnmount(){
    	window.removeEventListener('resize',this.handleResize.bind(this));
    }
    
    handleResize(e){
    	let height = (document.body.clientHeight-70)+"px" ;
    	this.setState({height:height});
    }
    
    /*横向菜单点击事件*/
    handleClick(event, data ){
        this.setState({ menuId : data.id },
            () =>{
                this.getmenuHorizontaList(this.state.menuId);
            }
        );
    };

    /*获得纵向菜单数据*/
    getmenuHorizontaList( menuId ){

        fetch( this.state.dataSource,{ credentials:'include',method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            body: "menuId="+this.state.menuId}  )
            .then( ( response ) => response.json() )
            .then( ( data ) => this.setState({ menuHorizontaList:data[0], initUrl:data[1]}));

    }
    /*按钮点击事件*/
    handleButtonClick(){
        if(this.state.flag == true){
            this.setState({flag: false,display: 'none'});
            /*this.setState({flag: false, initUrl:'' });*/
        }else{
            this.setState({flag: true,display: 'block'});
            
            /*this.setState({flag: true, initUrl:`${this.props.site.baseContextPath}/micro/GetInsertMenuView` });*/
        }

    }
    
    /*改变iframe的url*/
    changeUrl(url){
	    if(this.state.urlFlag){
	    	this.state.urlFlag = false;
	    }else{
	    	this.state.urlFlag = true;
	    }
	    url = url+"?flag="+this.state.urlFlag;
    	this.setState({initUrl:url,flag:false,display:'none'});
    }

    render() {

        return (
            <div style={{width:'100%',height:'100%',overflowY:'hidden'}}>
                <div style={{width:'100%',backgroundColor:'#f0f0f0',height:'70px',}}>
                    <div style={ {paddingTop:'22px', paddingLeft: '20px', fontSize: '1.075rem', fontcolor:'#000000'}}>
                         <Icon type={this.state.project_icon} /> {this.state.project_name}
                    </div>
                    <div style={ { position:'absolute',top:'0',left:'15%',right:'0',bottom:'0'} }>
                        <MenuInline menuInline={ this.state.menuInlineList } onClick = { this.handleClick } />
                    </div>
                    <div style={{position:'absolute',paddingTop:'20px',top:'0',left:'97%',right:'0',bottom:'0'}}>
                        <Button type="icon" onClick = { this.handleButtonClick }><Icon type="life-saver" /></Button>
                    </div>
                </div>

                <div style={{position: 'absolute',top: '70px', right: '0',left:'0',bottom:'0'}} >
                    <div style={{height:'100%',position:'absolute',top: '0',right: '0',bottom: '0',left:'15%'}}>
                        <iframe id="menuFrame" name="menuFrame"  src={this.state.initUrl} style={{ borderWidth:'0px',width:'100%',height:'100%' }} />
                    </div>
                    <div style={{width:'15%'}}>
                        <Menu menu={ this.state.menuHorizontaList }  />
                    </div>
                </div>
                <div style={{ width:'350px',float:'right', display:this.state.display}}>
                    <div style={{width:'300px',right:'0px',height:this.state.height,overflowY:'scroll',backgroundColor:'#fff',position: 'absolute',borderLeft: '1px solid #e0e0e0'}}>
                    	<InsertMenu project_name = { this.state.project_name } project_icon = { this.state.project_icon } project_id = { this.state.project_id } handleMore = { this.changeUrl } />
                	</div>
                </div>
            </div>

        );
    }

}

MenuInlineIndex.epmUIPage = page;

export default MenuInlineIndex;
