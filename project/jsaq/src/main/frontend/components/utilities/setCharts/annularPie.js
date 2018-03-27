import { fmoney } from '../formatter/numFormate';

/*
 环形嵌套图，
 title--图的名称
 flag--是否需要图例
 legendList--图例的数据
 innerData--内环图的数据
 outerData--外环图的数据
 unit-- 单位
 */
const AnnularPieOption = (title,flag,legendList,innerData,outerData,unit,onClick) => {
    const option = {};
    const seriesList = [];

    const innerMap = {};
    const outerMap = {};
    const tooltipMap = {};
    const legendMap = {};
    const labelMap = {};
    const normalMap = {};
    const titleMap = {};
    const textStyleMap={};
    const toolboxMap = {};
    const featureMap = {};
    const myDataViewMap = {};

    titleMap.text = title;
    titleMap.x = 'center';
    /*titleMap.x = '50%',
     titleMap.y = '5%',*/
    textStyleMap.fontFamily = 'Microsoft Yahei Light',
        textStyleMap.fontSize = 12,
        textStyleMap.color = '#333333',
        titleMap.textStyle = textStyleMap,
        option.title = titleMap;

    tooltipMap.trigger = 'item';
    /*tooltipMap.formatter = '{a} <br/>{b}: {c} ({d}%)';*/
    tooltipMap.formatter = function( params ){
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
        let laLeft2 = opt.option.series[1].data; //第一列数据
        let laLeft=[];
        for(let i=0;i<laLeft1.length;i++){
            let ss = opt.option.series[0].data[i].name;
            laLeft.push(ss);
        }
        for(let i=0;i<laLeft2.length;i++){
            let ss = opt.option.series[1].data[i].name;
            laLeft.push(ss);
        }
        laLeft = laLeft.join(',');

        let laDatay1 = opt.option.series[0].data; //列数据
        let laDatay2 = opt.option.series[1].data; //列数据
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
        for(let i=0;i<laDatay2.length;i++){
            let ss = opt.option.series[1].data[i].value;
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
    toolboxMap.right = '10';
    option.toolbox = toolboxMap;


    innerMap.name = title;
    innerMap.type = 'pie';
    innerMap.selectedMode = 'single';
    innerMap.radius = [0, '30%'];


    normalMap.position = 'inner';
    labelMap.normal = normalMap;
    innerMap.label = labelMap;
    /*innerMap.labelLine.normal.show = false;*/

    innerMap.data = innerData;
    seriesList.push(innerMap);

    outerMap.name = title;
    outerMap.type = 'pie';
    outerMap.radius = ['40%', '55%'];

    outerMap.data = outerData;

    seriesList.push(outerMap);
    option.series=seriesList;

    return option;
}

export {AnnularPieOption};
export default AnnularPieOption;