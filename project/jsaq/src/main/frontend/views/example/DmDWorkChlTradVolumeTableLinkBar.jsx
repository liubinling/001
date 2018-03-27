import React, { Component } from 'react';
import { Container, Page,  Row, Col, Table, Column, Divider, Bar } from 'epm-ui';
import { fmoney } from './numFormate';


const page = {
  title: "普通表格联动柱图"
};
class NormalTable extends Component {

    constructor( props ) {
        super( props );
		//初始化参数
        this.state = {
            dayId:'20161210',
            chanType:'mininew',
            kpiId:'USER_COUNT',
            //地域：默认展示000即北十的数据
            regionId:'000',
            //初始化表头
            tableTitle:['接入类型','使用用户数（户）','查询量（笔）','办理量（笔）','交易量（笔）','交易金额（元）'],
            //初始化列和对应的数据，如果没有数据展示“--”
            tableMap:[{KPI_DESC:'--',USER_COUNT:'--',CX_COUNT:'--',BL_COUNT:'--',JY_COUNT:'--',PAY_FEE:'--'}],
            //表格数据的数据源url
            dataSource:`${this.props.site.baseContextPath}/DmDWorkChlTradVolumeTableLinkBar/DmDWorkChlTradVolumeTableData`,
		    title:'mini厅 使用用户数（户）',
		    //地域分布柱图的数据源url
		    dataSourceBar:`${this.props.site.baseContextPath}/DmDWorkChlTradVolumeTableLinkBar/DmDWorkChlTradVolumeBarData`,
		    //业务分布柱图的数据源url
		    dataSourceBar2:`${this.props.site.baseContextPath}/DmDWorkChlTradVolumeTableLinkBar/DmDWorkChlTradVolumeBarData2`

        }
    }
	//页面加载执行的方法：请求后台初始化表格数据和两个柱图数据
    componentDidMount() {
        this.initTableData();
        this.initBarData();
    }
	//请求后台获取表格数据
    initTableData(){
        fetch( this.state.dataSource, { credentials: 'include',method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            body: "kpiId="+this.state.kpiId+"&chanType="+this.state.chanType+"&dayId="+this.state.dayId+"&regionId="+this.state.regionId}  )
            .then( ( response ) => response.json() )
            .then( ( data ) => this.assignTableData(data));
    }
    //表格数据赋值给tableMap
    assignTableData( data ) {
        this.setState({tableMap:data});
    };
    //请求后台获取柱图数据：type=1地域分布柱图；type=2业务分布柱图
    initBarData(){
        fetch( this.state.dataSourceBar,  { credentials: 'include',method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            body: "kpiId="+this.state.kpiId+"&chanType="+this.state.chanType+"&dayId="+this.state.dayId+"&regionId="+this.state.regionId}  )
            .then( ( response ) => response.json() )
            .then( ( data ) => this.assignBarData(data,1));
        fetch( this.state.dataSourceBar2,  { credentials: 'include',method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            body: "kpiId="+this.state.kpiId+"&chanType="+this.state.chanType+"&dayId="+this.state.dayId+"&regionId="+this.state.regionId}  )
            .then( ( response ) => response.json() )
            .then( ( data ) => this.assignBarData(data,2));
    }
    //把获取到的两个结果集data，通过type区分是哪个柱图。分别赋值给barData（地域分布），barData2（业务分布）；
    assignBarData( data,type ) {
    	if(type==1){
        	this.setState({barData:data[0],barColorData:data[1]});
    	}else{
    		this.setState({barData2:data[0],barColorData2:data[1]});
    	}
    };
	//点击表格中用户数，联动柱图方法
    getDetail(value,index,rowData,kpi_id, name){
        let tempTitle = rowData.KPI_DESC+'    '+name;
        this.setState({title:tempTitle,chanType:rowData.CHAN_TYPE,kpiId:kpi_id},() =>{
            this.initBarData();
        });

    }


    render() {
        /*设置柱状图的宽和高，配合autoScaling ={ false }*/
        const size = { height: 400, width: 700 };

        /*设置柱状图标题*/
        let title = {
            text:this.state.title+'  地域分布',
            textStyle:{
                color : '#333' ,
                fontStyle:'normal',
                fontWeight:'bolder' ,
                fontFamily:'sans-serif',
                fontSize : 18
            },
            position:['center','top']
        };

        /*设置柱状图标题*/
        let title2 = {
            text:this.state.title+'  业务分布',
            textStyle:{
                color : '#333' ,
                fontStyle:'normal',
                fontWeight:'bolder' ,
                fontFamily:'sans-serif',
                fontSize : 18
            },
            position:['center','top']
        };

        /*设置图例标题*/
        const legend = {
            textStyle:{
                color : '#333' ,
                fontStyle:'normal',
                fontWeight:'normal',
                fontFamily:'sans-serif',
                fontSize : 12
            },
            position:['center','8%','vertical']
        };

        return (
            <Page>
                <Row>
                    <Col size={24}>
                        <Table dataSource={this.state.tableMap}>
                            <Column title={this.state.tableTitle[0]} dataIndex="KPI_DESC" />
                            <Column title={this.state.tableTitle[1]} dataIndex="USER_COUNT" >
                                { ( value,index,rowData ) => <a onClick={this.getDetail.bind(this,value,index,rowData,'USER_COUNT', '使用用户数（户）')}>{ value }</a> }
                            </Column>
                            <Column title={this.state.tableTitle[2]} dataIndex="CX_COUNT">
                            	{ ( value,index,rowData ) => <a onClick={this.getDetail.bind(this,value,index,rowData,'CX_COUNT', '查询量（笔）')}>{ value }</a> }
                            </Column>
                            <Column title={this.state.tableTitle[3]} dataIndex="BL_COUNT">
                                { ( value,index,rowData ) => <a onClick={this.getDetail.bind(this,value,index,rowData,'BL_COUNT', '办理量（笔）')}>{ value }</a> }
                            </Column>
                            <Column title={this.state.tableTitle[4]} dataIndex="JY_COUNT">
                                { ( value,index,rowData ) => <a onClick={this.getDetail.bind(this,value,index,rowData,'JY_COUNT', '交易量（笔）')}>{ value }</a> }
                            </Column>
                            <Column title={this.state.tableTitle[5]} dataIndex="PAY_FEE">
                                { ( value,index,rowData ) => <a onClick={this.getDetail.bind(this,value,index,rowData,'PAY_FEE', '交易金额（元）')}>{ value }</a> }
                            </Column>
                        </Table>
                        <Divider />
                    </Col>

                    <Col size={12}>
                        <Bar dataSource={ this.state.barData } extend={ this.state.barColorData }  title ={ title } legend = { legend } size={ size }  autoScaling ={ false }/>
                    </Col>
                    <Col size={12}>
                        <Bar dataSource={ this.state.barData2 } extend={ this.state.barColorData2 }  title ={ title2 } legend = { legend } size={ size }  autoScaling ={ false }/>
                    </Col>
                </Row>

            </Page>
        );
    }

}
NormalTable.epmUIPage = page;
export { NormalTable };
export default NormalTable;