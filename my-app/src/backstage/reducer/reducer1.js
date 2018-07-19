import {combineReducers} from 'redux';



// 产品列表
const reducer = (state = {content: [],page: 0}, action) => {
    switch (action.type) {
        // 添加使用的方法
        case 'GETODD':
            let newobj = Object.assign({}, state)

            newobj.content = action.data
           return newobj




        // 请求页码使用   
        case 'PAGE':
        
            let newobj2 = JSON.parse(JSON.stringify(state))
             newobj2.page = action.num;

            return newobj2
        // 查询使用
        case 'FIND':
        let newobj3=Object.assign({},state)
        newobj3.content=[...action.data]//因为content是数组   往里面添加的是数组  所以要用扩张运算符
            return newobj3

        default:
            return state
    }
}

// 订单使用
const reducer1 = (state = {content: [],page: 0}, action) => {
    switch (action.type) {
        // 请求单页订单方法
        case 'ORDER':
            let orderobj = Object.assign({}, state)
            orderobj.content = action.data
           return orderobj
        // 请求页码使用   
        case 'ORDERP':
            let orderobj2 = JSON.parse(JSON.stringify(state))
            orderobj2.page = action.num;

            return orderobj2
        // 查询使用
        case 'FINDO':
        let orderobj3 = Object.assign({}, state)
        orderobj3.content = [...action.data] //因为content是数组   往里面添加的是数组  所以要用扩张运算符
            return orderobj3
        //查询订单 的页码
        case 'PAGEO':
        let orderobj4 = Object.assign({}, state)
        orderobj4.page = action.num;
         return orderobj4
        default:
            return state
    }
}

// 会员使用
const reducer2 = (state = {content: [],page: 0}, action) => {
    switch (action.type) {
        // 添加使用的方法
        case 'GETODDMEM':
            let memberobj = Object.assign({}, state)
            memberobj.content = action.data
           return memberobj
        // 请求页码使用   
        case 'PAGEMEM':
            
            let memberobj2 = Object.assign({}, state)
            console.log(memberobj2)
            memberobj2.page = action.num;

            return memberobj2
        // 查询使用
        case 'FINDMEM':
        let memberobj3 = Object.assign({}, state)
        memberobj3.content = [...action.data] //因为content是数组   往里面添加的是数组  所以要用扩张运算符
            return memberobj3
        // 查询订单 的页码
        case 'PAGEMEM':
        let memberobj4 = Object.assign({}, state)
        memberobj4.page = action.num;
         return memberobj4
        default:
            return state
    }
}

// 留言使用
const reducer3 = (state = {content: [],page: 0}, action) => {
    switch (action.type) {
        // 添加使用的方法
        case 'MESSAGE':
            let messageobj = Object.assign({}, state)
            messageobj.content = action.data
           return messageobj
        // 请求页码使用   
        case 'MESSAGEP':
            let messageobj2 = JSON.parse(JSON.stringify(state))
            messageobj2.page = action.num;

            return messageobj2
        // 查询使用
        case 'FINDMESS':
        let messageobj3 = Object.assign({}, state)
        messageobj3.content = [...action.data] //因为content是数组   往里面添加的是数组  所以要用扩张运算符
            return messageobj3
        // 查询订单 的页码
        case 'PAGEMESS':
        let messageobj4 = Object.assign({}, state)
        messageobj4.page = action.num;
         return messageobj4
        default:
            return state
    }
}

// 管理员使用
const reducer4 = (state = {content: [],page: 0}, action) => {
    switch (action.type) {
        // 添加使用的方法
        case 'GETODDAD':
            let adminiobj = Object.assign({}, state)
            adminiobj.content = action.data
            console.log(adminiobj)
           return adminiobj
        // 请求页码使用   
        case 'PAGEADMINI':
            console.log(state)
            let adminiobj2 = JSON.parse(JSON.stringify(state))
            adminiobj2.page = action.num;

            return adminiobj2
        // 查询使用
        case 'FINDADMINI':
        let adminiobj3 = Object.assign({}, state)
        adminiobj3.content = [...action.data] //因为content是数组   往里面添加的是数组  所以要用扩张运算符
            return adminiobj3
        // 查询订单 的页码
        case 'PAGEFIND':
        let adminiobj4 = Object.assign({}, state)
        adminiobj4.page = action.num;
         return adminiobj4
        default:
            return state
    }
}
const reducers = combineReducers({
    reducer,
    reducer1,
    reducer2,
    reducer3,
    reducer4
});
export {reducers};
