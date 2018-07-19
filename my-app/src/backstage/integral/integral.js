import React, { Component } from 'react';
import PageHeader from '../pageHeader.js';
class Integraal extends Component {
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
                    {/* 头部搜索框*/}
                    <PageHeader/>
                    {/* 面包屑导航*/}
                    <div className="breadmenu">
                        <a href="" className="breadmenu-pic"></a>
                        <span>主页</span>
                        <span>积分管理</span>
                    </div>
                    {/* 产品列表*/}
                    <section className="product-list">
                        <ul className="product-search">
                            <li>
                                <span>会员名称</span>
                                <input type="text" placeholder="输入会员名称·电话.邮箱" />
                            </li>
                            <li>
                                <button>查询</button>
                            </li>
                        </ul>
                        {/* 添加和删除按钮*/}
                        <div className="product-btn">
                            <div className="btn-left">
                                <a 
                                href="#" 
                                className="delete"
                                onClick={this.batchDel}
                                >
                                    <i className="iconfont icon-shanchu"></i>
                                    批量删除
                                </a>
                            </div>
                            <span className="number">共：
                                <b>2334</b>条
                            </span>
                        </div>
                        {/* 表单*/}
                        <div className="table-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="ace" />
                                                <span className="lbl"></span>
                                            </label>
                                        </th>
                                        <th>ID</th>
                                        <th>用户名</th>
                                        <th>积分</th>
                                        <th>浏览(条)</th>
                                        <th>购物(比)</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="ace" />
                                                <span className="lbl"></span>
                                            </label>
                                        </td>
                                        <td>1</td>
                                        <td>张三</td>
                                        <td>60</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>
                                            <a 
                                            title="删除" 
                                            href="javascript:;" 
                                            className="yellow"
                                            onClick={this.delClick}
                                            ><i className="iconfont icon-shanchu1"></i></a>
                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="ace" />
                                                <span className="lbl"></span>
                                            </label>
                                        </td>
                                        <td>1</td>
                                        <td>张三</td>
                                        <td>60</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>
                                        <a 
                                            title="删除" 
                                            href="javascript:;" 
                                            className="yellow"
                                            onClick={this.delClick}
                                            ><i className="iconfont icon-shanchu1"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="ace" />
                                                <span className="lbl"></span>
                                            </label>
                                        </td>
                                        <td>1</td>
                                        <td>张三</td>
                                        <td>60</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>
                                        <a 
                                            title="删除" 
                                            href="javascript:;" 
                                            className="yellow"
                                            onClick={this.delClick}
                                            ><i className="iconfont icon-shanchu1"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="ace" />
                                                <span className="lbl"></span>
                                            </label>
                                        </td>
                                        <td>1</td>
                                        <td>张三</td>
                                        <td>60</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>
                                        <a 
                                            title="删除" 
                                            href="javascript:;" 
                                            className="yellow"
                                            onClick={this.delClick}
                                            ><i className="iconfont icon-shanchu1"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="ace" />
                                                <span className="lbl"></span>
                                            </label>
                                        </td>
                                        <td>1</td>
                                        <td>张三</td>
                                        <td>60</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>
                                        <a 
                                            title="删除" 
                                            href="javascript:;" 
                                            className="yellow"
                                            onClick={this.delClick}
                                            ><i className="iconfont icon-shanchu1"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="ace" />
                                                <span className="lbl"></span>
                                            </label>
                                        </td>
                                        <td>1</td>
                                        <td>张三</td>
                                        <td>60</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>
                                        <a 
                                            title="删除" 
                                            href="javascript:;" 
                                            className="yellow"
                                            onClick={this.delClick}
                                            ><i className="iconfont icon-shanchu1"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="ace" />
                                                <span className="lbl"></span>
                                            </label>
                                        </td>
                                        <td>1</td>
                                        <td>张三</td>
                                        <td>60</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>
                                        <a 
                                            title="删除" 
                                            href="javascript:;" 
                                            className="yellow"
                                            onClick={this.delClick}
                                            ><i className="iconfont icon-shanchu1"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                <input type="checkbox" className="ace" />
                                                <span className="lbl"></span>
                                            </label>
                                        </td>
                                        <td>1</td>
                                        <td>张三</td>
                                        <td>60</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>
                                        <a 
                                            title="删除" 
                                            href="javascript:;" 
                                            className="yellow"
                                            onClick={this.delClick}
                                            ><i className="iconfont icon-shanchu1"></i></a>
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

export default Integraal;