import React, { Component } from 'react'
import Axios from 'axios';
import SampleLoader from '../../components/SampleLoader';

export default class BoardCreate extends Component {

    constructor(props){
        super(props);
        this.state = {
            title : '',
            description : '',
            error : null,
            loading : true
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        try{
            Axios.put(`/boards/${this.props.match.params.id}`, {
                title : this.state.title,
                description : this.state.description
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
                        <button type="submit">수정완료</button>
                    </div>
                    <div>
                        <button onClick={this.props.history.goBack}>이전 페이지로</button>
                    </div>
                </form>
            </div>
        )
    }

    async getBoard(){
        try{
            return await Axios.get(`/boards/${this.props.match.params.id}`).then(response => this.setState({
                title : response.data.board.title,
                description : response.data.board.description
            }))
        }catch{
            this.setState({
                error : `board edit error`
            })
        }finally{
            this.setState({
                loading : false
            })
            console.log(`성공적으로 board edit page 게시물 정보를 불러왔습니다.`)
        }
    }

    componentDidMount(){
        console.log('componentDidMount 실행')
    }

    componentWillMount(){
        this.getBoard();
        console.log('componentWillMount 실행')
    }


    render() {
        return (
        <div>
            <div>
                {this.state.loading ? <SampleLoader /> : this.renderBoardCreateBox()}
            </div>
        </div>
        )
    }
}
