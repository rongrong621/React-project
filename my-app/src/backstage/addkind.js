import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import * as actionCreators from './action/action.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class AddKind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowpage:1,//当前页码
            //弹窗数据
            number: '',
            productName: '',
            checked: '',
            id: "",
            ids: '',
            Price: '',
            Stock:'',
            time: '',
            onOff:false
        };
    }

    //关闭弹窗  x 按钮
    closeClick = () => {
        let tanBox = document.getElementById('tanBox');
        tanBox.style.display = 'none';

    }
    // input框
    handelChange(event){
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ))
    }
    // 添加确认按钮
    addsure=()=>{
        let {number,productName,Price,Stock,time,onoff,}
    }
    
    render() {
        let {number,productName,checked,id,ids,Price,onOff,Stock,time}=this.state;
        return (
            <div className="tan_content" id="tanBox">
                <div className="bg"></div>
                <div className="tan_box">
                    <div className="tan_title clear">
                        <span>添加</span>
                        <a
                        onClick={this.closeClick}
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
                            onChange={this.handleChange.bind(this)}
                            name = "Price"
                            />
                        </div>
                        <div className="input_info">
                            <span>加入时间:</span>
                            <input 
                            type="text"
                            value={time}
                            onChange={this.handleChange.bind(this)}
                            name="time"
                            />
                        </div>
                        <div className="btn_sure">
                            <a
                                onClick={this.addsure.bind(this)}
                                className="sure">确定</a>
                            <a 
                            className="replay"
                            onClick={this.reset}
                            >重置</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddKind;