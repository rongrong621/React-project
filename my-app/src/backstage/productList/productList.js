import React, { Component } from 'react';
import PageHeader from '../pageHeader.js';

import Pagecomponent from '../Pagecomponent';//页码
import { withRouter } from 'react-router-dom';
import *as actionCreators from '../action/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Item from './item.js';
class ProductList extends Component {
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
            productName: '',
            fenlei:'',
            checked: '',
            id: "",
            ids: '',
            Price: '',
            Stock: '',
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
        // action.js下请求单页数据    请求页码
        let {odd,pagecount } = this.props
        odd(1)//请求单页数据
        pagecount()

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
        let { odd, del,data,pagecount} = this.props;//action下的
        del(ID)
        odd(nowpage)
        pagecount()
        console.log(odd(nowpage))
        //如果只有一条数据   让全选按钮 变false
       if(data.length==1){
           this.setState({onOff:false})
           odd(nowpage)
       }
        this.refs.del.style.display = 'none'
    }
    // 删除弹窗  X  按钮
    cancelclick = () => {
        this.refs.del.style.display = 'none'

    }
    // item.js 调用 
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

     // 批量删除 按钮
     delAll = () => {
        let {data,delall,odd,pagecount}=this.props;
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
        delall(p)
        odd(nowpage)
        // 全选按钮不选中
        if(arr.length==data.length){
            nowpage--;
            odd(nowpage)
           this.setState({onOff:false,nowpage})
       }
       pagecount()
        console.log(data.length)
        
     }

     //编辑弹窗 数值修改 
     edit=(e)=>{
        this.refs.bjtan.style.display = 'block';
        console.log(e)
        let d = new Date();
        d.setTime(d.getTime(e.time))
        let time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        this.setState({
            number:e.number,
            productName: e.productName,
            Stock: e.Stock,
            checked: e.checked,
            id: e.id,
           onOff: e.onOff,
            Price: e.Price,
            time,
        })
    }
   
    // 编辑弹窗的确认按钮
    bjConfirm=()=>{
      let {number,productName,Stock,fenlei,Price,nowpage,id,checked,status}=this.state;
   
       let records={
           id,
           productName,
           Stock,
           Price,
           fenlei,
           status
       }

       let {odd,update}=this.props;
       if (productName && Stock && Price&&status){
           update(records)
           setTimeout(e=>{
               odd(nowpage)
               this.refs.bjtan.style.display='none'
           },50)
       }
        
    
           
    }


   

    // 添加商品按钮 ok
    add=()=>{
        this.setState({
            number:'',
            productName:'',
            fenlei:'',
            Stock: '',
            checked: '',
            id: "",
            ids: '',
            Price: '',
            status:''
        })
        this.refs.addtan.style.display='block';
    }


    // 添加商品  弹窗关闭 x  按钮  ok
    closeAdd=()=>{
      this.refs.addtan.style.display = 'none';
    }
   // 编辑商品  弹窗关闭 x  按钮  ok
   closeBj = () => {
       this.refs.bjtan.style.display = 'none';
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

    // 添加商品弹框的  确认   按钮 ok
    addsure=()=>{
        let {number,productName,fenlei,Price,Stock,onoff,nowpage,status}=this.state;
        let records = `&productName=${productName}&Stock=${Stock}&Price=${Price}&fenlei=${fenlei}&status=${status}`;
        console.log(records)
        let {creat,odd,pagecount}=this.props;//actions.js 下的
        if (productName && Stock && Price&&status&&fenlei){
            creat(records)
            odd(nowpage) //请求单页数据//请求单页数据
            pagecount()
            this.refs.addtan.style.display='none';
        }
    }

    // 添加商品弹框的   重置按钮 ok
    reset=()=>{
        this.setState({
            number:'',
            fenlei:'',
            productName:'',
            Price:'',
            Stock:'',
            time:'',
            checked:'',
            id:'',
            ids:'',
            status:''
        })
    }

    // 查询
    query=()=>{
       //searchName 是input里输入的查询内容  nowpage当前的页码页 
       //ke是左侧的下拉菜单的value val 是input里输入的查询内容  这是专门查询时的页码使用
         let {searchName,nowpage,ke,val}=this.state;
        let {findProduct,findpagecount} = this.props;//action.js下查询  和查询时的页码方法
        let fl = this.refs.fl.value;//左侧下拉菜单的value
        if(searchName){
            this.setState({
                nowpage:1,
                ke: fl,
                val: searchName
            })
            console.log(ke,val)
            this.refs.searchName.value=''
            findProduct(searchName, nowpage,fl);//查询用
            findpagecount(fl,searchName)//查询时的页码用
        }else{
            alert('请输入查询内容')
        }
    }

    // 刷新页面
    refresh = () => {
        let {odd,pagecount}=this.props;
        let {nowpage}=this.state;
        odd(nowpage)
        pagecount()
        this.setState({
            nowpage: 1,
            ke:'',
            val:''
        })

    }
    render() {
         let {number,productName,checked,id,ids,Price,onOff,Stock,time,nowpage,fenlei,status,ke,val}=this.state;
         let {data,count}=this.props;
         console.log(data,count)
         
         let newArr=data.length?data.map((e,i)=>{
             let checkedonoff=e.checked ?'checked':''
             return <Item 
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
         }):[];
        return (
            <div>
                <div className="page">
                    {/* 头部搜索框 */}
                    <PageHeader/>
                    {/* 面包屑导航 */}
                    <div className="breadmenu">
                        <a href="" className="breadmenu-pic"></a>
                        <span>主页  ></span>
                        <span>产品列表</span>
                    </div>
                    {/* 产品列表 */}
                    <section className="product-list">
                        <ul className="product-search">
                            <li>
                                <select ref='fl' >
                                    <option value="fenlei">产品分类</option>
                                    <option value="productName">产品名称</option>
                                    <option value="Stock">库存</option>
                                    <option value="Price">价格</option>
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
                                <a title="添加商品" 
                                className="add"
                                onClick={this.add}
                                >
                                    <i className="iconfont icon-icon--"></i>
                                    添加商品
                                </a>
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
                                        < th className = 'checked' >
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
                                        <th >产品编号</th>
                                        <th >产品分类</th>
                                        <th>产品名称</th>
                                        <th>库存</th>
                                        <th>价格</th>
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
                        <Pagecomponent
                            {...{
                               ke,
                               val,
                                nowpage,
                               numFn:this.numFn,
                               allOnoff: this.allOnoff, //全选按钮
                            }}
                        />
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
                                        <span>产品编号:</span>
                                        <input 
                                        type="text" 
                                        value={number}
                                        onChange={this.handelChange.bind(this)}
                                        name="number"
                                        />
                                    </div>
                                    <div className="input_info">
                                        <span>分类名称:</span>
                                        <select 
                                        value={fenlei}
                                        onChange={this.handelChange.bind(this)}
                                        name="fenlei"
                                        
                                        >
                                            < option value = "请选择" > 请选择 </option>
                                            < option value = "所有分类" > 所有分类 </option>
                                            <option value="水果">水果</option>
                                            <option value="香水">香水</option>
                                        </select>
                                
                                    </div>
                                    <div className="input_info">
                                        <span>产品名称:</span>
                                        <input 
                                        type="text" 
                                        onChange={this.handelChange.bind(this)}
                                        name = "productName"
                                        value={productName}
                                        />
                                    </div>
                            
                                <div className="input_info">
                                    <span>商品库存:</span>
                                    <input 
                                    type="text" 
                                    value={Stock}
                                    onChange={this.handelChange.bind(this)}
                                    name="Stock"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>商品价格:</span>
                                    <input 
                                    type="text" 
                                    value={Price}
                                    onChange={this.handelChange.bind(this)}
                                    name = "Price"
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
                                        <option value="正常">正常</option>
                                        <option value="隐藏">隐藏</option>
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
                                        <span>产品编号:</span>
                                        <input 
                                        type="text" 
                                        value={number}
                                        onChange={this.handelChange.bind(this)}
                                        name="number"
                                        />
                                    </div>
                                    <div className="input_info">
                                        <span>分类名称:</span>
                                        <select 
                                        value={fenlei}
                                        onChange={this.handelChange.bind(this)}
                                        name="fenlei"
                                        
                                        >
                                            < option value = "请选择" > 请选择 </option>
                                            < option value = "所有分类" > 所有分类 </option>
                                            <option value="水果">水果</option>
                                            <option value="香水">香水</option>
                                        </select>
                                
                                    </div>
                                    <div className="input_info">
                                        <span>产品名称:</span>
                                        <input 
                                        type="text" 
                                        onChange={this.handelChange.bind(this)}
                                        name = "productName"
                                        value={productName}
                                        />
                                    </div>
                            
                                <div className="input_info">
                                    <span>商品库存:</span>
                                    <input 
                                    type="text" 
                                    value={Stock}
                                    onChange={this.handelChange.bind(this)}
                                    name="Stock"
                                    />
                                </div>
                                <div className="input_info">
                                    <span>商品价格:</span>
                                    <input 
                                    type="text" 
                                    value={Price}
                                    onChange={this.handelChange.bind(this)}
                                    name = "Price"
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
                                        <option value="正常">正常</option>
                                        <option value="隐藏">隐藏</option>
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
        data: state.reducer.content,
        count: state.reducer.page,

    };
    console.log(state)
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(ProductList))