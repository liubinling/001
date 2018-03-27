import React , { Component } from 'react';
import { Line , Bar } from 'epm-ui';

const clone = ( obj ) => {
  let o = null;

  if ( typeof obj == 'object' ) {
    if ( obj === null ) {
      o = null;
    } else if ( obj instanceof Array ) {
      o = [];
      for ( let i = 0 , len = obj.length ; i < len ; i ++ ) {
        o.push ( clone ( obj[ i ] ) );
      }
    } else {
      o = {};
      for ( const j in obj ) {
        o[ j ] = clone ( obj[ j ] );
      }
    }
  } else {
    o = obj;
  }

  return o;
};

//TODO: 主机是否会有多个

class DynamicCharts extends Component {

  constructor ( props ) {
    super ( props );

    this.state = {
      timeRate : this.props.timeRate ,
      lineData : [ {
        data : []
      } ] ,
      hostNet : [
        {
          item : '发送带宽' ,
          data : []
        } ,
        {
          item : '接收带宽' ,
          data : []
        } ,
      ] ,
      hostProcess :[
        {
          item : '发送带宽' ,
          data : []
        } ,
        {
          item : '接收带宽' ,
          data : []
        } ,
      ] ,
      lineValue : "" ,
      lineMax : 100 ,
      netMax : 131072 ,
      rxValue : '' ,
      txValue : ''
    };

    this.gethostCommonLineData = this.gethostCommonLineData.bind ( this );
    this.fetchChartsValue = this.fetchChartsValue.bind ( this );
    this.createDynamicCharts = this.createDynamicCharts.bind ( this );
    this.gethostCommonLineData = this.gethostCommonLineData.bind ( this );

  }


  componentDidMount () {
    const chartsData = [];
    const RxCharts = [];
    const TxCharts = [];
    this.timeInterval = window.setInterval ( () => {
      switch ( this.props.chartsType ) {
        case "hostCommonLine" :
          this.fetchChartsValue ();
          this.gethostCommonLineData ( chartsData );
          break;
        case "hostNet" :
          this.fetchChartsValue ();
          this.getHostNetChartsData ( RxCharts , TxCharts );
          break;
      }
    } , this.props.timeRate );

  }

  componentWillUnmount () {
    window.clearInterval ( this.timeInterval );
  }

  componentWillReceiveProps ( nextProps ) {
    if ( nextProps.timeRate !== this.props.timeRate | nextProps.fetch !== this.props.timeRate ) {
      window.clearInterval ( this.timeInterval );
      const chartsData = [];
      const RxCharts = [];
      const TxCharts = [];
      this.timeInterval = window.setInterval ( () => {
        switch ( this.props.chartsType ) {
          case "hostCommonLine" :
            this.fetchChartsValue ();
            this.gethostCommonLineData ( chartsData );
            break;
          case "hostNet" :
            this.fetchChartsValue ();
            this.getHostNetChartsData ( RxCharts , TxCharts );
            break;
        }
      } , this.props.timeRate );
    }
  }

  fetchChartsValue () {

    const url = this.props.fetch;
    fetch ( url , {
      method : 'GET' ,
    } )
      .then ( ( response ) => {
        return response.json ();
      } )
      .then ( ( responseJson ) => {
        if ( responseJson.success ) {
          if ( this.props.chartsType === "hostNet" ) {
            this.setState ( {
              rxValue : responseJson.result !== null ? responseJson.result.Rx : "" ,
              txValue : responseJson.result !== null ? responseJson.result.Tx : "" ,
              netMax : responseJson.result !== null ? responseJson.result.max : 0 ,
            } )
          } else {
            this.setState ( {
              lineValue : responseJson.result !== null ? responseJson.result.used : "" ,
              lineMax : responseJson.result !== null ? responseJson.result.max : 0 ,
            } )
          }
        }
      } )
      .catch ( ( err ) => console.error ( err ) );
  }


  gethostCommonLineData ( chartsData ) {

    let d = new Date ();
    const TimeLine = `${d.getHours ()}:${d.getMinutes ()}:${d.getSeconds ()}`;
    const chartsValue = this.state.lineValue;
    let charts = {};
    charts.key = TimeLine;
    charts.value = chartsValue;
    if ( chartsData.length >= 10 ) {
      chartsData.splice ( 0 , 1 )
    }
    chartsData.push ( charts );
    this.state.lineData[ 0 ].data = chartsData;
    this.setState ( { lineData : this.state.lineData } );
  }

  getHostNetChartsData ( RxChartsArr , TxChartsArr ) {
    let d = new Date ();
    const TimeLine = `${d.getHours ()}:${d.getMinutes ()}:${d.getSeconds ()}`;
    const RxchartsValue = this.state.rxValue;
    const TxchartsValue = this.state.txValue;
    let rxCharts = {};
    rxCharts.key = TimeLine;
    rxCharts.value = RxchartsValue;
    let txCharts = {};
    txCharts.key = TimeLine;
    txCharts.value = TxchartsValue;
    if ( RxChartsArr.length >= 10 ) {
      RxChartsArr.splice ( 0 , 1 );
      TxChartsArr.splice ( 0 , 1 )
    }
    RxChartsArr.push ( rxCharts );
    TxChartsArr.push ( txCharts );
    this.state.hostNet[ 0 ].data = TxChartsArr;
    this.state.hostNet[ 1 ].data = RxChartsArr;
    console.log ( this.state.hostNet );
    this.setState ( { hostNet : this.state.hostNet } );
  }


  createDynamicCharts () {

    const { lineData , hostNet , rxValue , txValue , lineValue , lineMax } = this.state;
    const { title , yAxisName , area , chartsType } = this.props;

    if ( chartsType === "hostCommonLine" ) {
      const axis = {
        x : {
          name : "单位：时间" ,
          axisLabel : {
            rotate : 285
          }
        } ,
        y : {
          name : `单位：${yAxisName}`
        }

      };

      const markLine = [ {
        data : [ {
          name : '预警线' ,
          yAxis : lineMax ,
          lineStyle : {
            normal : {
              color : 'red' ,
              type : 'solid'
            }
          }
        } ] ,
        label : {
          normal : {
            position : 'middle' ,
            formatter : '预警线'
          }
        } ,
        symbolSize : 0
      } ];

      return (
        <Line
          dataSource={ lineData }
          key={ title }
          title={ `${ title }: ${ lineValue  } ${ yAxisName }` }
          axis={ axis }
          markLine={ markLine }
          areaStyle={ area }
        />
      )
    } else if ( chartsType === "hostNet" ) {
      const axis = {
        x : {
          name : "单位：时间" ,
          axisLabel : {
            rotate : 285
          }
        } ,
        y : {
          name : `单位：${yAxisName}`
        }

      };

      const markLine = [ {
        data : [ {
          name : '预警线' ,
          yAxis : this.state.netMax ,
          lineStyle : {
            normal : {
              color : 'red' ,
              type : 'solid'
            }
          }
        } ] ,
        label : {
          normal : {
            position : 'middle' ,
            formatter : '预警线'
          }
        } ,
        symbolSize : 0
      } ];

      const legend = {
        position : [ 'right' , 'top' , 'horizontal' ]
      };

      const extend = [
        {
          item : '发送带宽' ,
          data : [
            {
              color : '#5EB4FF'
            }
          ]
        } ,
        {
          item : '接收带宽' ,
          data : [
            {
              color : '#1589ee'
            }
          ]
        }
      ];

      return (
        <Line
          dataSource={ hostNet }
          key={ title }
          title={ `${ title }  发送带宽：${ txValue  } ${ yAxisName }  接收带宽：${ rxValue  } ${ yAxisName } `}
          axis={ axis }
          markLine={ markLine }
          areaStyle={ area }
          legend={ legend }
          extend={ extend }
        />
      );
    }else if(  chartsType === "hostProcess"){
      const axis = {
        x : {
          name : "单位：时间" ,
          axisLabel : {
            rotate : 285
          }
        } ,
        y : {
          name : `单位：${yAxisName}`
        }

      };

      const markLine = [ {
        data : [ {
          name : '预警线' ,
          yAxis : this.state.netMax ,
          lineStyle : {
            normal : {
              color : 'red' ,
              type : 'solid'
            }
          }
        } ] ,
        label : {
          normal : {
            position : 'middle' ,
            formatter : '预警线'
          }
        } ,
        symbolSize : 0
      } ];

      const legend = {
        position : [ 'right' , 'top' , 'horizontal' ]
      };

      const extend = [
        {
          item : '发送带宽' ,
          data : [
            {
              color : '#5EB4FF'
            }
          ]
        } ,
        {
          item : '接收带宽' ,
          data : [
            {
              color : '#1589ee'
            }
          ]
        }
      ];

      return (
        <Bar
          dataSource={ hostNet }
          key={ title }
          title={ `${ title }  发送带宽：${ txValue  } ${ yAxisName }  接收带宽：${ rxValue  } ${ yAxisName } `}
          axis={ axis }
          markLine={ markLine }
          areaStyle={ area }
          legend={ legend }
          extend={ extend }
        />
      );
    }

  }


  render () {


    return (
      <div>
        { this.createDynamicCharts ()}
      </div>
    )
      ;
  }
}


export {
  DynamicCharts
}
  ;
export default DynamicCharts;