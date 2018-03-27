import React, { Component } from 'react';
import { Waterfall } from '../components';
import { Line,Bar,Scatter,Pie,Divider,Button,Table,Column,Loading,Alert } from 'epm-ui';

const page = {
   title: "流加载示例"
};

const partList=[ 'part1','part2','part3','part4'];     //确定要将全部内容分为几部分
let showPart = 1;    //默认展示部分个数
const showPartList = [
  `part1`   //默认展示哪个部分，与showPart的个数对应。
];

class IndexPage1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  monthId: '201702',   //参数
	      kpiCode:'KPI001',      
	      provId:'017',
		  data: showPartList,
		  tableTitle:['归属省份','指标编码','指标名称','指标单位','指标值'],
		  tableMap:[{REGION_DESC:'--',KPI_CODE:'--',KPI_NAME:'--',KPI_UNIT:'--',KPI_VALUE:'--'}],
		  dataSourceTable:`${this.props.site.baseContextPath}/FlowLoad/tableData`,
		  dataSourceLine:`${this.props.site.baseContextPath}/FlowLoad/lineData`,
		  dataSourceBar:`${this.props.site.baseContextPath}/FlowLoad/barData`,
		  dataSourcePie:`${this.props.site.baseContextPath}/FlowLoad/pieData`,
		  lineTitle:'',
		  barTitle:'',
		  pieTitle:'',
		  buttonType: 'block',
		  showLoading: false
		};
    this.showMorePart = this.showMorePart.bind( this );
    this.orderScroll = this.orderScroll.bind( this );
    this.scrollBottom = this.scrollBottom.bind( this );
    this.tableData = this.tableData.bind( this );
    this.lineData = this.lineData.bind( this );
    this.barData = this.barData.bind( this );
    this.pieData = this.pieData.bind( this );
   }
	
	componentDidMount() {
		  window.addEventListener('scroll', this.orderScroll);    //监听滚动条滚动
		  this.tableData();
		  this.lineData();
		  this.barData();
		}
		
	//表格数据
	tableData(){
	  fetch( this.state.dataSourceTable,{ credentials: "include", method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
            body: "monthId="+this.state.monthId+"&kpiCode="+this.state.kpiCode+"&provId="+this.state.provId
         })
       .then( ( response ) => response.json() )
       .then( ( dataTable ) => this.assignDataTable(dataTable) )
	}
	assignDataTable( dataTable ) {
	    this.setState({tableMap:dataTable});
	};
	
	//折线图
	lineData(){
		 fetch( this.state.dataSourceLine,{ credentials: "include", method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
            body: "monthId="+this.state.monthId+"&kpiCode="+this.state.kpiCode+"&provId="+this.state.provId
         })
       .then( ( response ) => response.json())
       .then( ( dataLine ) => this.assignDataLine(dataLine))
	}
	assignDataLine( dataLine ) {
			let data = dataLine;
            let titleTemp = data[0][0].item;
        	this.setState({lineData:data[0],lineTitle:titleTemp,lineColorData:data[1]});
       };
	
	//柱状图
	barData(){
		 fetch( this.state.dataSourceBar,{ credentials: "include", method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
            body: "monthId="+this.state.monthId+"&kpiCode="+this.state.kpiCode+"&provId="+this.state.provId
         })
       .then( ( response ) => response.json() )
       .then( ( dataBar ) => this.assignDataBar(dataBar) )
	}	
	assignDataBar( dataBar ) {
			let data = dataBar;
            let titleTemp = data[0][0].item;
        	this.setState({barData:data[0],barTitle:titleTemp,barColorData:data[1]});
       };
       
    //饼图
	pieData(){
		 fetch( this.state.dataSourcePie,{ credentials: "include", method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',},
            body: "monthId="+this.state.monthId+"&kpiCode="+this.state.kpiCode+"&provId="+this.state.provId
         })
       .then( ( response ) => response.json() )
       .then( ( dataPie ) => this.assignDataPie(dataPie) )
	}	
	assignDataPie( dataPie ) {
			let data = dataPie;
            let titleTemp = data[0][0].item;
        	this.setState({pieData:data[0],pieTitle:titleTemp,pieColorData:data[1]});
       };
    
    //计算滚动条距离底部距离
	orderScroll(){
	    let marginBot = 0;
		if (document.documentElement.scrollTop){      //IE  FireFox
            marginBot = document.documentElement.scrollHeight - (document.documentElement.scrollTop+document.body.scrollTop)-document.documentElement.clientHeight;
         	this.scrollBottom(marginBot);
         } else {
            marginBot = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight;   //Chrome
            this.scrollBottom(marginBot);
         }
	}
	
	//滑动鼠标加载更多
	scrollBottom(marginBot) {
         if(marginBot<=5) {
            const { data } = this.state;
				if(showPart < partList.length){
					showPartList.push(partList[showPart]);
					if(showPart == partList.length - 1){
						this.setState( { buttonType: 'none' } );
					}
				}
		       this.setState( { data: showPartList } );
		       showPart++;
		       if(showPart == 2 ){
		       	    this.setState({showLoading:true});
			       	this.lineData();
			       	this.barData();
			       	this.closeTimer = setTimeout( () => {     //等待动画延时一秒关闭
		        	this.setState({showLoading:false});
		        	}, 1*1000 );
			       }
		       if(showPart == 3 ){
		       this.setState({showLoading:true});
		       	this.barData();
		       	this.tableData();
		       	this.closeTimer = setTimeout( () => {
		        	this.setState({showLoading:false});
		        	}, 1*1000 );
			      }
			   if(showPart == 4 ){
			    this.setState({showLoading:true});
		       	this.pieData();
		       	this.closeTimer = setTimeout( () => {
		        	this.setState({showLoading:false});
		        	}, 1*1000 );
			      }
        }
 	};
	
	//点击按钮加载更多
	showMorePart() {
		const { data } = this.state;
		if(showPart < partList.length){
			showPartList.push(partList[showPart]);
			if(showPart == partList.length - 1){     //全部加在让加载更多按钮消失
				this.setState( { buttonType: 'none' } );    
			}
		}
       this.setState( { data: showPartList } );
       showPart++;
       if(showPart == 2 ){
	       	this.lineData();
	       	this.barData();
	       }
       if(showPart == 3 ){
       	this.barData();
       	this.tableData();
	      }
	   if(showPart == 4 ){
       	this.pieData();
	      }
    }

  render() {
        let lineTitle = {
            textStyle:{
                color : '#333' ,
                fontStyle:'normal',
                fontWeight:'bolder' ,
                fontFamily:'sans-serif',
                fontSize : 18
            },
            position:['center','top']
        };
        let barTitle = {
            textStyle:{
                color : '#333' ,
                fontStyle:'normal',
                fontWeight:'bolder' ,
                fontFamily:'sans-serif',
                fontSize : 18
            },
            position:['center','top']
        };
        
        let scale=0.5;                  /* 图表比例( scale=height / width ) */
        let radius=[ '0%','30%'];       /* 图表半径 */
		let center=[ '50%','50%' ];     /* 图表圆心坐标  */
		
		const legend = {                /* 图例相关属性  */
		  textStyle:{
		    color : 'black' ,
		    fontStyle:'normal',
		    fontWeight:'normal',
		    fontFamily:'Times New Roman',
		    fontSize : 10
		  },
		  position:['left','top','vertical']        /* 图例位置    vertical:竖直   horizontal:水平  */
		};
		
		const pieTitle = {                 /* 标题相关属性  */
		  textStyle:{
		    color : 'black' ,
		    fontStyle:'normal',
		    fontWeight:'normal',
		    fontFamily:'Times New Roman',
		    fontSize : 15
		  },
		  position:['center','15%']     
		};
        
    return (
		<div>
        	<h2>&nbsp;&nbsp;&nbsp;流加载示例</h2>
	        <Divider line />
        	<div>
            	<Waterfall
                	items={ this.state.data }
                    renderItem={(item, onMeasured) => {
                    if(item === 'part1')
                    	return  <table cellPadding="10">
                    				<tr>
                    					<td colSpan = "2">
		                        	      <Table dataSource={ this.state.tableMap } multiLine={ true }>
						            	     <Column title={this.state.tableTitle[0]} dataIndex="REGION_DESC" />
						                     <Column title={this.state.tableTitle[1]} dataIndex="KPI_CODE" />
						                     <Column title={this.state.tableTitle[2]} dataIndex="KPI_NAME" />
						                	 <Column title={this.state.tableTitle[3]} dataIndex="KPI_UNIT" />
						                	 <Column title={this.state.tableTitle[4]} dataIndex="KPI_VALUE" />
						                  </Table>
                    					</td>
                    				</tr>
                    				<tr>
                    					<td>
			                				<Line  dataSource={ this.state.lineData } 
								                   extend={ this.state.lineColorData }
								                   size = { {height: '400', width: '700'} }
												   autoScaling ={ false }
												   title ={ lineTitle } />
	                			         </td>
	                			         <td>
			                				<Bar dataSource={ this.state.barData } 
							                	 extend={ this.state.barColorData }
							                	 size = { {height: '400', width: '700'} }
												 autoScaling ={ false }
												 title ={ barTitle } />
	                			         </td>
                    				</tr>
                    	        </table>
                    else if(item === 'part2')
                    	return <table style={{width:'100%'}}>
                		          <tr>
                			         <td>
			                				<Line  dataSource={ this.state.lineData } 
								                   extend={ this.state.lineColorData }
								                   size = { {height: '350', width: '500'} }
												   autoScaling ={ false }
												   title ={ lineTitle } />
                			         </td>
                			         <td>
			                				<Bar dataSource={ this.state.barData } 
							                	 extend={ this.state.barColorData }
							                	 size = { {height: '350', width: '500'} }
												 autoScaling ={ false }
												 title ={ barTitle } />
                			         </td>
                			         <td>
			                				<Bar dataSource={ this.state.barData } 
							                	 extend={ this.state.barColorData }
							                	 size = { {height: '350', width: '500'} }
												 autoScaling ={ false }
												 title ={ barTitle } />
                			         </td>
                		          </tr>
                	           </table>
                    else if(item === 'part3')
                        return <table style={{width:'100%'}}>
                		          <tr>
                			         <td>
				                		  <Bar   dataSource={ this.state.barData } 
							                	 extend={ this.state.barColorData }
							                	 size = { {height: '400', width: '700'} }
												 autoScaling ={ false }
												 title ={ barTitle } />
                			         </td>
                			         <td>
		                        	      <Table dataSource={ this.state.tableMap } multiLine={ true }>
						            	     <Column title={this.state.tableTitle[0]} dataIndex="REGION_DESC" />
						                     <Column title={this.state.tableTitle[1]} dataIndex="KPI_CODE" />
						                     <Column title={this.state.tableTitle[2]} dataIndex="KPI_NAME" />
						                	 <Column title={this.state.tableTitle[3]} dataIndex="KPI_UNIT" />
						                	 <Column title={this.state.tableTitle[4]} dataIndex="KPI_VALUE" />
						                  </Table>
                			         </td>
                		          </tr>
                	           </table>
                    else if(item === 'part4')
                    	return <div> 
	                           	  <Pie  
			                         dataSource={ this.state.pieData } 
				                     extend={ this.state.pieColorData }
				                     autoScaling={ false }      /* 图表宽高是否自适应  */
				                     radius = {radius}
				                     size = { {height: '400', width: '700'} }
				                     center = {center}
				                     title = {pieTitle}
				                     legend = {legend}
			                      />
                               </div>
                 }}/>
	            <div style={{textAlign:'center',display:this.state.buttonType,width:'100%',marginBottom:'10px'}}  >
	            	<Button type="primary"  onClick={ this.showMorePart }>点击加在更多</Button> 
	            </div>
                <div style={{left:'50%',bottom:'0',position:'fixed',width:'100px',height:'100px',maiginBottom:'50px',zIndex:'-100'}}>
            		{this.state.showLoading ? <Loading /> : null } 
                </div>
            </div>
        
        </div>
    );
  }
}

IndexPage1.epmUIPage = page;
export default IndexPage1;
export { IndexPage1 };