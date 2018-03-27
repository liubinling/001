import React, { Component } from 'react';
import { Page, Table, Column, CloumnGroup, context } from 'epm-ui';
const page = {
  title: "下钻表格"
};
class OneOffTable1 extends Component {

  constructor( props ) {
    super( props );
	this.state = {
	  kpiId:'root',
	  //初始化页面数据url
      dataSource: `${this.props.site.baseContextPath}/KpiCodeExtendTable/KpiCodeExtendTableData`,
      dataSourceList:[]
    };
    this.handleExpandTable = this.handleExpandTable.bind( this );
  }
	//加载页面执行方法
	componentDidMount() {
        this.initTableData();
    }
    //表格数据获取方法
    initTableData(){
        fetch( this.state.dataSource, { credentials: 'include',method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
            body: "parent_id="+this.state.kpiId}  )
            .then( ( response ) => response.json() )
            .then( ( data ) => this.assignTableData(data));
    }
    assignTableData( data ) {
        this.setState({dataSourceList:data});
    };
	//点击下钻图标，返回要请求的url。组件自动请求该url、获取结果集
  handleExpandTable( rowData ){  
    	const drillUrl = `${ context.contextPath }/KpiCodeExtendTable/KpiCodeExtendTableData`+"?parent_id="+rowData.kpiId;
      	return drillUrl;
  }

  render() {
    const extendTableColumns = [
      {
        title: '指标名称',
        key: 'KPI_NAME'
      }, {
        title: '单位',
        key: 'KPI_UNIT'
      }, {
        title: '指标编码',
        key: 'kpiId'
      },
      {
        title: '父节点',
        key: 'parentId'
      }
    ];

    return (
      <Page>
        <Table dataSource={ this.state.dataSourceList } columns={ extendTableColumns } multiLine={ true } onExpandClick={ this.handleExpandTable } />
      </Page>
    );
  }

}
OneOffTable1.epmUIPage = page;
export default OneOffTable1;