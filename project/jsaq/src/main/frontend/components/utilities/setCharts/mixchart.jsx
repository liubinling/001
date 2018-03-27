/*
* kpiDesc：柱状图名称
* lineDesc：折线图名称
* unit:y1轴单位
* unit2:y2轴单位
* idshow1:x轴数据
* resultList_MJson：柱状图数据
* resultList_MJson1：折线图数据
* */
const MixChart = (kpiDesc,lineDesc,unit,unit2, idshow1 ,resultList_MJson,resultList_MJson1) => {
   const  option={};
   const tooltipMap={};
   tooltipMap.trigger='axis';
   option.tooltip=tooltipMap;
   const colorList=['#F2895B','#A9E1E1'];
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
   ay.min=0;
   ay.splitLine=false;
   const ay1={};
   ay1.type= 'value';
   ay1.name= unit2;
   ay1.min= 0;
   ay1.max= 100;
   yAxisList.push(ay);
   yAxisList.push(ay1);
   option.yAxis=yAxisList;
   const seriesList=[];
   const da={};
   da.name=kpiDesc;
   da.type='bar';
   da.barWidth=40;
   da.data=resultList_MJson;
   const da1={};
   da1.type= 'line';
   da1.name= lineDesc;
   da1.yAxisIndex= 1;
   da1.data= resultList_MJson1;
   seriesList.push(da);
   seriesList.push(da1);
   option.series=seriesList;
   return option;
  }


export { MixChart };
export default MixChart;