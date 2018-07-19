import React, { Component } from 'react';
import *as actionCreators from '../action/action.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from  'react-router-dom';
class OrderList extends Component {
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
       let {deltan} = this.props
        deltan(e)
        
    }
    clickNone=()=>{
        let {fn,e}=this.props;

        let tabBox=document.getElementById('tabBox');
        tabBox.style.display='block'
        fn(e)
    }

    

    render() {
        let { data, e, i, nowpage}=this.props;
        
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

                <td>{e.orderNumber}</td>
                <td>{e.productName}</td>
                <td>{e.total}</td>
                <td>{e.discount}</td>
                <td>{e.money}</td>
                <td>{e.type}</td>
                <td>{e.number1}</td>
                <td>{e.status}</td>
                <td>
                    <a
                        className="blue"
                        onClick={this.clickNone}
                        ><i className="iconfont icon-icon-chakanxq"></i>
                    </a>
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
    return { data: state.reducer1.content };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(OrderList)