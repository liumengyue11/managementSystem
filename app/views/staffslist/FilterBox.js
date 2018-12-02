import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Radio, Row, Col, Checkbox, DatePicker, Select, Tag } from 'antd';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;

export class FilterBox extends Component {
    constructor(props){
      super();

      this.state = {
        "item" : [
          {
            "name" : "性别",
            "key" : "sex",
            "options" : ["男", "女"],
            "type" : "SINGLEOPTION"
          },
          {
            "name" : "学历",
            "key" : "education",
            "options" : ["小学", "初中", "高中", "大学"],
            "type" : "MUTIPLEOPTION"
          },
          {
            "name" : "血型",
            "key" : "blood",
            "options" : ["A", "B", "AB", "O", "R"],
            "type" : "MUTIPLEOPTION"
          },
          {
            "name" : "职位",
            "key" : "title",
            "options" :  ["总监", "经理", "主管", "员工"],
            "type" : "MUTIPLEOPTION"
          },
          {
            "name" : "入职时间",
            "key" : "hiredate",
            "type" : "TIMESPAN"
          },
          {
            "name" : "生日",
            "key" : "birthday",
            "type" : "TIMESPAN"
          },
          {
            "name" : "是否结婚",
            "key" : "marriage",
            "type" : "BOOLEANCHOOSE"
          },
          {
            "name" : "是否党员",
            "key" : "partyMember",
            "type" : "BOOLEANCHOOSE"
          }
        ]
      }
    }
  
    getVbyK(key){
      const item = this.props.filters.filter(item => item.k == key)[0];
      if(item){
        return item.v;
      }else{
        return "";
      }
    }

  showJSX(JSONITEM){
    if(JSONITEM.type == "SINGLEOPTION"){
      return  <RadioGroup 
              value = {this.getVbyK(JSONITEM.key)} 
              onChange = {(e) => this.props.dispatch({"type" : "stafflistModel/changeFilters", "k" : JSONITEM.key, "v" : e.target.value})}>
                {JSONITEM.options.map(item => <Radio key = {item} value={item}>{item}</Radio>)}
              </RadioGroup>
    }else if(JSONITEM.type == "MUTIPLEOPTION"){
      return <CheckboxGroup 
              options={JSONITEM.options.map(item => ({"label": item, "value": item }))} 
              value={this.getVbyK(JSONITEM.key).split("v")} 
              onChange = {(v) => this.props.dispatch({"type" : "stafflistModel/changeFilters", "k" : JSONITEM.key, "v" : v.join("v")})}
              />
    }else if(JSONITEM.type == "TIMESPAN"){
      var arr = this.getVbyK(JSONITEM.key).split("to").map(item => Number(item));
      if(arr.length == 2){
        var v = [moment(arr[0]), moment(arr[1])];
      }else{
        var v = [];
      }

      return  <RangePicker 
              value = {v}
              onChange={(a) =>{
                let vv = a.map(item => item.unix() * 1000);
                this.props.dispatch({"type" : "stafflistModel/changeFilters", "k" : JSONITEM.key, "v" : vv.join("to")})
              }} />
              

    }else if(JSONITEM.type == "BOOLEANCHOOSE"){
      return  <Select value = {this.getVbyK(JSONITEM.key)}
                      style={{ width: 120 }} 
                      allowClear = {true}
                      onChange={(v)=>this.props.dispatch({"type" : "stafflistModel/changeFilters", "k" : JSONITEM.key, v})}>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
    }
  }

  showTags(){
    return this.props.filters.map(item => {
      var _name, _value;
      this.state.item.forEach(_item =>{
        // 遍历item，看哪项key与filters中的key一致
        if(_item.key == item.k){
          _name = _item.name;
          console.log(_name)

          if(_item.type == "SINGLEOPTION"){
            _value = item.v;
          }else if(_item.type == "MUTIPLEOPTION"){
            _value = item.v.split("").filter(item => item != "v");

            console.log(_value)
          }else if(_item.type == "TIMESPAN"){
            _value = item.v.split("to").map(__item => {
              return moment(Number(__item)).format("YYYY年MM月DD日")}).join("到");
          }else if(_item.type == "BOOLEANCHOOSE"){
            _value = item == "1" ? "是" : "否";
          }
        }
      });
      return <Tag closable
                  key = {item.k}
                  onClose = {(e) => {
                      this.props.dispatch({"type" : "stafflistModel/changeFilters", "k" : item.k, "v" : ""})
                  }}
            >{_name} : {_value}</Tag>
    })
  }

  render() {
    return (
      <div>
        {this.state.item.map(item =>{
          return  <Row key = {item.key}>
                    <Col span={2}>{item.name}</Col>
                    <Col span={22}>{this.showJSX(item)}</Col>
                  </Row>
            }
        )}
        <Row>
            <Col span={2}>当前：</Col>
            <Col span={22}>{this.showTags()}</Col>
        </Row>
      </div>
    )
  }
}


export default connect(
  ({stafflistModel}) => ({
    filters : stafflistModel.filters
  })
)(FilterBox)
