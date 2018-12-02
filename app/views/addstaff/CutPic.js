import React, { Component } from 'react';
import { connect } from 'dva';
import { Button} from "antd";


export class CutPic extends Component {
    constructor(props){
        super();
        this.state = {
            // 图片最大宽高
            maxW : 800,
            maxH : 500,
            // 切片宽高
            cutW : 100,
            cutH : 100,
            // 切片位置
            cutX : 0,
            cutY : 0,
            // 图片宽高
            picW : 0,
            picH : 0 
        }
    }

    componentDidMount(){
        console.log(this)
        var self = this;
        $(this.refs.cut).draggable({
            containment: "parent",
            drag: function( event, ui ) {
                const {left, top} = ui.position;
                self.setState({
                    
                })
            }

        })
        // 图片在显示框中的比例
        if(this.props.width / this.props.height < this.state.maxW / this.state.maxH){
            // 高超了
            if(this.props.height > this.state.maxH){
                this.setState({
                    picH : this.state.maxH,
                    picW : this.props.width * (this.state.maxH / this.props.height)
                })
            }else{
                this.setState({
                    picH : this.props.height,
                    picW : this.props.width 
                })
            }
        }else{
            // 宽超了
            if(this.props.width > this.state.maxW){
                this.setState({
                    picW : this.state.maxW,
                    picH : this.props.height * (this.state.maxW / this.props.width)
                })
            }else{
                this.setState({
                    picH : this.props.height,
                    picW : this.props.width 
                })
            }
        }
    }
     

    render() {
        return (
            <div>
                <div style = {{"width" : "100%","height" : this.state.picH}}>
                    {/* 大盒子 */}
                    <div 
                        className = "bigbox"
                        style = {{
                            "float" : "left",
                            "border": "2px solid yellowgreen",
                            "position" : "relative",
                    }}
                    >
                        {/* 图片 */}
                        <img
                            style = {{"width" : this.state.picW, "height" : this.state.picH}}
                            src = {"http://127.0.0.1:3000/uploads/" + this.props.picurl}/>
                        {/* 裁切框 */}
                        <div 
                            ref = "cut"
                            style = {{
                                "width" : this.state.cutW,
                                "height" : this.state.cutH,
                                "position" : "absolute",
                                "left": this.state.cutX,
                                "top": this.state.cutY,
                                "border": "2px solid #fff",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect()(CutPic)
