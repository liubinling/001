import React, { Component } from 'react';
import { fmoney } from '../formatter/numFormate';



/*
 环形嵌套图，
 title--图的名称
 flag--是否需要图例
 legendList--图例的数据
 pieData-- 饼状图的数据
 unit-- 单位
 */
const PieOption = (title,flag,legendList,pieData,unit,onClick) => {

    const option = {};
    const titleMap = {};
    const textStyleMap={};

    const seriesList = [];
    const pieMap = {};
    const tooltipMap = {};
    const legendMap = {};
    const toolboxMap = {};
    const featureMap = {};
    const myDataViewMap = {};


    titleMap.text = title;
    titleMap.x = 'center';
    /*titleMap.x = '50%',
     titleMap.y = '5%',*/
    textStyleMap.fontFamily = 'Microsoft Yahei Light';
    textStyleMap.fontSize = 12;
    textStyleMap.color = '#333333';
    titleMap.textStyle = textStyleMap;
    option.title = titleMap;

    tooltipMap.trigger = 'item';
    /*tooltipMap.formatter = '{a} <br/>{b}: {c} ({d}%)';*/
    tooltipMap.formatter=function( params ){
        let res = '';
        if(params.percent == 0){
            res = params.seriesName+'<br/>';
            res += params.name+':';
            res += '-';
            res += '<br/>';
            res += '占比:';
            res += '-';
        } else {
            res = params.seriesName+'<br/>';
            res += params.name+'('+unit+') : ';
            res += fmoney(params.value,2,unit);
            res += '<br/>';
            res += '占比(%) : ';
            res += params.percent;
        }
        return res;
    };
    option.tooltip = tooltipMap;

    if(flag == true){
        legendMap.orient = 'vertical';
        legendMap.x = 'left';
        legendMap.data = legendList;
        option.legend = legendMap;
    }

    myDataViewMap.show = true;
    myDataViewMap.title = '数据视图';
    myDataViewMap.icon =  'image://http://localhost:3000/bower_components/demo/image/dataview.png';
    myDataViewMap.onclick = function(opt) {
        let laTitle = opt.option.series[0].name+',用户数（户）';
        let laLeft1 = opt.option.series[0].data; //第一列数据
        let laLeft=[];
        for(let i=0;i<laLeft1.length;i++){
            let ss = opt.option.series[0].data[i].name;
            laLeft.push(ss);
        }
        laLeft = laLeft.join(',');

        let laDatay1 = opt.option.series[0].data; //列数据
        let laDatay = [];
        for(let i=0;i<laDatay1.length;i++){
            let ss = opt.option.series[0].data[i].value;
            /*var cash = fmoney(ss,2,'户');
            if(cash.indexOf(',')>=0){
                cash=cash.replace(/,/g, "_");
            }
            laDatay.push(cash);*/
            laDatay.push(ss);
        }
        laDatay = laDatay.join(',');
        let laDatax = ''; //行数据
        let visible = true;
        let pieTableList =[laTitle, laLeft, laDatay, laDatax,visible];
        onClick(pieTableList);
    };


    featureMap.myDataView =myDataViewMap;
    toolboxMap.feature = featureMap;
    /*toolboxMap.top = 16;*/
    toolboxMap.right = '11';
    option.toolbox = toolboxMap;


    pieMap.name = title;
    pieMap.type = 'pie';
    pieMap.radius = '55%';/*
     pieMap.center = ['50%', '60%'];*/

    pieMap.data = pieData;
    seriesList.push(pieMap);

    option.series=seriesList;

    return option;
}


export {PieOption};
export default PieOption;


PieOption()