
// 产品列表 的
const DEL = 'DEL' //产品列表删除
const GET='GET'//产品列表   
const GETODD = 'GETODD'//产品类表   请求单页数据
const ADD = 'ADD'//产品列表  添加
const PAGE = 'PAGE'
const FIND = 'FIND' //产品列表查询

// 订单管理的
const ORDER = 'ORDER'//请求单页订单数据
const ORDERP='ORDERP'//订单页码
const FINDO='FINDO'//查询用
const PAGEO='PAGEO'
export function get(data) {
    return {
        type: GET,
        data:data
    }
}
export function Del(id) {
    return {
        type: DEL,
        id
    }
}
export function getodd(data) {
    return {
        type: GETODD,
        data: data
    }
}




//商品总页数
export function page(num) {
    return {
        type: PAGE,
        num
    }
}



//添加商品
export function add(data) {
    return {
        type: ADD,
        data: data
    }
}
//查询商品 产品列表
export function find(data) {
    return {
        type: FIND,
        data: data
    }
}








//请求页码数量

export const pagecount = () => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/commodity?act=get_page_count').then(e => e.json())
            .then(e => {  
                
                dispatch(page(e.count))
            })
    };
};




//请求查询时的页码总数
export const findpagecount = (fenlei,name) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/commodity?act=get_find_count&name='+name+'&fenlei='+fenlei).then(e => e.json())
            .then(e => {
                dispatch(page(e.count))
            })
    };
};
//thunk   请求单页商品数据
export const odd = (num) => {
    return dispatch => {
        fetch("http://127.0.0.1:88/api/commodity?act=get&page=" +num)
        .then(e=>e.json())
        .then(e=>{
            // if(!e.length){
            //     fetch("http://127.0.0.1:88/api/commodity?act=get&page=" + (num-1))
            //         .then(e => e.json())
            //         .then(e => {
            //             dispatch(getodd(e))
            //         })
            // }else{
            //     dispatch(getodd(e))
            // }
            dispatch(getodd(e))
        })

    };
};


//添加商品
export const creat = (records) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/commodity?act=add' + records)
        .then(e=>e.json())
        .then(e=>{
            console.log(e);
           
        })

    };
};
//删除数据  产品列表
export const del = (id) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/commodity?act=del&id=' + id).then(e => e.json())
            .then(e => {
                console.log(e);
                  
            })

    };
};
// 查询商品名称  name=
export const findProduct = (name, num, fenlei) => {
    return dispatch=>{
        fetch('http://127.0.0.1:88/api/commodity?act=findName&name=' + name+'&fenlei='+fenlei+'&num='+num).then(e => e.json())
        
        .then(e => {
            dispatch(find(e))
        })
    }
}

//批量删除  产品列表
export const delall = (ids) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/commodity?act=delAll&all=' + ids).then(e => e.json())
            .then(e => {
                console.log(e);

            })

    };
};

//修改数据  编辑
export const update = (e) => {
   console.log(e);
   return dispatch => {
        fetch('http://127.0.0.1:88/api/commodity/update', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams(e).toString() 
        }).then(e => e.json())
            .then(res => {
                console.log(res);
            })

    };
};



//订单总页数
export function orderp(num) {
    return {
        type: ORDERP,
        num
    }
}
 //单页订单
export function getorder(data) {
    return {
        type: ORDER,
        data: data
    }
}

//查询订单 订单管理的
export function findO(data) {
    return {
        type: FINDO,
        data: data
    }
}
//订单总页数
export function PageO(num) {
    return {
        type: PAGEO,
        num
    }
}

//thunk   请求单页订单数据
export const oddOrder = (num) => {
    return dispatch => {
        fetch("http://127.0.0.1:88/api/order?act=get&page=" + num)
            .then(e => e.json())
            .then(e => {
                // console.log(e)
                // if (!e.length) {
                //     fetch("http://127.0.0.1:88/api/order?act=get&page=" + (num - 1))
                //         .then(e => e.json())
                //         .then(e => {
                //             dispatch(getorder(e))
                //         })
                // } else {
                //     dispatch(getorder(e))
                // }
                    dispatch(getorder(e))
            })

    };
};

//请求订单页码数量

export const orderPage = () => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/order?act=get_page_count').then(e => e.json())
            .then(e => {
                dispatch(orderp(e.count))
            })
    };
};


//删除订单数据
export const delorder = (id) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/order?act=del&id=' + id).then(e => e.json())
            .then(e => {
                console.log(e.count);

            })

    };
};
//批量删除订单数据
export const delallorder = (ids) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/order?act=delAll&all=' + ids).then(e => e.json())
            .then(e => {
                console.log(e);

            })

    };
};

// 查询订单的各类  name=
export const findOrder= (name, num, fenlei) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/order?act=findName&name=' + name + '&type=' + fenlei + '&num=' + num).then(e => e.json())

            .then(e => {
                dispatch(findO(e))
            })
    }
}

//请求查询订单时的页码总数
export const findpageo = (fenlei, name) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/order?act=get_find_count&name=' + name + '&type=' + fenlei).then(e => e.json())
            .then(e => {
                dispatch(PageO(e.count))
            })
    };
};













//删除退货数据
export const delreturn = (id) => {
    console.log(id);

    return dispatch => {

        fetch('http://127.0.0.1:88/api/return?act=del&id=' + id).then(e => e.json())
            .then(e => {
                console.log(e.count);

            })

    };
};

//批量删除退货单
export const delallreturn = (ids) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/return?act=delAll&all=' + ids).then(e => e.json())
            .then(e => {
                console.log(e);

            })

    };
};
//修改退货状态数据
export const returnupdate = (e) => {
    console.log(e);

    return dispatch => {
        fetch('http://127.0.0.1:88/api/return/update', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams(e).toString()
        }).then(e => e.json())
            .then(res => {
                console.log(res);
            })

    };
};





