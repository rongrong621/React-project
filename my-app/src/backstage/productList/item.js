import React, { Component } from 'react';
import *as actionCreators from '../action/action.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }
    // 单选按钮
    change=(e)=>{
        let {data,onOff,allOnoff}=this.props;
        console.log(onOff)
        e.checked=!e.checked;
       this.setState(data)
       onOff =data.every(e => e.checked = e.checked);
       allOnoff(onOff)
        
        
    }

    // 删除按钮
    del=(e)=>{
        console.log(e)//所有数据
       let {deltan} = this.props
        deltan(e)
    }

    // 编辑按钮
    bjclick=(e)=>{
        let {edit} = this.props
        edit(e)
    }

    render() {
        let { data, e, i, nowpage}=this.props;
        let d = new Date();
        d.setTime(d.getTime(e.time))
        let time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        return (
             <tr>
                <td>
                    <label>
                        <input 
                        type="checkbox" 
                        className="ace" 
                        onChange={this.change.bind(this, e)}
                        checked={e.checked}
                        />
                        <span className="lbl"></span>
                    </label>
                </td>

                <td>{e.number}</td>
                <td>{e.fenlei}</td>
                <td>{e.productName} </td>
                <td>{e.Stock}</td>
                <td>{e.Price}</td>
                <td>{time}</td>
                <td>{e.status}</td>
                
                <td>
                    <a 
                    title="编辑"
                     className="blue"
                     onClick={this.bjclick.bind(this,e)}
                     ><i className="iconfont icon-bianji"></i></a>
                    <a 
                    title="删除" 
                   className="yellow"
                    onClick={this.del.bind(this,e,data)}
                    ><i className="iconfont icon-shanchu1"></i></a>
                </td>
            </tr> 
        );
    }
}

export default connect((state) => {
    return { data: state.reducer.content };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Item) 