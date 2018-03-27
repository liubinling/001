import React, { Component } from 'react';
import { Bar, Page} from 'epm-ui';

const page = {
    title: "柱图"
};
class BarChart extends Component {

	constructor( props ) {
	
	    super(props);
	    
	    this.state = {
	        monthId: '201702',   
	        kpiCode:'KPI001',      
	        provId:'017',
	        //获取柱图数据的url
	        dataSource:`${this.props.site.baseContextPath}/DmDZyYcsrfxManualBar/DmDZyYcsrfxManualBarData`,
	        //柱图标题,声明变量title并赋初值
			title:'移动业务发展用户'
		}

		this.assignData = this.assignData.bind( this );
	}
		//加载页面的时候执行此方法获取柱图数据
		componentDidMount() {
	      fetch( this.state.dataSource, { credentials: 'include',method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
			body: "monthId="+this.state.monthId+"&kpiCode="+this.state.kpiCode+"&provId="+this.state.provId}  )     
			.then( ( response ) => response.json() )
			.then( ( data ) => this.assignData(data));
	   }
  		//获取的结果集data赋值给barData，同时从数据中取到item赋值给title；获取数据中data[1]赋值给barColorData
  		assignData( data ) {
            let titleTemp = data[0][0].item;
        	this.setState({barData:data[0],title:titleTemp,barColorData:data[1]});
       };
  
    render() {

		/*设置柱状图标题*/
        let title = {
            text:this.state.title,
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
                <Bar dataSource={ this.state.barData } 
                	 extend={ this.state.barColorData }
                	 size = { {height: '400', width: '650'} }
					 autoScaling ={ false }
					 title ={ title }
					 legend = { legend }
				/>
            </Page>
        );
     }

  }
BarChart.epmUIPage = page;
export {BarChart};
export default BarChart;
	
	
