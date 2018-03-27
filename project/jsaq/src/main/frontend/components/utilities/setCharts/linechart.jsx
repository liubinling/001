/*
* unit:y轴单位
* idshow1:x轴数据
* resultList_MJson：柱状图数据
* */
const LineChart = (unit, idshow1 ,resultList_MJson) => {
   const  option={};
   const tooltipMap={};
   tooltipMap.trigger='axis';
   option.tooltip=tooltipMap;
   const colorList=['#EC4ED7','#EC4ED7','#4200FF','#4200FF'];
   option.color=colorList;
   const xAxisList=[];
   const ax={};
   ax.type='category';
   ax.data=idshow1;
   xAxisList.push(ax);
   option.xAxis=xAxisList;
   const yAxisList=[];
   const ay={};
   ay.type='value';
   ay.name= unit;
   yAxisList.push(ay);
   option.yAxis=yAxisList;
   option.series=resultList_MJson;
   return option;
  }


export { LineChart };
export default LineChart;