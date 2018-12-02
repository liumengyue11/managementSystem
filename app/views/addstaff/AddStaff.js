import React, { Component } from 'react';
import { connect } from 'dva';
import { Steps, Icon } from 'antd';

import Step1 from './Step1.js';
import Step2 from './Step2.js';
// import Step3 from './Step3.js'

const Step = Steps.Step;

export class AddStaff extends Component {

  render() {
   
      const getStatus = (thisStep) =>{
          if(this.props.step  == thisStep){
              return "progress"
          }if(this.props.step  > thisStep){
            return "finish"
          }if(this.props.step  < thisStep){
            return "wait"
        }
      }
      // 显示步骤组件
      const showStepCompontents = () => {
        if(this.props.step == 1){
          return <Step1 />
        }else  if(this.props.step == 2){
          return <Step2 />
        }else  if(this.props.step == 3){
          return <Step3 />
        }
      }
    return (
      <div>
            <Steps>
                <Step status = {getStatus(1)} title="信息录入" icon = {<Icon type="user-add" theme="outlined" />} />
                <Step status = {getStatus(2)} title="上传头像" icon = {<Icon type="smile" theme="outlined" />}/>
                <Step status = {getStatus(3)} title="上传成功" icon = {<Icon type="check-circle" theme="outlined" />}/>
            </Steps>
            <div className="box"></div>
           {showStepCompontents()}
      </div>
    )
  }
}


export default connect(
    ({ addStaffModel})=>({
        step : addStaffModel.step
    })
)(AddStaff)
