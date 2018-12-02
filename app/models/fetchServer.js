import axios from 'axios';
import querystring from 'querystring';

export default function *({put, select}) {
    const {page, pagesize, sortby, sortdirection, filters} = 
    yield select(({stafflistModel}) => stafflistModel);
    const queryParams = {
        page, 
        pagesize,
        sortby,
        sortdirection
    }

    // 遍历filters, 变为k=v
    filters.forEach(item => {
        queryParams[item.k] = item.v;
    }); 

    const  {results, total} = yield axios.get("/api/staffs?" + querystring.stringify(queryParams)).then(data => data.data)
   
    yield put({"type" : "changeResults", results})
    yield put({"type" : "changeTotal", total})

}