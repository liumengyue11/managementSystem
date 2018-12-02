import React, { Component } from 'react';
import { connect } from 'dva';
import axios from 'axios';

import { Form, Input, Radio, DatePicker, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

export class Step1 extends Component {
  constructor(){
      super();
      this.state = {
          careType : "身份证"
      }
  }
//   验证表单是否合法
  checkFormValidate(errorObj , valueObj , rulesObj){
    console.log(errorObj , valueObj)
    for(let k in errorObj){
        if(errorObj[k] !== undefined){
            return false
        }
    }
    for(var k in valueObj){
        if(valueObj[k] == undefined){
            return false
        }
    }

    return true;
  }
  render() {
    const { getFieldDecorator, getFieldsValue, getFieldsError } = this.props.form;
    //   表单布局
    const formItemLayout = {
        // 题目占列数
        labelCol: {
          xs: { span: 6 }, //极小屏幕手机
          sm: { span: 6 },  //小屏幕手机及以上
        },
        // 输入框占列数
        wrapperCol: {
          xs: { span: 18},
          sm: { span: 18 },
        },
      }
     
    return (
      <div>
        <Form>
            <FormItem
                {...formItemLayout}
                label="id"
            >
                {getFieldDecorator('id', {
                    rules: [ 
                    { required: true, message: '必须填写ID！'},
                    
                    {
                        pattern: /^[0-9]*$/ ,
                        message: "请填写正确的ID",
                        // 自定义校验
                        async validator(rule, value, callback){
                            const {result} = await axios.get("/api/checkid?id=" + value).then(data => data.data);
                            if(result){
                                callback("此ID已存在！");
                            }else{
                                callback();
                            }
                        }
                    }
                    ],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="姓名"
            >
                {getFieldDecorator('name', {
                    rules: [
                        {
                            required: true, message: '必须填写姓名！',
                        },
                        {
                            pattern:  /^[\u4E00-\u9FA5A-Za-z]+$/ ,
                            message: "请填写正确的姓名!"
                        }
                    ],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="性别"
            >
                {getFieldDecorator('sex', {
                    rules: [
                        {
                            required: true, message: '必须填写性别！',
                        },
                        
                    ],
                })(
                    <RadioGroup>
                        <Radio value="男">男</Radio>
                        <Radio value="女">女</Radio>
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="学历"
            >
                {getFieldDecorator('education', {
                    rules: [
                        {
                            required: true, message: '请选择学历！',
                        },
                        
                    ],
                })(
                    <Select style={{ width: 120 }}>
                        {["小学", "初中", "高中", "大学"].map(item => {
                             return <Option value= {item} key = {item}>{item}</Option>
                        })}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="部门"
            >
                {getFieldDecorator('department', {
                    rules: [
                        {
                            required: true, message: '请选择部门！',
                        },
                        
                    ],
                })(
                    <Select style={{ width: 120 }}>
                        {["研发部", "销售部", "设计部", "运营部", "产品部", "人事部"].map(item => {
                             return <Option value= {item} key = {item}>{item}</Option>
                        })}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="职位"
            >
                {getFieldDecorator('title', {
                    rules: [
                        {
                            required: true, message: '请选择职位！',
                        },
                        
                    ],
                })(
                    <Select style={{ width: 120 }}>
                        {["总监", "经理", "主管", "员工"].map(item => {
                             return <Option value= {item} key = {item}>{item}</Option>
                        })}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="血型"
            >
                {getFieldDecorator('blood', {
                    rules: [
                        {
                            required: true, message: '请选择血型！',
                        },
                        
                    ],
                })(
                    <Select style={{ width: 120 }}>
                        { ["A", "B", "AB", "O", "R"].map(item => {
                             return <Option value= {item} key = {item}>{item}</Option>
                        })}
                    </Select>
                )}
            </FormItem>
            
            <FormItem
                {...formItemLayout}
                label="生日"
            >
                {getFieldDecorator('birthday', {
                    rules: [
                        {
                            required: true, message: '请选择生日！',
                        },
                    ],
                })(
                    <DatePicker />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="入职时间"
            >
                {getFieldDecorator('hiredate', {
                    rules: [
                        {
                            required: true, message: '请选择入职时间！',
                        },
                    ],
                })(
                    <DatePicker />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="是否结婚"
            >
                {getFieldDecorator('marriage', {
                    rules: [
                        {
                            required: true, message: '必须填写！',
                        },
                    ],
                })(
                    <Select style={{ width: 120 }}>
                        {["是", "否"].map(item => {
                             return <Option value= {item} key = {item}>{item}</Option>
                        })}
                    </Select> 
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="是否党员"
            >
                {getFieldDecorator('partyMember', {
                    rules: [
                        {
                            required: true, message: '必须填写！',
                        },
                    ],
                })(
                    <Select style={{ width: 120 }}>
                        {["是", "否"].map(item => {
                             return <Option value= {item} key = {item}>{item}</Option>
                        })}
                    </Select> 
                )}
            </FormItem>
            
            <FormItem
                {...formItemLayout}
                label="证件类型"
            >
                {getFieldDecorator('cardType', {
                    rules: [
                        {
                            required: true, message: '请选择证件类型！',
                        },
                    ],
                })(
                    <Select style={{ width: 120 }} onChange = {(e) => {
                        this.setState({careType : e})
                    }}>
                        { ["身份证", "护照", "军官证"].map(item => {
                            return <Option value= {item} key = {item}>{item}</Option>
                        })}
                     </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="证件号码"
            >
                {getFieldDecorator('idcard', {
                    rules: [
                        
                        {
                            validator: (rule, value, callback) => {
                                if(this.state.careType == "身份证"){
                                    if(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)){
                                        callback();
                                    }else{
                                        callback("请输入正确的身份证号码！")
                                    }
                                }else  if(this.state.careType == "军官证"){
                                    if(/[\u4e00-\u9fa5](字第){1}(\d{4,8})(号?)$/.test(value)){
                                        callback();
                                    }else{
                                        callback("请输入正确的军官证号码！")
                                    }
                                }else  if(this.state.careType == "护照"){
                                    if(/^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/.test(value)){
                                        callback();
                                    }else{
                                        callback("请输入正确的护照号码！")
                                    }
                                }
                            }
                        }
                    ],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="家乡"
            >
                {getFieldDecorator('nativePlace', {
                    rules: [
                        {
                            required: true, message: '必须填写家乡！',
                        },
                    ],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="手机号码"
            >
                {getFieldDecorator('mobile', {
                    rules: [
                        {
                            required: true, message: '必须填写！',
                        },
                        {
                            pattern:  /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/ ,
                            message: "请填写正确的手机号码!"
                        }
                    ],
                })(
                   <Input />
                )}
            </FormItem>
            <FormItem  wrapperCol = {{ span: 16, offset: 8}}>
                <Button 
                type="primary" 
                htmlType="submit"
                disabled = {!this.checkFormValidate(getFieldsError(), getFieldsValue())}
                onClick = {() =>{
                    // 改变moment对象
                    var step1Form = {
                        ...getFieldsValue(),
                        hiredate : getFieldsValue().hiredate.unix() * 1000,
                        birthday : getFieldsValue().birthday.unix() * 1000
                    }
                    this.props.dispatch({"type" : "addStaffModel/tijiaoForm1", step1Form})
                }}
                >确定</Button>
            </FormItem>
        </Form>
      </div>
    )
  }
}


export default connect()(Form.create()(Step1));
