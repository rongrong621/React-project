import React, { Component } from 'react';
import OrderList from './orderList.js';
import OrderPage from './orderPage.js';
import PageHeader from '../pageHeader.js';
import Details from './details.js';
import * as actionCreators from '../action/action.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './info.css';
class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID:'',
            e:'',
            i:'',
            nowpage: 1, //当前页码
            searchName:'',
            //弹窗数据
            orderNumber:'',//订单编号
            productName: '',//商品名字
            total: '',//
            discount: '',
            id: "",
            ids: '',
            money: '',
            type: '',
            status:'',
            number1:'',
            ke:'',
            val:''
        };
    }
    // 生命周期   登录
    componentWillMount(){
		let {url:{history}} = this.props;
		if(!sessionStorage.getItem('key')){
			history.push('/');
		}
	}

    // 上来渲染数据   ok
    componentDidMount() {
        let {oddOrder,orderPage} = this.props
        console.log(orderPage)
        oddOrder(1) //请求单页数据
        orderPage()//请求总的页码
    }
    delClick=()=>{
        let delTan=document.querySelector('.tan_content');
        delTan.style.display='block';
    }
    closeClick=()=>{
        let delTan=document.querySelector('.tan_content');
        delTan.style.display='none';
    }
    
    // input框 ok
    handelChange(event) {
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ))
    }
    // orderList 调用 
    allOnoff=(onOff)=>{
        this.setState({onOff})
    }
    // 页码 调用
    numFn=(num)=>{
        this.setState({nowpage:num})
    }
    // 全选input 按钮
    changeall = () => {
        let { data} = this.props
        let { onOff} = this.state
        onOff = !onOff
        // console.log(data);//tb 下的数据
        for(let i = 0; i < data.length; i++) {
            if(data.length){
                data[i].checked = onOff
            }
           
        }
        console.log(data.length)
       this.setState({ onOff})
        
    }

     //删除弹窗 ok
    deltan=(e)=>{
       this.setState({ ID: e.id, e: e})
        this.refs.del.style.display = 'block'
        
    }
    // 弹窗确认   删除  
    delclick=()=>{
        let {ID,nowpage}=this.state;
        let { oddOrder, delorder,data,orderPage} = this.props;//action下的
        delorder(ID)
        oddOrder(nowpage)
        orderPage()
        console.log(oddOrder)
        //如果只有一条数据   让全选按钮 变false
       if(data.length==1){
           this.setState({onOff:false})
           oddOrder(nowpage)
       }
        this.refs.del.style.display = 'none'
    }
     // 删除弹窗  X 和取消 按钮
    cancelclick = () => {
        this.refs.del.style.display = 'none'

    }
    // 批量删除
    delAll = () => {
        let {data,delallorder,oddOrder,orderPage}=this.props;
         let {nowpage}=this.state;
         let arr=[]
         let selected = data.filter(e => {
             return e.checked
         })
        //  console.log(selected) //选中的数据
         selected.forEach(e => {
             arr.push(e.id)
         })
        //  console.log(arr);//当前选中的数据的  id
         let p=JSON.stringify(arr);
        delallorder(p)
        oddOrder(nowpage)
        // 全选按钮不选中
        if(arr.length==data.length){
            nowpage--;
            oddOrder(nowpage)
           this.setState({onOff:false,nowpage})
       }
       orderPage()
        console.log(data.length)
        
     }

    
     // 查询
    query=()=>{
       //searchName 是input里输入的查询内容  nowpage当前的页码页 
       //ke是左侧的下拉菜单的value val 是input里输入的查询内容  这是专门查询时的页码使用
         let {searchName,nowpage,ke,val}=this.state;
        let {findOrder,findpageo} = this.props;//action.js下查询  和查询时的页码方法
        let fl = this.refs.fl.value;//左侧下拉菜单的value
        if(searchName){
            this.setState({
                nowpage:1,
                ke: fl,
                val: searchName
            })
            console.log(ke,val)
            this.refs.searchName.value=''
            findOrder(searchName, nowpage, fl); //查询用
            findpageo(fl, searchName) //查询时的页码用
        }else{
            alert('请输入查询内容')
        }
    }
    // 刷新页面
    refresh = () => {
        let {oddOrder,orderPage}=this.props;
        let {nowpage}=this.state;
        oddOrder(nowpage)
        orderPage()
        this.setState({
            nowpage: 1,
            ke:'',
            val:''
        })

    }

    fn=(e)=>{
        this.setState({e});
    }

    render() {
        let {orderNumber,productName,total,discount,money,type,status,number1,onOff,nowpage,ke,val,e}=this.state;
        let {data}=this.props;
        let newArr1=data.length?data.map((e,i)=>{
             return <OrderList
             {...{
                 key:i,
                 onOff,
                 e,
                 i,
                 nowpage,
                 del: this.del, //删除弹窗名字
                deltan: this.deltan, //
                delclick: this.delclick, //确认删除按钮
                allOnoff: this.allOnoff, //全选按钮
                fn:this.fn
             }}
             />
        }):'';
        
        return (
            <div>
               
                <div className="page">
                    {/* 头部搜索框 */}
                    <PageHeader/>
                    {/* 面包屑导航 */}
                    <div className="breadmenu">
                        <a  className="breadmenu-pic"></a>
                        <span>主页  ></span>
                        <span>订单管理</span>
                    </div>
                    
                    {/* 订单管理 */}
                    <section className="product-list">
                        <ul className="product-search">
                            <li>
                                <select ref='fl' >
                                    <option value="orderNumber">订单编号</option>
                                    <option value="productName">产品名称</option>
                                    <option value="total">总价</option>
                                    <option value="discount">优惠</option>
                                    <option value="money">交易金额</option>
                                    <option value="type">原属类型</option>
                                    <option value="number1">数量</option>
                                    <option value="status">状态</option>
                                </select>
                                <input 
                                type="text"
                                placeholder="输入查询内容"
                                ref='searchName'
                                onChange={this.handelChange.bind(this)}
                                name="searchName"
                                />
                            </li>
                           
                            <li>
                                <a onClick={this.query}>查询</a>
                                <a onClick={this.refresh}>刷新</a>
                            </li>
                        </ul>
                        { /* 批量删除按钮 */ }
                        <div className="product-btn">
                            <div className="btn-left">
                               <a 
                                className="delete"
                                onClick={this.delAll}
                                ><i className="iconfont icon-shanchu"></i>批量删除</a>
                            </div>
                            
                        </div>
                        {/* 表单 */}
                        <div className="table-list mangaement">
                            <table >
                                <thead>
                                    <tr>
                                        <th className="checked">
                                        <label>
                                            <input 
                                            type="checkbox" 
                                            className="ace" 
                                            ref="all"
                                            onChange={this.changeall}
                                            checked={onOff ? 'checked' : ''}
                                            />
                                            <span className="lbl"></span>
                                            </label>
                                        </th>
                                        <th >订单编号</th>
                                        <th>产品名称</th>
                                        <th>总价</th>
                                        <th >优惠</th>
                                        <th>交易金额</th>
                                        <th>原属类型</th>
                                        <th>数量</th>
                                        <th>状态</th>
                                        <th >操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newArr1}
                                </tbody>
                            </table>
                        </div>
                        <OrderPage
                        {...{
                            ke,
                            val,
                            nowpage,
                            numFn:this.numFn,
                            allOnoff: this.allOnoff, //全选按钮
                        }}
                        />
                        {/* 删除弹框 */}
                        <div className="tan_content" id="del" ref="del">
                            <div className="bg"></div>
                            <div className="tan_box delete_box">
                                <div className="tan_title clear">
                                    <span>删除</span>
                                    <i 
                                    className="iconfont icon-cuohao"
                                    onClick={this.cancelclick}
                                    ></i>
                                </div>
                                <div className="text_box">
                                    <i className="iconfont icon-queding"></i>
                                    <span>确定删除此项？</span>
                                </div>
                                <div className="input_content">
                                    <div className="btn_sure btn_two">
                                        <a 
                                        className="sure"
                                        onClick={this.delclick}
                                        >确定</a>
                                        <a 
                                        className="replay"
                                        onClick={this.cancelclick}
                                        >取消</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 订单详细 */}
                        <Details
                            e={e}
                        />
                      </section>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        data: state.reducer1.content,
        count: state.reducer1.page

    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(Management))