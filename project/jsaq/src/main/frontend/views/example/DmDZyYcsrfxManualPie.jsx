import React, { Component } from 'react';
import { Pie ,Page} from 'epm-ui';


class PieChart extends Component {

	constructor( props ) {
	
	    super(props);
	    
	    this.state = {
	        custType: '01',         /* 定义参数  */
	        dataSource:`${this.props.site.baseContextPath}/DmDZyYcsrfxManualPie/DmDZyYcsrfxManualPieData`};  /* 数据dataSource接口  对应Controller */
		}
		
		/* fetch方法获取数据 */
		componentDidMount() {
			fetch( this.state.dataSource,{ credentials: 'include',method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: "custType="+this.state.custType}  )     /* 向后台传递参数  */
			.then( ( response ) => response.json() )
			.then( ( data ) => this.assignData(data));  //调用assignData()方法
	   }
	   
  		//处理后台获取的饼图数据(data)
  		assignData( data ) {
        	this.setState({pieData:data[0],pieColorData:data[1]});   /* 从dataSource中取出展示数据与颜色数据  */
       };
  
    render() {
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
		
		const title = {                 /* 标题相关属性  */
		  text:'饼图组件测试',
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
            <Page>
                <Pie  
                     dataSource={ this.state.pieData } 
                     extend={ this.state.pieColorData }
                     autoScaling={ true }      /* 图表宽高是否自适应  */
                     radius = {radius}
                     center = {center}
                     title = {title}
                     legend = {legend}
                     
                />
            </Page>
        );
     }

  }

export {PieChart};
export default PieChart;
	
	
