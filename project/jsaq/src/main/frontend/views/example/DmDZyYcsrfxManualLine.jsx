import React, { Component } from 'react';
import { Container, Line ,Page , Row} from 'epm-ui';

 class LineChart extends Component {

  constructor( props ) {
    super( props );

    this.state = {
            monthId: '201702', 
            kpiCode: 'KPI001', 
            
            linedata:'',
            dataSource:`${this.props.site.baseContextPath}/DmDZyYcsrfxManualLine/DmDZyYcsrfxManualLineData`
    };

  
  }
  
  //fetch方法获取数据 
  componentDidMount() {
     fetch(  `${this.props.site.baseContextPath}/DmDZyYcsrfxManualLine/DmDZyYcsrfxManualLineData`,
              { credentials: 'include', method: "POST", body: "monthId="+this.state.monthId+     /*向后台传入参数*/
              "&kpiCode="+this.state.kpiCode})
              .then( ( res ) => res.json() )
              .then( ( data ) => this.setState({linedata : data}));
 }
     /*处理后台获取的折线图数据*/
     assignData( data ) {
        this.setState({LineData:data[0]});    /*从dataSource中取出展示数据 */ 
    };


  render() {
      /*areaStyle属性用于决定折线图是否有阴影*/
      
   return (
      <Page>
      	<Container type="fluid">
            <Row style = {{ marginLeft : ""}}>
                <Line dataSource={this.state.linedata} 
                title="  趋势变化" 
            areaStyle='line'
     
                autoScaling= { false}
                size={ { height: 400, width: 650 } }
                 />
            </Row>
        </Container>
      </Page>
    );
  }

}
 
export {LineChart};
export default LineChart;