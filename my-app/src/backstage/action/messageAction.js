
const MESSAGE = 'MESSAGE' //请求单页订单数据
const MESSAGEP = 'MESSAGEP' //订单页码
const FINDMESS = 'FINDMESS' //查询用
const PAGEMESS = 'PAGEMESS'//查询的页码

export function messageP(num) {
    return {
        type: MESSAGEP,
        num
    }
}
//单页留言
export function getMess(data) {
    return {
        type: MESSAGE,
        data: data
    }
}

//查询留言 
export function findMess(data) {
    return {
        type: FINDMESS,
        data: data
    }
}
//留言总页数
export function pageMESS(num) {
    return {
        type: PAGEMESS,
        num
    }
}

//thunk   请求单页留言数据
export const oddMess = (num) => {
    return dispatch => {
        fetch("http://127.0.0.1:88/api/message?act=get&page=" + num)
            .then(e => e.json())
            .then(e => {
                // if (!e.length) {
                //     fetch("http://127.0.0.1:88/api/message?act=get&page=" + (num - 1))
                //         .then(e => e.json())
                //         .then(e => {
                //             dispatch(getMess(e))
                //         })
                // } else {
                //     dispatch(getMess(e))
                // }
                dispatch(getMess(e))

            })

    };
};

//请求留言页码数量

export const messagePage = () => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/message?act=get_page_count').then(e => e.json())
            .then(e => {
               dispatch(messageP(e.count))
            })
    };
};


//删除留言数据
export const delMessage = (id) => {
    return dispatch => {

        fetch('http://127.0.0.1:88/api/message?act=del&id=' + id).then(e => e.json())
            .then(e => {
                console.log(e.count);

            })

    };
};
//批量删除留言数据
export const delallMess = (ids) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/message?act=delAll&all=' + ids).then(e => e.json())
            .then(e => {
                console.log(e);

            })

    };
};

// 查询留言的各类  name=
export const findMessage= (name, num, fenlei) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/message?act=findName&name=' + name + '&status=' + fenlei + '&num=' + num).then(e => e.json())

            .then(e => {
                dispatch(findMess(e))
            })
    }
}

//请求查询留言时的页码总数
export const findpageMess = (fenlei, name) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/message?act=get_find_count&name=' + name + '&status=' + fenlei).then(e => e.json())
            .then(e => {
                dispatch(pageMESS(e.count))
            })
    };
};