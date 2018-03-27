import React, { Component } from 'react';
import { Page, Divider,Table, Input, Button, Container, Column } from 'epm-ui';
import { Guide } from '../components';

const page = {
    title: "数据发布与预警的使用说明"
};

const tableMonitorData = [
    {
        "name":"monitor_no",
        "type":"int",
        "length":"6",
        "isNull":"否",
        "description":"监控信息编号"
    },
    {
        "name":"monitor_name",
        "type":"varchar",
        "length":"20",
        "isNull":"否",
        "description":"监控信息名字"
    },
    {
        "name":"monitor_yes_count",
        "type":"int",
        "length":"10",
        "isNull":"否",
        "description":"已完成数量"
    },
    {
        "name":"monitor_no_count",
        "type":"varchar",
        "length":"10",
        "isNull":"否",
        "description":"未完成数量"
    },
    {
        "name":"monitor_date",
        "type":"date",
        "length":"8",
        "isNull":"否",
        "description":"账期"
    }
];


const tableMonitorColumns = [
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

const monitorData = [
    {
        "monitor_no":"1001",
        "monitor_name":"指标监控",
        "monitor_yes_count":"13",
        "monitor_no_count":"12",
        "monitor_date":"20170609"
    }
];


const monitorColumns = [
    {
        "title": "monitor_no",
        "key": "monitor_no"
    },
    {
        "title": "monitor_name",
        "key": "monitor_name"
    },
    {
        "title": "monitor_yes_count",
        "key": "monitor_yes_count"
    },
    {
        "title": "monitor_no_count",
        "key": "monitor_no_count"
    },
    {
        "title": "monitor_date",
        "key": "monitor_date"
    }
];

const tableMonitorInfoData = [
    {
        "name":"monitor_no",
        "type":"int",
        "length":"6",
        "isNull":"否",
        "description":"监控信息编号"
    },
    {
        "name":"monitor_yes_name",
        "type":"varchar",
        "length":"20",
        "isNull":"是",
        "description":"已完成的名字"
    },
    {
        "name":"monitor_no_name",
        "type":"varchar",
        "length":"20",
        "isNull":"是",
        "description":"未完成的名字"
    }
];

const monitorInfoData = [
    {
        "monitor_no":"1001",
        "monitor_yes_name":"已监控",
        "monitor_no_name":"未监控"
    }
];

const monitorInfoColumns = [
    {
        "title": "monitor_no",
        "key": "monitor_no"
    },
    {
        "title": "monitor_yes_name",
        "key": "monitor_yes_name"
    },
    {
        "title": "monitor_no_name",
        "key": "monitor_no_name"
    }
]

const tableMonitorAPIData = [
    {
        "name":"id",
        "type":"int",
        "length":"100",
        "isNull":"否",
        "description":"id"
    },
    {
        "name":"api_id",
        "type":"varchar",
        "length":"255",
        "isNull":"否",
        "description":"编号"
    },
    {
        "name":"api_name",
        "type":"varchar",
        "length":"255",
        "isNull":"否",
        "description":"名称"
    },
    {
        "name":"day_id",
        "type":"date",
        "length":"8",
        "isNull":"否",
        "description":"日期"
    },
    {
        "name":"number_count",
        "type":"int",
        "length":"11",
        "isNull":"是",
        "description":"数量"
    },
    {
        "name":"number_end",
        "type":"int",
        "length":"11",
        "isNull":"是",
        "description":"完成数量"
    },
    {
        "name":"type",
        "type":"varchar",
        "length":"1",
        "isNull":"是",
        "description":"类型"
    },
    {
        "name":"end_time",
        "type":"time",
        "length":"0",
        "isNull":"否",
        "description":"完成时间"
    },
    {
        "name":"estimate_time",
        "type":"time",
        "length":"0",
        "isNull":"否",
        "description":"预计完成时间"
    },
    {
        "name":"remark",
        "type":"varchar",
        "length":"255",
        "isNull":"否",
        "description":"备注"
    },
    {
        "name":"monitor_no",
        "type":"int",
        "length":"6",
        "isNull":"否",
        "description":"监控信息编号"
    }
];

const monitorAPIData = [
    {
        "id":"1",
        "api_id":"2001",
        "api_name":"总部指标",
        "day_id":"20160609",
        "number_count":"60",
        "number_end":"20",
        "type":"已完成",
        "end_time":"11:00:00",
        "estimate_time":"12:00:00",
        "remark":"总部指标-测试数据",
        "monitor_no":"1001"
    }
];

const monitorAPIColumns = [
    {
        "title": "id",
        "key": "id"
    },
    {
        "title": "api_id",
        "key": "api_id"
    },
    {
        "title": "api_name",
        "key": "api_name"
    },
    {
        "title": "day_id",
        "key": "day_id"
    },
    {
        "title": "number_end",
        "key": "number_end"
    },
    {
        "title": "number_count",
        "key": "number_count"
    },
    {
        "title": "type",
        "key": "type"
    },
    {
        "title": "end_time",
        "key": "end_time"
    },
    {
        "title": "estimate_time",
        "key": "estimate_time"
    },
    {
        "title": "remark",
        "key": "remark"
    },
    {
        "title": "monitor_no",
        "key": "monitor_no"
    }
]


class toolClass extends Component {

    render() {
        return (
            <Page>
                <Container type="fluid">
                    <h1>{ page.title }</h1>
                    <Divider />
                    <h4>一、数据发布</h4>
                    <Divider />
                    <h4>1.数据发布说明</h4>
                    <h5>直观地了解信息，以图表的形式展示数据，数据发布包括3部分：指标监控、接口监控与明细</h5>
                    <Divider />
                    <h4>2.步骤</h4>
                    <h5>(1).在账期管理模块修改组件id为'monitor'的信息，组件名称为'监控账期'的数据，修改账期为最大账期</h5>
                    <h5>(2).分别在MS_MONITOR、MS_MONITOR_API、MS_MONITOR_INFO插入数据</h5>
                    <Divider />
                    <h4>3.数据库数据存储字段</h4>
                    <h4>3.1指标监控表：MS_MONITOR</h4>
                    <h5>(1).表结构</h5>
                    <Table dataSource={tableMonitorData} columns={ tableMonitorColumns } />
                    <h5>(2).表数据</h5>
                    <Table dataSource={ monitorData } columns={ monitorColumns } />
                    <Divider />
                    <h4>3.2指标监控信息表：MS_MONITOR_INFO</h4>
                    <h5>(1).表结构</h5>
                    <Table dataSource={tableMonitorInfoData} columns={ tableMonitorColumns } />
                    <h5>(2).表数据</h5>
                    <Table dataSource={ monitorInfoData } columns={ monitorInfoColumns } />
                    <h5>(3).说明</h5>
                    <h5>MS_MONITOR_INFO.monitor_no的值来自于MS_MONITOR.monitor_no</h5>
                    <Divider />
                    <h4>3.3接口明细表：MS_MONITOR_API</h4>
                    <h5>(1).表结构</h5>
                    <Table dataSource={tableMonitorAPIData} columns={ tableMonitorColumns } />
                    <h5>(2).表数据</h5>
                    <Table dataSource={ monitorAPIData } columns={ monitorAPIColumns } />
                    <h5>(3).说明</h5>
                    <h5>MS_MONITOR_API.monitor_no的值来自于MS_MONITOR.monitor_no</h5>
                	<Divider />
                	<h4>3.3注意</h4>
                	<h5>(1).初始页面展示的是当前最大账期的数据，即账期管理组件id为'monitor'，组件名称为'监控账期'的数据</h5>
                    <h5>(2).当MS_MONITOR_INFO数据中没有配MS_MONITOR的相应信息时，环形图图例显示已完成和未完成</h5>
                	<Divider />
                	<h4>4.页面说明</h4>
                    <h5>(1).初始化页面显示的接口监控与明细是第一个环形图的信息</h5>
                    <h5>(2).账期查询后的页面显示的接口监控与明细是第一个环形图的信息</h5>
                    <h5>(2).点击环形图，接口监控与明细的信息会发生相应改变</h5>
                    <Divider />
                    <h4>二、数据预警</h4>
                    <Divider />
                    <h4>1.数据预警说明</h4>
                    <h5>直观地了解信息，以图表的形式展示数据，数据预警包括2部分：数据展示与增加</h5>
                    <Divider />
                    <h4>2使用说明</h4>
                    <h5>(1).在账期管理模块修改组件id为'monitor_business_day'的信息，组件名称为'业务监控(日)'的数据，修改账期为最大账期</h5>
                    <h5>(2).在账期管理模块修改组件id为'monitor_business_month'的信息，组件名称为'业务监控(月)'的数据，修改账期为最大账期</h5>
                    <h5>(3).页面展示时，默认展示日账期，最大账期的信息</h5>
                    <h5>(4).选择账期类型，账期会做相应改变，显示的账期值是账期管理的最大账期值</h5>
                    <h5>(5).页面右上角，有"增加"数据的按钮，数据添加后，左下角会有提示信息，提示只有3秒时间</h5>      
                    <h5>(6).每一个折线图后，都有"修改"和"删除"按钮，数据修改或删除后，左下角会有提示信息，提示只有3秒时间</h5>
                    <h5>(7).数据增加、修改或删除成功后，页面会刷新，若失败，页面不会发生改变</h5>
                    <h5>(8).当前账期没有数据时，折线图中没有任何线条</h5>
                    <h5>(9).关键指标管理中，"指标名称"指折线图名称，和左侧Y轴的数据名称</h5>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;"指标数据sql"指需要做分析的数据</h5>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;"数据字段"指上述sql中哪个字段需要计算环比或同比</h5>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;"账期字段"指上述sql中账期的字段名</h5>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;"单位"指"数据字段"的单位</h5>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;"账期类型"指账期是月账期还是日账期</h5>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;"分析方式"指计算环比还是同比</h5>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;"排序"指第几次出现</h5>
                    <Divider />
                    <h4>2环比与同比计算</h4>
                    <Divider />
                    <h5>2.1环比</h5>
                    <h5>(1).环比=（本期-上期 ）/上期</h5>
                   	<h5> 例如：</h5>
                   	<h5>&nbsp;&nbsp;&nbsp;&nbsp;2016年9月的环比=(2016年9月数据-2016年8月数据)/2015年8月数据</h5>
                   	<h5>&nbsp;&nbsp;&nbsp;&nbsp;2016年12月11号的环比=(2016年12月11号数据-2016年12月10号数据)/2016年12月10号数据</h5>
                   	<h5>2.1同比</h5>
                    <h5>(2).同比=（本期-去年同期 ）/去年同期</h5>
                    <h5>如果求2月29号的同比，同比为0</h5>
					<h5>示例：</h5>
                   	<h5>&nbsp;&nbsp;&nbsp;&nbsp;2016年9月的同比=(2016年9月数据-2015年9月数据)/2016年9月数据</h5>
                   	<h5>&nbsp;&nbsp;&nbsp;&nbsp;2016年12月11号的同比=(2016年12月11号数据-2015年12月11号数据)/2015年12月11号数据</h5>
                   	<h5>&nbsp;&nbsp;&nbsp;&nbsp;2016年2月28号的同比=(2016年2月28号数据-2015年2月28号数据)/2015年2月28号数据</h5>
                   	<h5>&nbsp;&nbsp;&nbsp;&nbsp;2016年2月29号的同比=0</h5>
                   	
                </Container>
            </Page>
        );
    }

}

toolClass.epmUIPage = page;

export default toolClass;
export { toolClass };