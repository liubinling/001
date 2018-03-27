import React, { Component } from 'react';
import { Container, Modal,ModalHeader, ModalBody, Row, Col, Table, Column, Pagination, Divider } from 'epm-ui';
import { fmoney } from './numFormate';
const page = {
  title: "分页表格"
};
class PageTable extends Component {

    constructor( props ) {
        super( props );

        this.state = {
        	custType:'01',
        	//表头
            tableTitle:['第一列','第二列','第三列','第四列','第五列'],
            //表格列初始化，如果没有值展示“--”
            tableMap:[{value1:'--',value2:'--',value3:'--',value4:'--',value5:'--'}],
            //用于分页
            tempMap:[{value1:'--',value2:'--',value3:'--',value4:'--',value5:'--'}],
            tableLength:0,
            //默认值为1，当前页
            tableIndex:1,
            //每页条数
            tableSize:5,
            //所显示的可选页数
            tablePages:12,
            //表格获取数据url
            dataSource:`${this.props.site.baseContextPath}/DmDZyYcsrfxManualPagiTable/DmDZyYcsrfxManualPagiTableData`
        }
        this.handleChangePagination = this.handleChangePagination.bind( this );

    }
	//加载页面的时候执行
    componentDidMount() {
    //初始化页面表格方法
        this.initData();
    }
	//获取表格数据
    initData(){
        fetch( this.state.dataSource, {credentials: 'include', method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            body: "custType="+this.state.custType}  )
            .then( ( response ) => response.json() )
            .then( ( data ) => this.assignData(data));
    }
	//对表格数据加工
    assignData( data ) {
        this.state.tempMap=data;
    	let pages=Math.ceil(data.length/this.state.tableSize);
    	this.state.tableLength = data.length;
        this.state.tablePages = pages;
        //默认展示第一页
        this.handleChangePagination(1,this.state.tableSize);
    };


	//处理分页数据，每页数据成表格
    handleChangePagination(index,size){
        let colindex = 0 ;

        if( index == 1){
            colindex = 0
        }else{
            colindex=(index-1)*size;
        }

        let tableList = [];
        this.setState({tableMap:[]});
        let pageIndex = 0;
        if(index == this.state.tablePages){
            pageIndex = this.state.tableLength;
        }else{
            pageIndex = index*size;
        }
        for(let i=colindex;i<pageIndex;i++){
            let tableMapTemp={};
            tableMapTemp = this.state.tempMap[i];
            tableList.push(tableMapTemp);
        }

        this.setState({tableMap:tableList,tableIndex:index});

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size={24}>
                        <Table dataSource={this.state.tableMap}>
                            <Column title={this.state.tableTitle[0]} dataIndex="MONTH_ID" />
                            <Column title={this.state.tableTitle[1]} dataIndex="REGION_ID" />
                            <Column title={this.state.tableTitle[2]} dataIndex="KPI_CODE"/>
                            <Column title={this.state.tableTitle[3]} dataIndex="KPI_REMARK"/>
                            <Column title={this.state.tableTitle[4]} dataIndex="KPI_VALUE"/>
                        </Table>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col size={24}>
                        <div style={{float:'right'}}>
                            <Pagination index={ this.state.tableIndex } size={this.state.tableSize} total={ this.state.tableLength } onChange={this.handleChangePagination}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

}
PageTable.epmUIPage = page;
export { PageTable };
export default PageTable;