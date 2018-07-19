const GETODDAD = 'GETODDAD'//
const PAGEADMINI = 'PAGEADMINI'//
const FINDADMINI = 'FINDADMINI'//查询
const PAGEFIND = 'PAGEFIND' //查询的页码


export function getoddAd(data) {
    return {
        type: GETODDAD,
        data: data
    }
}
//管理员表总页数
export function pageAdmini(num) {
    return {
        type: PAGEADMINI,
        num
    }
}
//查询用总页数
export function pageFind(num) {
    return {
        type: PAGEFIND,
        num
    }
}



//查询管理员列表
export function findAdmini(data) {
    return {
        type: FINDADMINI,
        data: data
    }
}

//添加管理员
export const creatAdmini = (records) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/admini?act=add' + records)
            .then(e => e.json())
            .then(e => {
                console.log(e);

            })

    };
};
// 页码
export const pagecountAdmini = () => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/admini?act=get_page_count').then(e => e.json())
            .then(e => {

                dispatch(pageAdmini(e.count))
            })
    };
};


//thunk   请求单页订单数据
export const oddAdmini = (num) => {
    return dispatch => {
        fetch("http://127.0.0.1:88/api/admini?act=get&page=" + num)
            .then(e => e.json())
            .then(e => {
                // console.log(e)
                // if (!e.length) {
                //     fetch("http://127.0.0.1:88/api/order?act=get&page=" + (num - 1))
                //         .then(e => e.json())
                //         .then(e => {
                //             dispatch(getoddAd(e))
                //         })
                // } else {
                //     dispatch(getoddAd(e))
                // }
                dispatch(getoddAd(e))
            })

    };
};



//请求查询时的页码总数
export const findpagecountA = (fenlei, name) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/admini?act=get_find_count&name=' + name + '&status=' + fenlei).then(e => e.json())
            .then(e => {
                dispatch(pageFind(e.count))
            })
    };
};
// 查询 
export const findAd = (name, num, fenlei) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/admini?act=findName&name=' + name + '&status=' + fenlei + '&num=' + num).then(e => e.json())

            .then(e => {
                dispatch(findAdmini(e))
            })
    }
}
//删除数据  产品列表
export const delAd = (id) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/admini?act=del&id=' + id).then(e => e.json())
            .then(e => {
                console.log(e);

            })

    };
};
//批量删除  产品列表
export const delallAd = (ids) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/admini?act=delAll&all=' + ids).then(e => e.json())
            .then(e => {
                console.log(e);

            })

    };
};
//修改数据  编辑
export const updateMem = (e) => {
    console.log(e);
    return dispatch => {
        fetch('http://127.0.0.1:88/api/admini/update', {
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