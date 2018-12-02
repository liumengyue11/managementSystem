import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import {DraggableAreasGroup} from 'react-draggable-tags';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

//备选项
const ALLTAGS = [
    { "id": "blood", "title": "血型" },
    { "id": "marriage", "title": "是否结婚" },
    { "id": "partyMember", "title": "是否党员" },
    { "id": "nativePlace", "title": "家乡" },
    { "id": "id", "title": "id" },
    { "id": "name", "title": "姓名" },
    { "id": "sex", "title": "性别" },
    { "id": "birthday", "title": "生日" },
    { "id": "department", "title": "部门" },
    { "id": "hiredate", "title": "入职时间" },
    { "id": "title", "title": "职称" },
    { "id": "idcard", "title": "身份证号码" },
    { "id": "mobile", "title": "手机" },
    { "id": "education", "title": "学历" }
];

export class TableSetupModal extends Component {
  constructor(){
      super();
      
 } 
  componentWillReceiveProps(props){
      this.initialTags1 = [];
      this.initialTags2 = [];
      
      ALLTAGS.forEach(item =>{
          if(props.cols.includes(item.id)){
            this.initialTags2.push(item);
          }else{
            this.initialTags1.push(item);
          }
      })
  }

  render() {
    var chooseArr = [];
    return (
      <div>
             <Modal
             title="自定义列表"
             width = {800}
             visible={this.props.isShowModal}
             onCancel={() => this.props.hideModal()}
             onOk = {() => {
                 this.props.dispatch({"type" : "stafflistModel/changeCols", "cols" : chooseArr}),
                 this.props.hideModal()
             }}
             >

            <div className="square left">
                <h3>备选项：</h3>
                <DraggableArea1
                    initialTags={this.initialTags1}
                    render={({tag }) => (
                    <div className="tag">
                        {tag.title}
                    </div>
                    )}
                 />
            </div>
            <div className="square right">
                <h3>当前列表项：</h3>
                <DraggableArea2
                    initialTags={this.initialTags2}
                    render={({tag }) => (
                    <div className="tag">
                        {tag.title}
                    </div>
                    )}
                    onChange={(arr) => chooseArr = arr.map(item => item.id)}
            />
            </div>
         </Modal>
      </div>
    )
  }
}

export default connect(
    ({stafflistModel}) =>({
        cols : stafflistModel.cols
    })
)(TableSetupModal)
