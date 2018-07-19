import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
           
            tooltip : {
                trigger: 'axis'
            },
            color: 
            [ 
            "#ffb980",
            "#b6a2de",
            "#5ab1ef",
            
            
            
            ],
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            legend: {
                data:['待付款','已付款','待发货']
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    min:0,
                    max:1000,
                    name : '月购买订单交易记录',
                    axisLabel : {
                        formatter: '{value} '
                    }
                },
                {
                    type : 'value',
                    name : '',
                    axisLabel : {
                        formatter: ' '
                    }
                }
            ],
            series : [
    
                {
                    name:'待付款',
                    type:'bar',
                    data:[160, 260, 503, 300, 108, 500, 200, 100, 96, 78,301,156]
                },
                {
                    name:'已付款',
                    type:'bar',
                    data:[280, 660, 860, 556, 380, 801, 401, 180, 496, 500, 130, 700]
                },
                {
                    name:'待发货',
                    type:'bar',
                    // yAxisIndex: 1,
                    data:[80, 36, 76, 62, 36, 20, 32, 43, 34, 28, 52, 61]
                }
            ]
        });
        
    }
    render() {
        return (
            <div id="main" style={{  height: '400px' }}></div>
        );
    }
}

export default EchartsTest;