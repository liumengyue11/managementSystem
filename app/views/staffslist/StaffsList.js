import React, { Component } from 'react';
import {connect} from 'dva';
import { Table, Pagination, Row, Col, Button  } from 'antd';

import getCols from './getCols.js';
import FilterBox from './FilterBox.js';
import TableSetupModal from './TableSetupModal.js'

class StaffList extends Component {
    constructor(props){
        super();
        props.dispatch({'type' : 'stafflistModel/init'});
        
        this.state = {
            //是否显示表格配置模态框
            isShowModal : false,
            // 表格的配置
            tabelcfg : {
                dataSource : props.results,
                pagination : false,
                rowKey : "id",
                columns :getCols(props.sortby, props.sortdirection, props.cols),
                // sorter返回JSON，order为排序方式，field为name
                onChange(pagination, filters, {order, field}){
                    props.dispatch({"type" : 'stafflistModel/changeSortbyAndSortdirection', "sortby" : field, "sortdirection" : order == "ascend" ? 1 : -1 })
                }
            },
            // 分页配置
            paginationcfg : {
                showSizeChanger : true,
                pagesize : props.pagesize,
                current : props.page,
                total : props.total,

                onChange(page, pagesize){
                    props.dispatch({"type" : 'stafflistModel/changePageAndPagesize', page,pagesize})
                },
                onShowSizeChange(page, pagesize){
                    props.dispatch({"type" : 'stafflistModel/changePageAndPagesize', "page" : 1,pagesize})
                }
            }
        }
        
    }

    showModal(){
        this.setState({
            isShowModal : true
        })
    }
    hideModal() {
        this.setState({
            isShowModal : false
        })
    }
    // 收到新的props做的事情
    componentWillReceiveProps(props){
       this.setState({

         tabelcfg : {
                ...this.state.tabelcfg,
                dataSource : props.results,
                columns :getCols(props.sortby, props.sortdirection, props.cols)
         },
         paginationcfg : {
            ...this.state.paginationcfg,
            pagesize : props.pagesize,
            current : props.page,
            total : props.total
        }
       })
    } 
   
    
    render() {console.log(this.props.results)
        return (
            
            <div>
               <FilterBox></FilterBox>
               <Row>
                   <Col span = {23}></Col>
                   <Col span = {1}>
                        <Button
                           type="primary"
                           shape="circle"
                           icon = "setting"
                           theme= "twoTone" 
                           onClick = {() => this.showModal()}
                        ></Button>
                   </Col>
               </Row>
               
               <div className="box"></div>
               <Table {...this.state.tabelcfg}/>
               <Pagination {...this.state.paginationcfg}/>
                {/* 模态框 */}
               <TableSetupModal
                    isShowModal={this.state.isShowModal}
                    showModal={this.showModal.bind(this)}
                    hideModal={this.hideModal.bind(this)}
               >
               </TableSetupModal>
            </div>
        )
    }
}

export default connect(({stafflistModel}) => ({
      results : stafflistModel.results,
      total : stafflistModel.total,
      page : stafflistModel.page,
      pagesize : stafflistModel.pagesize,
      sortby : stafflistModel.sortby,
      sortdirection : stafflistModel.sortdirection,
      cols : stafflistModel.cols
  })
)(StaffList);
