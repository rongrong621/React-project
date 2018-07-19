import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter } from 'react-router-dom';
import App from '../App'
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            arr: [
                {
                    k: '产品管理',
                    onOff: false,
                    icon: 'iconfont icon-chanpinguanli',
                    child: [
                        {
                            title: "产品列表",
                            rs:'/index/productList',
                        },
                        
                    ]
                },
                
                {
                    k: '交易管理',
                    onOff: false,
                    icon: 'iconfont icon-jiaoyiguanliicon',
                    child: [
                        
                        {
                            title: "订单管理",
                            rs: '/index/management',
                        },
                        
                        {
                            title: "交易订单图",
                            rs: '/index/map',
                        },
                        
                        
                    ]
                },
                {
                    k: '会员管理',
                    onOff: false,
                    icon: 'iconfont icon-huiyuanguanlipx',
                    child: [
                        {
                            title: "会员列表",
                            rs: '/index/member',

                        },
                       
                       
                    ]
                },
                {
                    k: '消息管理',
                    onOff: false,
                    icon: 'iconfont icon-xiaoxiguanli',
                    child: [
                        {
                            title: "留言列表",
                            rs: '/index/message',
                        }
                       
                    ]
                },
                 
                {
                    k: '管理员管理',
                    onOff: false,
                    icon: 'iconfont icon-dianpuguanlipx',
                    child: [
                        {
                            title: "管理员列表",
                            rs: '/index/administration',
                        },
                        
                    ]
                },
                
                {
                    k: '系统管理',
                    onOff: false,
                    icon: 'iconfont icon-xitong',
                    child: [{
                            title: "系统设置",
                            rs: '/index/system',
                        }

                    ]
                },
             ],
            onF: true
        };
        
        
    }

    componentDidMount=()=>{
        let {location:{pathname}}=this.props;
        let {arr}=this.state;
        let arr2=pathname.split('/index/')
        console.log(arr2)
        let str
        if(arr2[1]){
            let arr3=arr2[1].split('/')
            str=new RegExp(arr3[0]);
        }else{
            str=new RegExp(123)
        }
        arr.forEach((e,i)=>{
            if(e.child){
                if(str.test(e.child[0].rs)){
                    e.onOff=true;
                }
            }
        })
        this.setState({arr})
    }

    none = () => {
        this.refs.a1.className = 'active'
        let { arr } = this.state
        arr.forEach((ev, i) => {

            ev.onOff = false

        })
    }


    click = (e) => {
        let { arr } = this.state  
        arr.forEach((ev,i)=> {
            if(i!==e){
                 ev.onOff = false
                 
            }   
        })  
        arr[e].onOff= !arr[e].onOff 
        this.setState({arr})
    }
    render() {
        let {arr,onF} = this.state
        let { location: { pathname } } = this.props
        let arr2=pathname.split('/index/')
        let str;
        if(arr2[1]){
            onF=false
            let arr3=arr2[1].split('/') 
            str = new RegExp(arr3[0]);

        }
        let a = null
        let c=null
        let num = 0;
        let new2 = []
        let arr4 = []
        arr.forEach((e, i) => {
            if (e.child) {
                arr4 = []
                arr4 = e.child.map(e => {
                    num++
                    return ( 
                    //    二级菜单
                        <li key={+new Date() + num}>
                            <Link to={e.rs}>
                                <i className="ico iconfont icon-jiantouyou"></i>
                                <span className="left_text">{e.title}</span>
                            </Link>
                        </li>           
                    )
                })
                new2.push(arr4)
            }

        })
        let newArr3 = [];
        let newArr = arr.map((e, i) => {
            a = e.onOff ? '' : 'level-menu'
            c = e.onOff ? 'iconfont icon-xiangshangjiantou' : 'iconfont icon-xiangxiajiantou1'
            newArr3 = new2[i]
            return (
               <li key={i}>
                    <a className="item" onClick={this.click.bind(this, i)}>
                        <i className={e.icon}></i>
                        <span className="list-txt">{e.k}</span>
                        <strong className={c}></strong>
                    </a>
               <ul className={a}>
                    {newArr3}
               </ul>
           </li>
            )
        })
        return (
            <div id="navbar">
                <div className="nav" id="side-menu">

                    <div className="nav-header">
                        <div className="portrait">
                            <img src={require('./img/profile_small.jpg')} alt="" />
                        </div>
                        <p className="clear">
                            <span className="administrator">Beaut-zihan</span>
                            <span className="super">超级管理员</span>
                        </p>
                    </div>
                    <ul className="nav-list">
                        <li onClick={this.none} ref='a1' className={onF == true ? 'active' : ''}>
                            <Link to='/index' className="item">
                                <i className="iconfont icon-tubiaozhizuomoban"></i>
                                <span className="list-txt">主页</span>
                            </Link>
                        </li>
                        {newArr}
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(Navigation);