import moment from "moment";
import React from 'react';

export default (sortby, sortdirection, cols) => {
  
    const getsortOrder = (key) => {
      if(sortby == key){
        if(sortdirection == 1){
          return "ascend";
        }else if(sortdirection == -1){
          return "descend";
        }
      }else{
        return ""
      }
    }
     //全部列可能
     const ALLCOLS =  [
        {
            'title': 'id',
            'dataIndex': 'id',
            'key': 'id',
            'sorter' : true,
            "sortOrder" : getsortOrder("id")
          }, {
            'title': '姓名',
            'dataIndex': 'name',
            'key': 'name',
            'sorter' : true,
            "sortOrder" : getsortOrder("name")
          }, {
            'title': '性别',
            'dataIndex': 'sex',
            'key': 'sex'
          }, {
            'title': '生日',
            'dataIndex': 'birthday',
            'key': 'birthday',
            render(text){
              return <span>{moment(text).format("YYYY-MM-DD")}</span>
            },
            'sorter' : true,
            "sortOrder" : getsortOrder("birthday")
          }, {
            'title': '部门',
            'dataIndex': 'department',
            'key': 'department'
          }, {
            'title': '入职时间',
            'dataIndex': 'hiredate',
            'key': 'hiredate',
            render(text){
              return <span>{moment(text).format("YYYY-MM-DD")}</span>
            },
            'sorter' : true,
            "sortOrder" : getsortOrder("hiredate")
          }, {
            'title': '职称',
            'dataIndex': 'title',
            'key': 'title'
          }, {
            'title': '血型',
            'dataIndex': 'blood',
            'key': 'blood'
          }, {
            'title': '学历',
            'dataIndex': 'education',
            'key': 'education'
          }, {
            'title': '家乡',
            'dataIndex': 'nativePlace',
            'key': 'nanativePlaceme'
          }, {
            'title': '身份证号码',
            'dataIndex': 'idcard',
            'key': 'idcard'
          }, {
            'title': '手机号码',
            'dataIndex': 'mobile',
            'key': 'mobile'
          }, {
            'title': '婚否',
            'dataIndex': 'marriage',
            'key': 'marriage',
            render(text){
              return <span>{text ? "是" : "否"}</span>
            }
          },  {
            'title': '党员',
            'dataIndex': 'partyMember',
            'key': 'partyMember',
            render(text){
              return <span>{text ? "是" : "否"}</span>
            }
          }
          
    ]
    // 筛选出模态框当前列
    return cols.map(item=>{
      return ALLCOLS.filter(_item=>_item.key == item)[0];
  });
}