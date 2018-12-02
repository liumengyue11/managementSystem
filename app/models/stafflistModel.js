import * as R from 'ramda';
import fetchServer from './fetchServer.js';
export default {
    namespace : 'stafflistModel',
    state : {
        page : 1,
        pagesize : 10,
        sortby : "id",
        sortdirection : 1,
        filters : [],
        keyword : [],
        results : [],        //服务器返回的结果
        total : 0 ,          //服务器返回的数量结果总数
        // 当前表格列
        cols: ["id", "name", "sex", "birthday"]
    },
    reducers : {
        changeResults(state,{results}){
            return R.set(R.lensProp("results"),results ,state)
        },
        changeTotal(state,{total}){
            return R.set(R.lensProp('total'), total ,state);
        },
        changePage(state,{page}){
            return R.set(R.lensProp('page'), page ,state);
        },
        changePagesize(state,{pagesize}){
            return R.set(R.lensProp('pagesize'), pagesize ,state);
        },
        changeSortby(state,{sortby}){
            return R.set(R.lensProp('sortby'), sortby ,state);
        },
        changeColsSync(state, {cols}){
            return R.set(R.lensProp("cols"),cols ,state)
        },
        changeSortdirection(state,{sortdirection}){
            return R.set(R.lensProp('sortdirection'), sortdirection ,state);
        },
        addFilters(state, {k, v}){
            return R.set(R.lensProp('filters'), R.append({k, v}, state.filters), state)
        },
        delFilters(state, {k}){
            return R.set(R.lensProp('filters'), R.filter(item => item.k != k, state.filters), state)
        },
        updateFilter(state, {k, v}){
            return R.set(R.lensProp('filters'), R.map(item => item.k == k ? R.set(R.lensProp('v'), v, item) : item, state.filters), state)
        }
    },
    effects : {
        *init(action , {put , call , select}){
            yield call(fetchServer, {put, select})
        },
        *changePageAndPagesize({page, pagesize}, {put , call , select}){
            yield put({"type" : "changePage", page});
            yield put({"type" : "changePagesize", pagesize})
            yield call(fetchServer, {put, select})
        },
        *changeSortbyAndSortdirection({sortby, sortdirection}, {put , call , select}){
            yield put({"type" : "changeSortby", sortby});
            yield put({"type" : "changeSortdirection",sortdirection});
            yield put({"type" : "changePage", "page" : 1});
            yield call(fetchServer, {put, select})
        },
        *changeFilters({k, v}, {put , call , select}){
            if(v == ""){
                yield put({"type" : "delFilters", k});
            }else{
                // 是否存在
                var isExist = false;
                // 得到filters
                const {filters} = yield select(({stafflistModel}) => stafflistModel);
                // 遍历filters
                filters.forEach(item => {
                    if(item.k == k){
                        isExist = true;
                    }
                });

                if(isExist){
                    yield put({"type" : "updateFilter", k, v});
                }else{
                    yield put({"type" : "addFilters", k, v});
                }
            }
            yield put({"type" : "changePage", "page" : 1});
            yield call(fetchServer, {put, select})
        },
        *changeCols({cols}, {put , call , select}){
            yield put({"type" : "changeColsSync", cols});
            yield call(fetchServer, {put, select})
        }
    }
}