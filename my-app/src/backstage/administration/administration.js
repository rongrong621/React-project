import React, { Component } from 'react';
import PageHeader from '../pageHeader.js';
import AdmList from './admList.js';
import AdminiPage from './adminiPage.js';
import *as actionCreators from '../action/adminiAction.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class Administration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID:'',
            e:'',
            i:'',
            nowpage: 1, //当前页码
            searchName:'',
            //弹窗数据
            number: '',
            loginName: '',
            mobile: '',
            checked: '',
            id: "",
            ids: '',
            email: '',
            role: '',
            status:'',
            time: '',
            ke:'',
            val:''
        };
    }
// 登录  如果没有sessionStorage  就会跳转到登陆页
    componentWillMount(){
		let {url:{history}} = this.props;
		if(!sessionStorage.getItem('key')){
			history.push('/');
		}
	}
   // 上来渲染数据   ok
    componentDidMount() {
        let {oddAdmini,pagecountAdmini  } = this.props
        console.log(oddAdmini, pagecountAdmini)
        oddAdmini(1) //请求单页数据
        pagecountAdmini()

    }
    // 添加商品的input框 ok
    handelChange(event) {
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ))
    }
    //删除弹窗 ok
    deltan=(e)=>{
        console.log(e)
        this.setState({ ID: e.id, e: e})
        this.refs.del.style.display = 'block'
        
    }
    // 弹窗确认   删除  
    delclick=()=>{
        let {ID,nowpage}=this.state;
        let { oddAdmini, delAd,data,pagecountAdmini} = this.props;//action下的
        delAd(ID)
        oddAdmini(nowpage)
        pagecountAdmini()
        if(data.length==1){
           this.setState({onOff:false})
           oddAdmini(nowpage)
       }
        this.refs.del.style.display = 'none'
    }
    // 删除弹窗  X  按钮
    cancelclick = () => {
        this.refs.del.style.display = 'none'

    }
    // admList.js 调用 
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
    // 添加商品按钮 ok
    add=()=>{
        this.setState({
            number:'',
            loginName: '',
            mobile: '',
            email: '',
            role:'',
            checked: '',
            id: "",
            ids: '',
            time: '',
            status:''
        })
        this.refs.addtan.style.display='block';
    }
    // 添加商品  弹窗关闭 x  按钮  ok
    closeAdd = () => {
        this.refs.addtan.style.display = 'none';
    }
    // 添加商品弹框的  确认   按钮 ok
    addsure=()=>{
        let {number,loginName,mobile,email,role,onoff,nowpage,status,time}=this.state;
        let records = `&loginName=${loginName}&mobile=${mobile}&email=${email}&role=${role}&status=${status}`;
        console.log(records)
        let {creatAdmini,oddAdmini,pagecountAdmini}=this.props;//actions.js 下的
        if (loginName && mobile && email && role && status) {
            creatAdmini(records)
            oddAdmini(nowpage) //请求单页数据//请求单页数据
            pagecountAdmini()
            this.refs.addtan.style.display='none';
        }
    }

    // 添加商品弹框的   重置按钮 ok
    reset=()=>{
        this.setState({
            number:'',
            loginName: '',
            mobile: '',
            role: '',
            email: '',
            time:'',
            checked:'',
            id:'',
            ids:'',
            status:''
        })
    }

    //编辑弹窗 数值修改 
     edit=(e)=>{
        this.refs.bjtan.style.display = 'block';
        this.setState({
            number:e.number,
            loginName: e.loginName,
            mobile: e.mobile,
            email: e.email,
            checked: e.checked,
            id: e.id,
           onOff: e.onOff,
            role: e.role,
            time:e.time,
        })
    }

    // 编辑弹窗的确认按钮
    bjConfirm=()=>{
     let {number,loginName,mobile,email,role,nowpage,id,checked,status}=this.state;
   
       let records={id,loginName,mobile,email,role,status}

       let {oddAdmini,updateMem}=this.props;
       if (loginName && mobile && email && status) {
           updateMem(records)
           setTimeout(e=>{
               oddAdmini(nowpage)
               this.refs.bjtan.style.display='none'
           },50)
       }
    }
    // 编辑商品  弹窗关闭 x  按钮  ok
    closeBj = () => {
        this.refs.bjtan.style.display = 'none';
    }

    // 批量删除 按钮
     delAll = () => {
        let {data,delallAd,oddAdmini,pagecountAdmini}=this.props;
         let {nowpage}=this.state;
         let arr=[]
         let selected = data.filter(e => {
             return e.checked
         })
       selected.forEach(e => {
             arr.push(e.id)
         })
         let p=JSON.stringify(arr);
        delallAd(p)
        oddAdmini(nowpage)
        // 全选按钮不选中
        if(arr.length==data.length){
            nowpage--;
            oddAdmini(nowpage)
           this.setState({onOff:false,nowpage})
       }
       pagecountAdmini()
        console.log(arr)
        
    }
    // 查询
    query=()=>{
       let {searchName,nowpage,ke,val}=this.state;
        let {findAd,findpagecountA} = this.props;//action.js下查询  和查询时的页码方法
        let fl = this.refs.fl.value;//左侧下拉菜单的value
        if(searchName){
            this.setState({
                nowpage:1,
                ke: fl,
                val: searchName
            })
            console.log(ke,val)
            this.refs.searchName.value=''
            findAd(searchName, nowpage, fl); //查询用
            findpagecountA(fl, searchName) //查询时的页码用
        }else{
            alert('请输入查询内容')
        }
    }

    // 刷新页面
    refresh = () => {
        let {oddAdmini,pagecountAdmini}=this.props;
        let {nowpage}=this.state;
        oddAdmini(nowpage)
        pagecountAdmini()
        this.setState({
            nowpage: 1,
            ke:'',
            val:''
        })

    }


    render() {
        let {number,loginName,checked,id,ids,mobile,onOff,email,time,nowpage,role,status,ke,val}=this.state;
        let {data}=this.props;
        console.log(data)
        let newArr=data.map((e,i)=>{
           return <AdmList
                {...{
                    key:i,
                    onOff,
                    e,
                    i,
                    nowpage,
                    time,
                    del:this.del,//删除弹窗名字
                    deltan:this.deltan,//
                    delclick:this.delclick,//确认删除按钮
                    edit: this.edit,//编辑
                    allOnoff: this.allOnoff,//全选按钮
                    
                }}
             />
         })
         console.log(newArr)
        return (
            <div>
                <div className="page">
                    {/* 头部搜索框 */}
                    <PageHeader/>
                    {/* 面包屑导航 */}
                    <div className="breadmenu">
                        <a href="" className="breadmenu-pic"></a>
                        <span>主页  ></span>
                        <span>管理员列表</span>
                    </div>
                    {/* 管理员列表 */}
                    <section className="product-list">
                        <ul className="product-search">
                            <li>
                                <select ref='fl' >
                                    <option value="loginName">登录名</option>
                                    <option value="mobile">手机</option>
                                    <option value="email">邮箱</option>
                                    <option value="role">角色</option>
                                    <option value="time">加入时间</option>
                                    <option value="status">状态</option>
                                </select>
                                <input 
                                type="text"
                                placeholder="输入查询名称"
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
                                className="add"
                                onClick={this.add}
                                ><i className="iconfont icon-icon--"></i>添加管理员</a>
                                <a 
                               onClick={this.delAll}
                                className="delete"
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
                                        <th>登录名</th>
                                        <th>手机</th>
                                        <th>邮箱</th>
                                        <th>角色</th>
                                        <th>加入时间</th>
                                        <th>状态</th>
                                        <th >操作</th>
                                    </tr>
                                </thead>
                                <tbody id="tb" ref="tb">
                                  {newArr}
                                </tbody>
                            </table>
                        </div>
                        <AdminiPage
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
                        {/* 添加产品弹窗 */}
                        <div className="tan_content" id="tanBox" ref="addtan">
                            <div className="bg"></div>
                            <div className="tan_box">
                                <div className="tan_title clear">
                                    <span>添加</span>
                                    <a
                                    onClick={this.closeAdd}
                                    ><i>×</i></a>
                                </div> 
                                <div className="input_content">
                                    <div className="input_info">
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编号:</span>
                                        <input 
                                        type="text" 
                                        value={number}
                                        onChange={this.handelChange.bind(this)}
                                        name="number"
                                        />
                                    </div>
                                    <div className="input_info">
                                        <span>&nbsp;&nbsp;&nbsp;登录名:</span>
                                        <input 
                                        type="text" 
                                        onChange={this.handelChange.bind(this)}
                                        name = "loginName"
                                        value={loginName}
                                        />
                                    </div>
                                    <div className="input_info">
                                        <span>手机号码:</span>
                                        <input 
                                        value={mobile}
                                        onChange={this.handelChange.bind(this)}
                                        name="mobile"
                                        />
                                    </div>
                                    
                            
                                    <div className="input_info">
                                        <span>电子邮箱:</span>
                                        <input 
                                        type="text" 
                                        value={email}
                                        onChange={this.handelChange.bind(this)}
                                        name="email"
                                        />
                                    </div>
                                <div className="input_info">
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角色:</span>
                                    <input 
                                    type="text" 
                                    value={role}
                                    onChange={this.handelChange.bind(this)}
                                    name = "role"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>加入时间:</span>
                                    <input 
                                    type="text"
                                    value={time}
                                    onChange={this.handelChange.bind(this)}
                                    name="time"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态:</span>
                                    <select 
                                        value={status}
                                        onChange={this.handelChange.bind(this)}
                                        name="status"
                                    >
                                        < option value = "请选择" > 请选择 </option>
                                        <option value="启用">正常</option>
                                        <option value="停用">隐藏</option>
                                    </select>
                                
                                </div>
                                <div className="btn_sure">
                                    <a
                                        onClick={this.addsure.bind(this)}
                                        className="sure">确定</a>
                                    <a 
                                    className="replay"
                                    onClick={this.reset.bind(this)}
                                    >重置</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 编辑的弹窗 */}
                    <div className="tan_content" id="bjtanBox" ref="bjtan">
                            <div className="bg"></div>
                            <div className="tan_box">
                                <div className="tan_title clear">
                                    <span>编辑</span>
                                    <a
                                    onClick={this.closeBj}
                                    ><i>×</i></a>
                                </div> 
                                <div className="input_content">
                                    <div className="input_info">
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编号:</span>
                                        <input 
                                        type="text" 
                                        value={number}
                                        onChange={this.handelChange.bind(this)}
                                        name="number"
                                        />
                                    </div>
                                    <div className="input_info">
                                        <span>&nbsp;&nbsp;&nbsp;登录名:</span>
                                        <input 
                                        value={loginName}
                                        onChange={this.handelChange.bind(this)}
                                        name="loginName"
                                        />
                                    </div>
                                    <div className="input_info">
                                        <span>手机号码:</span>
                                        <input 
                                        type="text" 
                                        onChange={this.handelChange.bind(this)}
                                        name = "mobile"
                                        value={mobile}
                                        />
                                    </div>
                            
                                <div className="input_info">
                                    <span>电子邮箱:</span>
                                    <input 
                                    type="text" 
                                    value={email}
                                    onChange={this.handelChange.bind(this)}
                                    name="email"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角色:</span>
                                    <input 
                                    type="text" 
                                    value={role}
                                    onChange={this.handelChange.bind(this)}
                                    name = "role"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>加入时间:</span>
                                    <input 
                                    type="text"
                                    value={time}
                                    onChange={this.handelChange.bind(this)}
                                    name="time"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>商品状态:</span>
                                    <select 
                                        value={status}
                                        onChange={this.handelChange.bind(this)}
                                        name="status"
                                    >
                                        < option value = "请选择" > 请选择 </option>
                                        <option value="启用">启用</option>
                                        <option value="停用">停用</option>
                                    </select>
                                
                                </div>
                                <div className="btn_sure">
                                    <a
                                        onClick={this.bjConfirm.bind(this)}
                                        className="sure">确定</a>
                                    <a 
                                    className="replay"
                                    onClick={this.reset.bind(this)}
                                    >重置</a>
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
    console.log(state.reducer4.content)
    return {
        data: state.reducer4.content,
        count: state.reducer4.page,

    };
    
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Administration)