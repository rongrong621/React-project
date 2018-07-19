import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import PageHeader from '../pageHeader.js';
import './system.css';
class System extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            password:'',
            newPassword:'',
            surePassword:'',
            s:sessionStorage.getItem('key')
         };
    }
    // 登录用
    componentWillMount(){
		let {url:{history}} = this.props;
		if(!sessionStorage.getItem('key')){
			history.push('/');
		}
    }
    handleChange(event) {
        let name;
        name = event.target.name;
    }
    sure = () => {
        let {password,s} = this.state
        let {url:{history}} = this.props;
        let a = JSON.parse(s)
        console.log(a.pVal)
        let that = this
       if (!this.refs.password.value || !this.refs.newPassword.value || !this.refs.surePassword.value) {
           alert('请输入内容')
            return
        }
        setTimeout(function () {
            fetch('http://127.0.0.1:88/api/user/findpassword', {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    body: new URLSearchParams({
                        password: that.refs.password.value,
                    }).toString()
                }).then(e => e.json())
                .then(e => {
                    console.log(e);
                    that.setState({password:e})
                })
               
        }, 50)
        setTimeout(function(){
            let { password }=that.state;
            console.log(password)
            if(password[0]){
                if (that.refs.newPassword.value == that.refs.surePassword.value){
                    password[0].password = that.refs.surePassword.value
                    // console.log(password[0].password)
                    let p=password[0]
                    fetch('http://127.0.0.1:88/api/user/update',{
                       headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "post",
                        body: new URLSearchParams({
                            ...p
                        }).toString()
                    }).then(e=>e.json())
                      .then(e=>{
                          console.log(p)
                      })
                    alert('更新成功')
                    sessionStorage.setItem('key',JSON.stringify({uVal:123,pVal:that.refs.surePassword.value}))
                    that.refs.password.value=that.refs.newPassword.value =that.refs.surePassword.value=''  
               history.push('/');
                }else{
                    alert('两次密码不一致，请重新输入')

                }
            }else{
                alert('旧密码错误')
            }

        },260)
       
    }

    cancel=()=>{
        this.refs.newPassword.value = this.refs.surePassword.value=this.refs.password.value=''
    }
    render() {
        let {s,password}=this.state;
        // console.log(s, password)
        let a=JSON.parse(s)
        // console.log(a.uVal)
        return (
            <div>
                {/*左侧导航菜单*/}
                <div className="page">
                    {/* 头部搜索框*/}
                    <PageHeader/>
                    {/* 面包屑导航*/}
                    <div className="breadmenu">
                        <a href="" className="breadmenu-pic"></a>
                        <span>主页  ></span>
                        <span>系统设置</span>
                    </div>
                    <div className="right_bg">
                        <div className="content_box">
                            <h3 className="search">个人配置</h3>
                        </div>
                        <div>
                            <div className="tab_nav">
                            </div>
                            <div className="tab_content">
                                <div className="tab_table">
                                    <div className="sz_img">
                                        <img src={require("../img/profile_small.jpg")} alt=""/>
                                    </div>
                                    <div className="sz_info">
                                        <span><i>*</i>用 户 名 :</span>
                                        <input 
                                        type="text" 
                                        // placeholder="请输入用户名"
                                        onChange={this.nameChange}
                                        value={a.uVal}
                                        disabled
                                        />
                                    </div>
                                    <div className="sz_info">
                                        <span><i>*</i>原 密 码   :</span>
                                        <input 
                                        type="text" 
                                        placeholder="请输入原来的密码"
                                        ref='password'
                                        onChange={this.handleChange.bind(this)}
                                        name="password"
                                        />
                                    </div>
                                    <div className="sz_info">
                                        <span><i>*</i>新 密 码   :</span>
                                        <input 
                                        type="text" 
                                        placeholder="请输入更改后的密码"
                                        ref='newPassword'
                                        onChange={this.handleChange.bind(this)}
                                        name="password"
                                        />
                                    </div>
                                    <div className="sz_info">
                                        <span><i>*</i>确认密码:</span>
                                        <input 
                                        type="text" 
                                        placeholder="确认密码"
                                        ref='surePassword'
                                        onChange={this.handleChange.bind(this)}
                                        name="password"
                                        />
                                    </div>  
                                    <div className="sz_info">
                                        <a 
                                        to="/"
                                        className="bc"
                                        onClick={this.sure.bind(this)}
                                        >确定</a>
                                        <a 
                                        className="qx"
                                       onClick={this.cancel.bind(this)}
                                        >取消</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default System;