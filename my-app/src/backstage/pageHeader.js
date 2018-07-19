import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class PageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    mouseover= () => {
      let close = document.getElementById('close');
      close.style.display='block'
       
    }
    mouseout=()=>{
        let close = document.getElementById('close');
        close.style.display = 'none'
    }
    // 退出
    // leave=()=>{
    //     sessionStorage.clear()
    // }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="page-header-list">
                        {/* <a href="#" className="page-pic">
                            <i className="iconfont icon-mulu"></i>
                        </a> */}
                        <div className="page-news">
                           
                            <Link to="/index/message">
                                <i className="iconfont icon-xiaoxi"></i>
                                <em className="news-num green">8</em>
                            </Link>
                            
                        </div>
                        <div className="tupian" onMouseOver={this.mouseover} onMouseOut={this.mouseout}>
                            <a >
                                <img src={require('./img/profile_small.jpg')} alt="" />
                                Admin
                                <i className="iconfont icon-msnui-login"></i>
                            </a>
                            <div className="dw_box" id="close">
                                <div className="dw_img">
                                    <a className="nav_ico">
                                        <img src={require('./img/profile_small.jpg')} alt="" />
                                    </a >
                                    <p>Admin</p >
                                    <p>尊敬的用户,欢迎您的使用 !</p >
                                </div>
                                <div className="close_box">
                                    <Link to='/' onClick={this.leave}>注销</Link>
                                </div>
                            </div>
                        </div>

                        

                      

                    </div>
                </div>
            </div>
        );
    }
}

export default PageHeader;