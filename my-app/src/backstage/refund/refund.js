import React, { Component } from 'react';
import PageHeader from '../pageHeader.js';
class Refund extends Component {
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
    //删除按钮
    delClick=()=>{
        let delTan=document.querySelector('.tan_content');
        delTan.style.display='block';
    }
    // 弹窗关闭按钮
    closeClick=()=>{
        let delTan=document.querySelector('.tan_content');
        delTan.style.display='none';
    }
    // 批量删除
    batchDel=()=>{
        let delTan=document.querySelector('.tan_content');
        delTan.style.display='block';
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
                        <span>主页</span>
                        <span>退款管理</span>
                    </div>
                    {/* 退款管理 */}
                    <section className="product-list">
                        <ul className="product-search">
                            <li>
                                <span>产品名称</span>
                                <input type="text" placeholder="输入产品名称" />
                            </li>
                            <li>
                                <span>退款时间</span>
                                <input type="text" className="name-inp" />
                            </li>
                            <li>
                                <button>查询</button>
                            </li>
                        </ul>
                        {/* 已退款  未退款和删除按钮 */}
                        <div className="product-btn">
                            <div className="btn-left">
                                <a href="#" title="已退款订单" className="refund"><i className="iconfont icon-duihao"></i>已退款</a>
                                <a href="#" title="未退款订单" className="add"><i className="iconfont icon-cuohao"></i>未退款</a>
                                <a 
                                href="#" 
                                className="delete"
                                onClick={this.batchDel}
                                ><i className="iconfont icon-shanchu"></i>批量删除</a>
                            </div>
                            <span className="number">共：<b>2334</b>笔</span>
                        </div>
                        {/* 表单 */}
                        <div className="table-list">
                            <table >
                                <thead>
                                    <tr>
                                        <th><label><input type="checkbox" className="ace" /><span className="lbl"></span></label></th>
                                        <th>订单编号</th>
                                        <th>产品名称</th>
                                        <th>交易金额</th>
                                        <th>交易时间</th>
                                        <th>退款金额</th>
                                        <th>退款数量</th>
                                        <th>状态</th>
                                        <th>说明</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td ><label><input type="checkbox" className="ace" /><span className="lbl"></span></label></td>
                                        <td >20160705445622</td>
                                        <td >华圣 高原红富士苹果 6枚 1.2KG 自营水果 </td>
                                        <td>120</td>
                                        <td>2016-7-5</td>
                                        <td>60</td>
                                        <td>1</td>
                                        <td>待退款</td>
                                        <td>重复购买商品需退款一件</td>
                                        <td>
                                            <a href="javascript:;">退款</a>
                                            <a href="javascript:;" className="blue">详细</a>
                                            <a 
                                                href="javascript:;" 
                                                className="yellow"
                                                onClick={this.delClick}
                                            >删除
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td ><label><input type="checkbox" className="ace" /><span className="lbl"></span></label></td>
                                        <td >20160705445622</td>
                                        <td >华圣 高原红富士苹果 6枚 1.2KG 自营水果 </td>
                                        <td>120</td>
                                        <td>2016-7-5</td>
                                        <td>60</td>
                                        <td>1</td>
                                        <td>待退款</td>
                                        <td>重复购买商品需退款一件</td>
                                        <td>
                                            <a href="javascript:;">退款</a>
                                            <a href="javascript:;" className="blue">详细</a>
                                            <a 
                                                href="javascript:;" 
                                                className="yellow"
                                                onClick={this.delClick}
                                            >删除
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td ><label><input type="checkbox" className="ace" /><span className="lbl"></span></label></td>
                                        <td >20160705445622</td>
                                        <td >华圣 高原红富士苹果 6枚 1.2KG 自营水果 </td>
                                        <td>120</td>
                                        <td>2016-7-5</td>
                                        <td>60</td>
                                        <td>1</td>
                                        <td>待退款</td>
                                        <td>重复购买商品需退款一件</td>
                                        <td>
                                            <a href="javascript:;">退款</a>
                                            <a href="javascript:;" className="blue">详细</a>
                                            <a 
                                                href="javascript:;" 
                                                className="yellow"
                                                onClick={this.delClick}
                                            >删除
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td ><label><input type="checkbox" className="ace" /><span className="lbl"></span></label></td>
                                        <td >20160705445622</td>
                                        <td >华圣 高原红富士苹果 6枚 1.2KG 自营水果 </td>
                                        <td>120</td>
                                        <td>2016-7-5</td>
                                        <td>60</td>
                                        <td>1</td>
                                        <td>待退款</td>
                                        <td>重复购买商品需退款一件</td>
                                        <td>
                                            <a href="javascript:;">退款</a>
                                            <a href="javascript:;" className="blue">详细</a>
                                            <a 
                                                href="javascript:;" 
                                                className="yellow"
                                                onClick={this.delClick}
                                            >删除
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td ><label><input type="checkbox" className="ace" /><span className="lbl"></span></label></td>
                                        <td >20160705445622</td>
                                        <td >华圣 高原红富士苹果 6枚 1.2KG 自营水果 </td>
                                        <td>120</td>
                                        <td>2016-7-5</td>
                                        <td>60</td>
                                        <td>1</td>
                                        <td>待退款</td>
                                        <td>重复购买商品需退款一件</td>
                                        <td>
                                            <a href="javascript:;">退款</a>
                                            <a href="javascript:;" className="blue">详细</a>
                                            <a 
                                                href="javascript:;" 
                                                className="yellow"
                                                onClick={this.delClick}
                                            >删除
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td ><label><input type="checkbox" className="ace" /><span className="lbl"></span></label></td>
                                        <td >20160705445622</td>
                                        <td >华圣 高原红富士苹果 6枚 1.2KG 自营水果 </td>
                                        <td>120</td>
                                        <td>2016-7-5</td>
                                        <td>60</td>
                                        <td>1</td>
                                        <td>待退款</td>
                                        <td>重复购买商品需退款一件</td>
                                        <td>
                                            <a href="javascript:;">退款</a>
                                            <a href="javascript:;" className="blue">详细</a>
                                            <a 
                                                href="javascript:;" 
                                                className="yellow"
                                                onClick={this.delClick}
                                            >删除
                                            </a>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        {/* 删除弹框 */}
                        <div className="tan_content">
                            <div className="bg"></div>
                            <div className="tan_box delete_box">
                                <div className="tan_title clear">
                                    <span>删除</span>
                                    <i 
                                        className="iconfont icon-cuohao"
                                        onClick={this.closeClick}
                                    ></i>
                                </div>
                                <div className="text_box">
                                    <i className="iconfont icon-queding"></i>
                                    <span>确定删除此项？</span>
                                </div>
                                <div className="input_content">
                                    <div className="btn_sure btn_two">
                                        <a href="javascript:;" className="sure">确定</a>
                                        <a href="javascript:;" className="replay">取消</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Refund;