import React, { Component } from 'react'
import Axios from 'axios';

export default class BoardCreate extends Component {

    constructor(props){
        super(props);
        this.state = {
            title : '',
            description : '',
            error : null
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        try{
            Axios.post(`/boards`, {
                title : this.state.title,
                description : this.state.description,
            })
        }catch{
            this.setState({
                error : 'board create error'
            })
        }finally{
            console.log('성공적으로 글이 작성되었습니다. board index로 props.history.push합니다');
            this.props.history.push(`/boards`);
        }
    }

    handleChange1(e){
        this.setState({
            title : e.target.value
        })
    }

    handleChange2(e){
        this.setState({
            description : e.target.value
        })
    }



    renderBoardCreateBox(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                        onChange={this.handleChange1}
                        value={this.state.title}
                        placeholder="title을 작성해주세요."
                        />
                    </div>
                    <div>
                        <textarea
                        onChange={this.handleChange2}
                        value={this.state.description}
                        placeholder="description을 작성해주세요."
                        />
                    </div>
                    <div>
                        <button type="submit">작성완료</button>
                    </div>
                    <div>
                        <button onClick={this.props.history.goBack}>이전 페이지로</button>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return (
        <div>
            <div>
                {this.renderBoardCreateBox()}
            </div>
        </div>
        )
    }
}
