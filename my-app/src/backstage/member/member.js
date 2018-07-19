import React, { Component } from 'react';
import PageHeader from '../pageHeader.js';
import Mlist from './Mlist.js';
import MemPage from './memPage.js';
import { withRouter } from 'react-router-dom';
import *as actionCreators from '../action/memAction.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID:'',
            e:'',
            i:'',
            nowpage:1,
            searchName: '',
            //弹窗数据
            time: '',
            userName:'',
            sex:'',
            mobile:'',
            email:'',
            address:'',
            grade:'',
            status:'',
            checked: '',
            ke: '',
            val: ''
        };
    }
    // 登录用
    componentWillMount(){
		let {url:{history}} = this.props;
		if(!sessionStorage.getItem('key')){
			history.push('/');
		}
    }
    // 上来渲染数据   ok
    componentDidMount() {
        
        let {oddMem,pagecountMem ,data} = this.props
        console.log(data)
        oddMem(1)//请求单页数据
        pagecountMem()

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
    // 添加会员按钮  ok
    add=()=>{
        this.setState({
            userName: '',
            sex: '',
            mobile: '',
            email: '',
            checked: '',
            id: "",
            ids: '',
            address: '',
            grade:'',
            status:''
        })
        this.refs.addtan.style.display='block';
    }
    // 添加商品弹框的  确认   按钮 ok
    addsure=()=>{
        let {userName,sex,mobile,email,address,grade,onoff,nowpage,status}=this.state;
        let records = `&userName=${userName}&sex=${sex}&mobile=${mobile}&email=${email}&address=${address}&grade=${grade}&status=${status}`;
        console.log(records)
        let {creatMem,oddMem,pagecountMem}=this.props;//actions.js 下的
        if (userName && sex && mobile && email && address&&grade&&status){
            creatMem(records)
            oddMem(nowpage) //请求单页数据//请求单页数据
            pagecountMem()
            this.refs.addtan.style.display='none';
        }else{
            alert('请输入')
        }
    }

    // 添加会员  弹窗关闭 x  按钮  ok
    closeAdd = () => {
        this.refs.addtan.style.display = 'none';
    }

    // 删除弹窗  X  按钮
    cancelclick = () => {
        this.refs.del.style.display = 'none'
    }
    // 编辑商品  弹窗关闭 x  按钮  ok
    closeBj = () => {
        this.refs.bjtan.style.display = 'none';
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
        let { oddMem, delMem,data,pagecountMem} = this.props;//action下的
        delMem(ID)
        oddMem(nowpage)
        pagecountMem()
        console.log(oddMem(nowpage))
        //如果只有一条数据   让全选按钮 变false
       if(data.length==1){
           this.setState({onOff:false})
           oddMem(nowpage)
       }
        this.refs.del.style.display = 'none'
    }

    //Mlist.js 调用 
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

    // 批量删除
    delAll = () => {
        let {data,delallMem,oddMem,pagecountMem}=this.props;
         let {nowpage}=this.state;
         let arr=[]
         let selected = data.filter(e => {
             return e.checked
         })
        //  console.log(selected) //选中的数据
         selected.forEach(e => {
             arr.push(e.id)
         })
         console.log(arr);//当前选中的数据的  id
         let p=JSON.stringify(arr);
        delallMem(p)
        oddMem(nowpage)
        // 全选按钮不选中
        if (arr.length == data.length) {
            nowpage--;
            oddMem(nowpage)
           this.setState({onOff:false,nowpage})
       }
       pagecountMem()
        console.log(data.length)
        
     }
     //编辑弹窗 数值修改 
     edit = (e) => {
         this.refs.bjtan.style.display = 'block';
         console.log(e)
        this.setState({
             userName: e.userName,
             sex: e.sex,
             mobile: e.mobile,
             checked: e.checked,
             id: e.id,
             onOff: e.onOff,
             email: e.email,
             address: e.address,
             grade: e.grade,
             status:e.status
         })
     }

     // 编辑弹窗的确认按钮
    bjConfirm=()=>{
      let {userName,sex,mobile,email,address,grade,nowpage,id,checked,status}=this.state;
   
       let records={
           id,
           userName,
           sex,
           mobile,
           email,
           address,
           grade,
           status
       }

       let {oddMem,updateMem}=this.props;
       if (userName && sex && mobile && status) {
           updateMem(records)
           setTimeout(e=>{
               oddMem(nowpage)
               this.refs.bjtan.style.display='none'
           },50)
       }
        
    
           
    }
    

    // 添加商品弹框的   重置按钮 ok
    reset = () => {
        this.setState({
            userName: '',
            sex: '',
            mobile: '',
            email: '',
            address: '',
            grade: '',
            checked: '',
            id: '',
            ids: '',
            status: ''
        })
    }
    // 查询
    query=()=>{
       
       //searchName 是input里输入的查询内容  nowpage当前的页码页 
       //ke是左侧的下拉菜单的value val 是input里输入的查询内容  这是专门查询时的页码使用
         let {searchName,nowpage,ke,val}=this.state;
         console.log(searchName, nowpage)
        let {findProductM,findpagecountM} = this.props;//action.js下查询  和查询时的页码方法
        let fl = this.refs.fl.value;//左侧下拉菜单的value
        if(searchName){
            this.setState({
                nowpage:1,
                ke: fl,
                val: searchName
            })
            this.refs.searchName.value=''
            findProductM(searchName, nowpage,fl);//查询用
            findpagecountM(fl,searchName)//查询时的页码用
        }else{
            alert('请输入查询内容')
        }
    }
     // 刷新页面
    refresh = () => {
        let {oddMem,pagecountMem}=this.props;
        let {nowpage,onOff}=this.state;
        oddMem(nowpage)
        pagecountMem()
        this.setState({
            nowpage: 1,
            ke:'',
            val:'',
            onOff:false
        })

    }


    render() {
        let {userName,sex,checked,id,ids,onOff,nowpage,status,email,address,grade,mobile,ke,val,time}=this.state;
        let {data,count}=this.props;
        console.log(data,count)
        let newArr=data.map((e,i)=>{
            return <Mlist
            {...{
                key: i,
                onOff,
                e,
                i,
                time,
                nowpage,
                del: this.del, //删除弹窗名字
                deltan: this.deltan, //
                delclick: this.delclick, //确认删除按钮
                edit: this.edit, //编辑
                allOnoff: this.allOnoff, //全选按钮
            }}
            />
        })

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
                        <span>会员列表</span>
                    </div>
                    {/* 产品列表*/}
                    <section className="product-list">
                        <ul className="product-search">
                            <li>
                                <select ref='fl' >
                                    <option value="userName">用户名</option>
                                    <option value="sex">性别</option>
                                    <option value="mobile">手机</option>
                                    <option value="email">邮箱</option>
                                    <option value="address">地址</option>
                                    <option value="grade">等级类型</option>
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
                        {/* 添加和删除按钮*/}
                        <div className="product-btn">
                            <div className="btn-left">
                                <a 
                                // href="#" 
                                title="添加用户" 
                                className="add"
                                onClick={this.add}
                                ><i className="iconfont icon-icon--"></i>添加用户</a>
                                <a 
                                // href="#" 
                                className="delete"
                                onClick={this.delAll}
                                ><i className="iconfont icon-shanchu"></i>批量删除</a>
                            </div>
                            {/* <span className="number">共：<b>2334</b>件商品</span> */}
                        </div>
                        {/* 表单*/}
                        <div className="table-list">
                            <table >
                                <thead>
                                    <tr>
                                        <th >
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
                                        <th>用户名</th>
                                        <th>性别</th>
                                        <th >手机</th>
                                        <th >邮箱</th>
                                        <th >地址</th>
                                        <th >等级</th>
                                         <th>状态</th>
                                        <th >操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {newArr}
                                </tbody>
                            </table>
                        </div>
                        <MemPage 
                        {...{
                            ke,
                            val,
                            nowpage,
                            numFn:this.numFn,
                            allOnoff: this.allOnoff,
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
                        {/* 添加会员弹窗 */}
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
                                        <span>会员名称:</span>
                                        <input 
                                        type="text" 
                                        value={userName}
                                        onChange={this.handelChange.bind(this)}
                                        name="userName"
                                        />
                                    </div>
                                    <div className="input_info">
                                        <span>会员性别:</span>
                                        <select 
                                        value={sex}
                                        onChange={this.handelChange.bind(this)}
                                        name="sex"
                                        
                                        >
                                            < option value = "请选择" > 请选择 </option>
                                            < option value = "所有分类" > 所有分类 </option>
                                            <option value="男">男</option>
                                            <option value="女">女</option>
                                        </select>
                                
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
                                    <span>会员邮箱:</span>
                                    <input 
                                    type="text" 
                                    value={email}
                                    onChange={this.handelChange.bind(this)}
                                    name="email"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>会员地址:</span>
                                    <input 
                                    type="text" 
                                    value={address}
                                    onChange={this.handelChange.bind(this)}
                                    name = "address"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>会员等级:</span>
                                    <select 
                                        value={grade}
                                        onChange={this.handelChange.bind(this)}
                                        name="grade"
                                    >
                                        < option value = "请选择" > 请选择 </option>
                                        <option value="普通会员">普通会员</option>
                                        <option value="银牌会员">银牌会员</option>
                                        <option value="铜牌会员">铜牌会员</option>
                                    </select>
                                
                                </div>
                                <div className="input_info">
                                    <span>会员状态:</span>
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
                                        <span>会员姓名:</span>
                                        <input 
                                        type="text" 
                                        value={userName}
                                        onChange={this.handelChange.bind(this)}
                                        name="userName"
                                        />
                                    </div>
                                    <div className="input_info">
                                        <span>会员性别:</span>
                                        <select 
                                        value={sex}
                                        onChange={this.handelChange.bind(this)}
                                        name="sex"
                                        
                                        >
                                            < option value = "请选择" > 请选择 </option>
                                            <option value="男">男</option>
                                            <option value="女">女</option>
                                        </select>
                                
                                    </div>
                                    <div className="input_info">
                                        <span>会员手机:</span>
                                        <input 
                                        type="text" 
                                        onChange={this.handelChange.bind(this)}
                                        name = "mobile"
                                        value={mobile}
                                        />
                                    </div>
                            
                                <div className="input_info">
                                    <span>会员邮箱:</span>
                                    <input 
                                    type="text" 
                                    value={email}
                                    onChange={this.handelChange.bind(this)}
                                    name="email"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>会员地址:</span>
                                    <input 
                                    type="text" 
                                    value={address}
                                    onChange={this.handelChange.bind(this)}
                                    name = "address"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>会员级别:</span>
                                    <select 
                                        value={grade}
                                        onChange={this.handelChange.bind(this)}
                                        name="grade"
                                    >
                                        <option value = "请选择" > 请选择 </option>
                                        <option value="普通会员">普通会员</option>
                                        <option value="银牌会员">银牌会员</option>
                                        <option value="铜牌会员">银牌会员</option>
                                    </select>
                                
                                </div>
                                <div className="input_info">
                                    <span>会员状态:</span>
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
                                    onClick={this.closeBj}
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
console.log(state.reducer2.content)
    return {
        
        data: state.reducer2.content,
        count: state.reducer2.page

    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(Member))