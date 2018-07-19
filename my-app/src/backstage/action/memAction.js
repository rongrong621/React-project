const DELMEM = 'DELMEM' 
const GETMEM = 'GETMEM'   
const GETODDMEM = 'GETODDMEM'
const ADDMEM = 'ADDMEM' 
const PAGEMEM = 'PAGEMEM'
const FINDMEM = 'FINDMEM' 


export function get1(data) {
    return {
        type: GETMEM,
        data: data
    }
}
export function Del1(id) {
    return {
        type: DELMEM,
        id
    }
}
export function getoddMem(data) {
    return {
        type: GETODDMEM,
        data: data
    }
}
//会员表总页数
export function pageMem(num) {
    return {
        type: PAGEMEM,
        num
    }
}



//添加会员
export function add1(data) {
    return {
        type: ADDMEM,
        data: data
    }
}
//查询会员列表
export function findMem(data) {
    return {
        type: FINDMEM,
        data: data
    }
}

//添加会员
export const creatMem = (records) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=add' + records)
        .then(e=>e.json())
        .then(e=>{
            console.log(e);
           
        })

    };
};
// 页码
export const pagecountMem = () => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/member?act=get_page_count').then(e => e.json())
            .then(e => {

                dispatch(pageMem(e.count))
            })
    };
};

//thunk   请求单页会员数据
export const oddMem = (num) => {
    return dispatch => {
        fetch("http://127.0.0.1:88/api/member?act=get&page=" + num)
            .then(e => e.json())
            .then(e => {
                // console.log(e)
                // if (!e.length) {
                //     fetch("http://127.0.0.1:88/api/member?act=get&page=" + (num - 1))
                //         .then(e => e.json())
                //         .then(e => {
                //             dispatch(getoddMem(e))
                //         })
                // } else {
                //     dispatch(getoddMem(e))
                //     console.log(e)
                // }
                dispatch(getoddMem(e))
            })

    };
};

//请求查询时的页码总数
export const findpagecountM = (fenlei, name) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=get_find_count&name=' + name + '&grade=' + fenlei).then(e => e.json())
            .then(e => {
                dispatch(pageMem(e.count))
            })
    };
};
// 查询商品名称  name=
export const findProductM = (name, num, fenlei) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=findName&name=' + name + '&grade=' + fenlei + '&num=' + num).then(e => e.json())

            .then(e => {
                dispatch(findMem(e))
            })
    }
}
//删除数据  产品列表
export const delMem = (id) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=del&id=' + id).then(e => e.json())
            .then(e => {
                console.log(e);

            })

    };
};
//批量删除  产品列表
export const delallMem = (ids) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=delAll&all=' + ids).then(e => e.json())
            .then(e => {
                console.log(e);

            })

    };
};
//修改数据  编辑
export const updateMem = (e) => {
    console.log(e);
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member/update', {
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
