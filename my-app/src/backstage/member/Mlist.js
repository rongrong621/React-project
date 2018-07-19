import React, { Component } from 'react';
import *as actionCreators from '../action/memAction.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Mlist extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
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
       console.log('删除')
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
        // console.log(e)
        return (
            <tr>
                <td >
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
                <td>{e.userName}</td>
                <td>{e.sex}</td>
                <td>{e.mobile}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.grade}</td>
                <td>
                    <i className="iconfont icon-yuandianxiao dian"></i>
                    <span>{e.status}</span>
                </td>
                <td>
                   <a 
                   title="编辑" 
                   href="javascript:;" 
                   className="blue"
                   onClick={this.bjclick.bind(this,e)}
                   ><i className="iconfont icon-bianji"></i></a>
                    <a 
                    title="删除" 
                    href="javascript:;" 
                    className="yellow"
                    onClick={this.del.bind(this,e,data)}
                    ><i className="iconfont icon-shanchu1"></i>
                    </a>
                </td>
            </tr>
        );
    }
}

export default connect((state) => {
    return { data: state.reducer2.content };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(Mlist) 