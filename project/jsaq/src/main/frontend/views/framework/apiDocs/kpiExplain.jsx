import React, { Component,PropTypes } from 'react';
import { Page, Divider,Table, Input, Button, Container, Column } from 'epm-ui';


const page = {
  title: "指标解释使用说明"
};

const tableKpiExplainData = [
    {
        "name":"KPI_ID",  
        "type":"varchar",
        "length":"200",
        "isNull":"否",
        "description":"指标内容的ID"
    },
    {
        "name":"KPI_NAME", 
        "type":"varchar",
        "length":"200",
        "isNull":"否",
        "description":"指标内容的名字"
    },
    {
        "name":"KPI_EXPLAIN", 
        "type":"varchar",
        "length":"2000",
        "isNull":"否",
        "description":"对应指标的解释内容"
    },
    {
        "name":"DATE", 
        "type":"varchar",
        "length":"200",
        "isNull":"否",
        "description":"引导新增数据后在表格中的显示位置顺序"
    }
];


const tableKpiExplainColumns = [
    {
      "title": "名称",
      "key": "name"
    },
    {
      "title": "类型",
      "key": "type"
    },
    {
      "title": "长度",
      "key": "length"
    },
    {
      "title": "允许空值",
      "key": "isNull"
    },
    {
      "title": "注释",
      "key": "description"
    }
];

const tableData = [
    {
        "KPI_ID":"KPI_006", 
        "KPI_NAME":"FTTH/O接入发展用户",
        "KPI_EXPLAIN":"5nini5454",
        "DATE":"2017-06-01 09:43:17"
    }
];


const tableColumns = [
    {
      "title": "KPI_ID",
      "key": "KPI_ID"
    },
    {
      "title": "KPI_NAME",
      "key": "KPI_NAME"
    },
    {
      "title": "KPI_EXPLAIN",
      "key": "KPI_EXPLAIN"
    },
    {
      "title": "DATE",
      "key": "DATE"
    }
];

const tableData02 = [
    {
        "ID":"input",
        "模块名称":"input",
        "指标解释":"通过鼠标或键盘输入内容，用于解释对应指标的信息"
    }
];


const tableColumns02 = [
    {
      "title": 'ID',
      "key": "ID"
    },
    {
      "title": '模块名称',
      "key": "模块名称"
    },
    {
        "title": '指标解释',
        "key": "指标解释"
      }
];

class toolClass extends Component {

    render() {
        return (
            <Page>
                <Container type="fluid">
                    <h1>{ page.title }</h1>
                    <Divider />
                    <h4>1.使用步骤</h4>
                    <h5>即可使用</h5>
                    <Divider />
                    <h4>2.代码示例</h4>
                    <div style={{border:'1px solid #16325c',paddingLeft:'10px',backgroundColor:'#474949',color:'#d1d9e1'}}>
                        <div>
                            <pre><code>
                                <h5>1. preview:false,preId:&apos;&apos;,preName:&apos;&apos;,preExplain:&apos;&apos;,preInfo:&apos;&apos;,&#123;&#125;; <br/></h5>
                                <h5>路径：dataSourceRev:`$&#123;this.props.site.baseContextPath&#125;/KpiExplain/RevData`<br/></h5>
                                <h5>2.this.handleClick1 = this.handleClick1.bind( this );<br/></h5>
                                <h5>3.showModal(value,index,rowData) &#123;&nbsp;&nbsp;&nbsp;&nbsp;//相关参数及设定指标解释内容初始值<br/></h5>   
                                <h5> &nbsp;&nbsp;&nbsp;&nbsp;  this.setState( &#123; preview: true, preId:rowData.KPI_ID,preExplain:rowData.KPI_EXPLAIN,preName:rowData.KPI_NAME,preInfo:rowData &#125; );&#125;<br/></h5>
                                <h5>4.handleClick1() = &#123; <br/></h5>
                                <h5>&nbsp;&nbsp;&nbsp;&nbsp;fetch( `$&#123;this.state.dataSourceRev, &#123; credentials:'include', method: 'POST', <br/></h5>
                                <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    headers: &#123; 'Content-Type': 'application/x-www-form-urlencoded', &#125;, <br/></h5>
                                <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        body: &quot;&preExplain=&quot;+ encodeURIComponent(this.state.saveExplain)+&quot;&preId=&quot;+ encodeURIComponent(this.state.saveId)&#125;  )   <br/></h5>
                                <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   .then( ( response ) => response.json() ); <br/></h5>
                                <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    .then( ( data ) =>  this.assignDataPre( data); <br/></h5>
                                <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    .catch( ( err ) => console.error( this.state.dataSourceRev, err.toString() ) ); <br/></h5>
                                <h5>&#125;</h5>
                                <h5>5.assignDataPre( data ) &#123;<br/></h5>
                                <h5>&nbsp;&nbsp;&nbsp;&nbsp;this.handleClose();&nbsp;&nbsp;&nbsp;&nbsp;//调用模态框关闭按钮<br/></h5>
                                <h5>&nbsp;&nbsp;&nbsp;&nbsp;this.initData();&nbsp;&nbsp;&nbsp;&nbsp;//componentDidMount生命周期的fetch方法<br/></h5>
                                <h5>&#125;</h5>
                                <h5>//模态框的内容</h5>
                                <h5>6.&lt;Modal visible=&#123; this.state.preview &#125; onClose=&#123; this.handleClose.bind( this ) &#125; &gt;<br/></h5>
                                <h5>&lt;ModalHeader &gt;<br/></h5>
                                <h5>&#123;this.state.preInfo.KPI_NAME&#125;&nbsp;&nbsp;&nbsp;&nbsp;//在表头显示对应的模块名称<br/></h5>
                                <h5>&lt;/ModalHeader &gt;<br/></h5>
                                <h5>&lt;ModalBody &gt;<br/></h5>
                                <h5>&lt;Textarea rows={ 15 } name="textarea"  value=&#123;this.state.preInfo.KPI_EXPLAIN&#125; readonly/ &gt;&nbsp;&nbsp;&nbsp;&nbsp;//此处可通过rows的数量来调整文本编辑框的大小并影响模态框的大小<br/></h5>
                                <h5>&lt;/ModalBody &gt;<br/></h5>
                                <h5>&lt;/Modal &gt;<br/></h5>
                                
                            </code></pre>
                        </div>
                        
                    </div>
                    
                    <Divider />
                    <h4>3.数据库数据存储字段</h4>
                    <h5>(1).表名：MS_KPI_EXPLAIN</h5>
                    <h5>(2).表结构</h5>
                    <Table dataSource={tableKpiExplainData} columns={ tableKpiExplainColumns } />
                    <h5>(3).表数据</h5>
                    <Table dataSource={ tableData } columns={ tableColumns } />
                    <Divider />
                    <h4>4.注意事项</h4>
                    <h5>(1).指标ID(KPI_ID)要唯一</h5>
                    <h5>(2).搜索框是针对模块名称的模糊查询</h5>
                    <h5>(3).表格可拖拽</h5>
                    <h5>(4).符合条件的表数据</h5>
                    <Table dataSource={ tableData02 } columns={ tableColumns02 } />
                </Container>    
            </Page>
    );
  }

}

toolClass.epmUIPage = page;

export default toolClass;
export { toolClass };