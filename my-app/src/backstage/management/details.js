import React, { Component } from 'react';
import * as actionCreators from '../action/action.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './info.css';
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    // 返回按钮
    front = () => {
         let tabBox = document.getElementById('tabBox');
         tabBox.style.display = 'none'
    }


    render() {
      let {e}=this.props;
      console.log(e)
        return (
           
                        
                        <div className="tab_box" id="tabBox">
                            <div className="tab_nav">
                               <h3 >订单详情</h3>
                               <a 
                               onClick={this.front}
                               >返回</a>
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
                                        <td>{e.orderNumber}</td>
                                        <td>{e.status}</td>
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
                                        <td>{e.type}</td> 
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
                                            <div className="th-inner ">价格</div>
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
                                        <td>{e.productName}</td>
                                        <td>
                                            <span>{e.money}</span>
                                        </td>
                                        <td>{e.type}</td> 
                                        <td>{e.number1}</td>  
                                        <td>{e.number1}</td> 
                                        <td>{e.number1*e.money}</td>
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
                                        <td>{e.number1*e.money}</td>
                                        <td>￥0.00</td>
                                        <td>-￥0.00</td> 
                                        <td>-￥0.00</td>  
                                    </tr>
                                </tbody>
                                
                            </table>
                                </div>
                            </div>
                        </div>
                    
        );
    }
}

export default connect((state) => {
    return { data: state.reducer1.content };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Details);