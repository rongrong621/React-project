import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            uVal:'',
            pVal:''
         };
    }
    //输入用户名
    changeUser = (ev) => {
        this.setState({uVal:ev.target.value});
    }
    //输入密码
    changePass = (ev) => {
        this.setState({pVal:ev.target.value});
    }
    //登录
    login = () => {
        //http://127.0.0.1:88/api/user/login
        let {pVal,uVal} = this.state;
        let {url:{history}} = this.props;
        if(pVal && uVal){
            
            fetch('http://127.0.0.1:88/api/user/login', {
                method:"post",
                body :`username=${uVal}&password=${pVal}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((e)=>e.json())
            .then(data => {
                console.log(data);
                if(data.code === 0){
                    this.setState(()=>{
                        setTimeout(()=>{
                            history.push('/index');
                        },2000);
                    });

                sessionStorage.setItem('key',JSON.stringify({uVal,pVal}))
                }else if(data.code === -3){
                    this.setState({pVal:'',uVal:''})
                }
            })

        }else{
            alert('请输入内容');
        }
    }
    render() {
        let {uVal,pVal}=this.state;
        let s=sessionStorage.getItem('key');
         let a = JSON.parse(s).pVal
         return (
            <div className="login">
                
                <div className="bj">

                </div>
                <div className="login-content">
                    <h3 className="header">
                        <img src={require('../img/profile_small.jpg')} alt="" />
                        <p>用户名:mary 密码:{a}</p>
                    </h3>
                    <ul className="login-box">
                        <li>
                           <i className="iconfont icon-zhucedengluyonghuming"></i>
                           <input 
                           type="text" 
                           placeholder="用户名"
                            value={uVal}
                            onChange={this.changeUser}
                           />
                        </li>
                        <li>
                           <i className="iconfont icon-icon-test"></i>
                           <input 
                            type="text" 
                            placeholder="密码"
                            value={pVal}
                            onChange={this.changePass}
                           />
                        </li>
                        <li className="dl">
                            <a 
                            className="btn"
                            onClick={this.login}

                            >登录</a>
                        </li>
                    </ul>
                </div>
                

            </div>
        );
    }
}

export default Login ;