import React, { Component } from 'react';
import PageHeader from '../pageHeader.js';
import MessageList from './messageList.js';
import MessagePage from './messagePage.js';
import *as actionCreators from '../action/messageAction.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID:'',
            e:'',
            i:'',
            nowpage: 1, //当前页码
            searchName:'',
            //弹窗数据
            MessNumber: '',
            userName: '',
            mess:'',
            checked: '',
            id: "",
            ids: '',
            status:'',
            time: '',
            ke:'',
            val:''
        };
    }
    componentWillMount(){
		let {url:{history}} = this.props;
		if(!sessionStorage.getItem('key')){
			history.push('/');
		}
	}
    // 上来渲染数据   ok
    componentDidMount() {
        let {oddMess,messagePage } = this.props
        console.log(messagePage)
        oddMess(1) //请求单页数据
        messagePage()

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
        // console.log(data.length)
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
        let { oddMess, delMessage,data,messagePage} = this.props;//action下的
        delMessage(ID)
        oddMess(nowpage)
        messagePage()
        console.log(oddMess)
        //如果只有一条数据   让全选按钮 变false
       if(data.length==1){
           this.setState({onOff:false})
           oddMess(nowpage)
       }
        this.refs.del.style.display = 'none'
    }
     // 删除弹窗  X 和取消 按钮
     cancelclick = () => {
         this.refs.del.style.display = 'none'

     }

     // 批量删除
    delAll = () => {
        console.log(123)
        let {data,delallMess,oddMess,messagePage}=this.props;
         let {nowpage}=this.state;
         let arr=[]
         let selected = data.filter(e => {
             return e.checked
         })
        selected.forEach(e => {
             arr.push(e.id)
         })
        //  console.log(arr);//当前选中的数据的  id
         let p=JSON.stringify(arr);
        delallMess(p)
        oddMess(nowpage)
        // 全选按钮不选中
        if(arr.length==data.length){
            nowpage--;
            oddMess(nowpage)
           this.setState({onOff:false,nowpage})
       }
       messagePage()
        console.log(data.length)
        
     }
     // 查询
    query=()=>{
       //searchName 是input里输入的查询内容  nowpage当前的页码页 
       //ke是左侧的下拉菜单的value val 是input里输入的查询内容  这是专门查询时的页码使用
         let {searchName,nowpage,ke,val}=this.state;
        let {findMessage,findpageMess} = this.props;//action.js下查询  和查询时的页码方法
        let fl = this.refs.fl.value;//左侧下拉菜单的value
        if(searchName){
            this.setState({
                nowpage:1,
                ke: fl,
                val: searchName
            })
            console.log(ke,val)
            this.refs.searchName.value=''
            findMessage(searchName, nowpage, fl); //查询用
            findpageMess(fl, searchName) //查询时的页码用
        }else{
            alert('请输入查询内容')
        }
    }

    // 刷新页面
    refresh = () => {
        let {oddMess,messagePage}=this.props;
        let {nowpage}=this.state;
        oddMess(nowpage)
        messagePage()
        this.setState({
            nowpage: 1,
            ke:'',
            val:''
        })

    }



    render() {
        let {MessNumber,userName,time,mess,status,onOff,nowpage,ke,val}=this.state;
        let {data,count}=this.props;
        let newArr = data.length?data.map((e, i) => {
           return <MessageList { ...{
                    key: i,
                    onOff,
                    e,
                    i,
                    nowpage,
                    time,
                    del: this.del, //删除弹窗名字
                    deltan: this.deltan, //
                    delclick: this.delclick, //确认删除按钮
                    allOnoff: this.allOnoff, //全选按钮

                }
            }
            />
        }):'';
        return (
            <div>
                <div className="page">
                    {/* 头部搜索框 */}
                    <PageHeader/>
                    {/* 面包屑导航 */}
                    <div className="breadmenu">
                        <a href="" className="breadmenu-pic"></a>
                        <span>主页  ></span>
                        <span>留言列表</span>
                    </div>
                    {/* 留言列表 */}
                    <section className="product-list">
                        <ul className="product-search">
                           <li>
                                <select ref='fl' >
                                    <option value="MessNumber">编号</option>
                                    <option value="mess">留言内容</option>
                                    <option value="time">时间</option>
                                    <option value="status">状态</option>
                                     <option value="userName">用户名</option>
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
                        {/* 添加和删除按钮 */}
                        <div className="product-btn">
                            <div className="btn-left">
                                <a 
                                className="delete"
                                onClick={this.delAll}
                                ><i className="iconfont icon-shanchu"></i>批量删除</a>
                            </div>
                         </div>
                        {/* 表单 */}
                        <div className="table-list">
                            <table >
                                <thead>
                                    <tr>
                                        <th>
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
                                        <th>编号</th>
                                        <th>用户名</th>
                                        <th>留言内容</th>
                                        <th>时间</th>
                                        <th>状态</th>
                                        <th >操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newArr}
                                </tbody>
                            </table>
                        </div>
                         <MessagePage
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
                    </section>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        data: state.reducer3.content,
        count: state.reducer3.page

    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Message)