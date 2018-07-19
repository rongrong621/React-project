import React, { Component } from 'react';
import *as actionCreators from '../action/adminiAction.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class AdmList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            time:''
         };
    }
    // 单选按钮
    change=(e)=>{
        let {data,onOff,allOnoff}=this.props;
        e.checked=!e.checked;
       this.setState(data)
       onOff =data.every(e => e.checked = e.checked);
       allOnoff(onOff)
    }
     // 删除按钮
    del=(e)=>{
        // console.log(e)//所有数据
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
        let time=e.time;
        let d = new Date(time*1);
        d.setTime(d.getTime(time))
        let time1 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+'  '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds() 
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
                <td>{e.loginName}</td>
                <td>{e.mobile}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>{time1}</td>
                <td>
                    <i className="iconfont icon-yuandianxiao dian"></i>
                    <span>{e.status}</span>
                </td>
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
    return { data: state.reducer4.content };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(AdmList)
