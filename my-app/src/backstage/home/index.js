import React, { Component } from 'react';
import './index.css';
import PageHeader from '../pageHeader.js';
import EchartsTest from './echarts.js';
class Index extends Component {
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
					<PageHeader/>
					{/* 面包屑导航 */}
					<div className="breadmenu">
						<a href="" className="breadmenu-pic"></a>
						{/* <i className="iconfont icon-tubiaozhizuomoban"></i> */}
						<span>主页</span>
					</div>
					{/* 主页图标区域 */}
					<div id="page-content">
						<div className="row">
							<div className="record-list">
								<div className="symbol">
									<i className="iconfont icon-yonghu"></i>
								</div>
								<div className="record-text">
									<h3>8666</h3>
									<p>商城用户</p>
								</div>
							</div>
							<div className="record-list">
								<div className="symbol red">
									<i className="iconfont icon-jiaoyijilu"></i>
								</div>
								<div className="record-text">
									<h3>14789</h3>
									<p>分销记录</p>
								</div>
							</div>
							<div className="record-list">
								<div className="symbol yellow">
									<i className="iconfont icon-gouwuche1"></i>
								</div>
								<div className="record-text">
									<h3>323456</h3>
									<p>商城订单</p>
								</div>
							</div>
							<div className="record-list">
								<div className="symbol blue">
									<i className="iconfont icon-fenxiaoshangpinliebiao"></i>
								</div>
								<div className="record-text">
									<h3>17889</h3>
									<p>交易记录</p>
								</div>
							</div>
						</div>
					</div>
					<EchartsTest/>
				</div>
			</div>
		);
	}
}

export default Index;