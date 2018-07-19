import React, { Component } from 'react';
// import './info.css';
import PageHeader from '../pageHeader.js';
class Detailed extends Component {
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
            <div >
                
               <div className="page">
                    {/* 头部搜索框 */}
                    <PageHeader/>
                    {/* 面包屑导航 */}
                    <div className="breadmenu">
                        <a href="" className="breadmenu-pic"></a>
                        <span>主页</span>
                        <span>订单详细</span>
                    </div>
                    {/* 订单信息 */}
                    <div className="right_bg">
                        <div className="tab_box">
                            <div className="tab_nav">
                            </div>
                            <div className="tab_content">
                                <div className="tab_table">
                                    <p 
                                    className="table_text"
                                    style={{marginLeft:20}}
                                    >基本信息</p>
                                    <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">订单编号</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">发货流水单号</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">用户账号</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">支付方式</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">订单来源</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">订单类型</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>201707196398345</td>
                                        <td>未发货</td>
                                        <td>18000000000</td> 
                                        <td>未支付</td>  
                                        <td>APP订单</td> 
                                        <td>普通订单</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                            <p className="table_text" style={{marginLeft:20}}>发票信息</p>
                            <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">发票类型</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">发票抬头</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">发票内容</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">收票人信息</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>电子普通发票</td>
                                        <td>个人</td>
                                        <td>服饰</td> 
                                        <td>18000000000 | 5698401@qq.com</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="table_text" style={{marginLeft:20}}>收货人信息</p>
                            <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">收货人</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">手机号码</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">邮政编码</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">收货地址</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>大梨</td>
                                        <td>18000000000</td>
                                        <td>518000</td> 
                                        <td>广东省深圳市南山区科兴科学园</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="table_text" style={{marginLeft:20}}>商品信息</p>
                            <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">商品名称</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">价格/货号</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">属性</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">数量</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">库存</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">小计</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>小米 Max 全网通 高配版 3GB内存 64GB</td>
                                        <td>
                                            <span>价格:￥100.00</span>
                                            <span>货号:No86577</span>
                                        </td>
                                        <td>尺寸:X 颜色:黑色</td> 
                                        <td>1</td>  
                                        <td>100</td> 
                                        <td>￥100.00</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                            <p className="table_text" style={{marginLeft:20}}>费用累计</p>
                            <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">商品合计</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">运费</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">优惠券</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">优币抵扣</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>￥200.00</td>
                                        <td>￥0.00</td>
                                        <td>-￥0.00</td> 
                                        <td>-￥0.00</td>  
                                    </tr>
                                </tbody>
                                
                            </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
                        
                        
            </div >
        );
    }
}

export default Detailed;