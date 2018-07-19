import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Index from './backstage/home';//首页
import ProductList from './backstage/productList/productList.js';//产品管理
import Member from './backstage/member/member.js';//会员列表
// import Integral from './backstage/integral/integral.js';//积分管理
import Management from './backstage/management/management.js';//订单管理

// import Refund from './backstage/refund/refund.js';//退款管理
import Map from './backstage/map/map.js';    //地图
import Administration from './backstage/administration/administration.js';//管理员列表
import Message from './backstage/message/message.js';//留言列表
import System from './backstage/system/system.js'; //系统设置
import Login from './backstage/login/login.js';
import Navigation from './backstage/navigation.js';//左侧导航菜单共用
import PageHeader from './backstage/pageHeader.js';//右侧头部共用
import './backstage/css/reset.css';
import './backstage/css/tan.css';
import './backstage/css/productList.css';
import './backstage/iconfont/iconfont.css';
import './backstage/css/index.css';



class App extends Component {
  render() {
    return (    
      <div className="item">
        <Route exact path='/index' render={(url)=>{
          return <Index  url={url}/>
        }}/>
        <Route path='/index/navigation' children={()=>{
          return <Navigation />
        }}/>
        <Route path='/page' component={PageHeader}/>
        
        <Route path='/index/productList' render={(url)=>{
          return <ProductList url={url}/>
        }}/>
        <Route path='/index/member' render={(url)=>{
          return <Member url={url}/>
        }}/>
        
        {/* <Route path='/index/integral' render={(url)=>{
          return <Integral url={url}/>
        }}/> */}
        <Route path='/index/management' render={(url)=>{
          return <Management url={url}/>
        }}/>
       
        {/* <Route path='/index/refund' render={(url)=>{
          return <Refund url={url}/>
        }}/> */}
        <Route path='/index/map' render={(url)=>{
          return <Map url={url}/>
        }}/>
        <Route path='/index/administration' render={(url)=>{
          return <Administration url={url}/>
        }}/>
         <Route path='/index/message' render={(url)=>{
          return <Message url={url}/>
        }}/>
        <Route path='/index/system' render={(url)=>{
          return <System url={url}/>
        }}/>
        <Route  exact path='/' render={(url)=>{
            return <Login url={url}/>
        }}/>
        {/* {renderComponent(routes)} */}
      </div>
    );
  }
}

export default App;


