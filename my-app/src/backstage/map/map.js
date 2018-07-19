import React, { Component } from 'react';
// import './map.css';

import PageHeader from '../pageHeader.js';
import EchartsMap from './echarts.js';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount(){
		let {url:{history}} = this.props;
		if(!sessionStorage.getItem('key')){
			history.push('/');
		}
	}
    render() {
        return (
            <div>
                <div className="page">
                    {/* 头部搜索框 */}
                    <PageHeader/>
                    {/* 面包屑导航 */}
                    <div className="breadmenu">
                        <a href="" className="breadmenu-pic"></a>
                        <span>主页  ></span>
                        <span>交易订单(图)</span>
                    </div>
                    {/* 地图 */}
                    <EchartsMap/>








                </div>
            </div >
        );
    }
}

export default Map;