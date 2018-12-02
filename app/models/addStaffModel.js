import * as R from 'ramda';
import fetchServer from './fetchServer.js';
export default {
    namespace : 'addStaffModel',
    state : {
       step : 2,
       step1Form : []
    },
    reducers : {
       changeStep(state, {step}){
           return R.set(R.lensProp("step"), step, state)
       },
       changeStep1Form(state, {step1Form}){
        return R.set(R.lensProp("step1Form"), step1Form, state)
    }
    },
    effects : {
       *tijiaoForm1({step1Form}, {put}){
            yield put({"type" : "changeStep1Form", step1Form});
            yield put({"type" : "changeStep", "step" : 2})
       }
    }
}