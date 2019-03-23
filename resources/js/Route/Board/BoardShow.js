import React, { Component } from 'react'
import Axios from 'axios';
import Loader from '../../components/Loader';
import BoardCommentLoader from '../../components/BoardCommentsLoader';
import {Link} from 'react-router-dom';

export default class BoardShow extends Component {

    constructor(props){
        super(props);
        this.state = {
            board : [],
            boardComments : [],
            body : [],
            error : null,
            loading : true,
            CommentsLoading : true
        }
        this.renderBoard = this.renderBoard.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderBoardComments = this.renderBoardComments.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderBoardCommentsForm = this.renderBoardCommentsForm.bind(this);
        this.renderBoardCommentsBox = this.renderBoardCommentsBox.bind(this);
        this.renderBoardBox = this.renderBoardBox.bind(this);
    }

    renderBoardBox(){
        return(
            <>
                {this.renderBoard()}
                {this.renderBoardCommentsBox()}
            </>
        )
    }

    renderBoardCommentsBox(){
        return (
            <>
                {this.renderBoardCommentsForm()}
                {this.renderBoardComments()}
            </>
        )
    }


    handleSubmit(e){
        e.preventDefault();
        Axios.post(`/boards/${this.state.board.id}/boardComments`,{
            body : this.state.body
        }).then(
            this.getBoardComments()
        ).then(
            this.setState({
                body : ''
            })
        )
    }

    handleChange1(e){
        this.setState({
            body : e.target.value
        })
    }

    renderBoardCommentsForm(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea
                    onChange={this.handleChange1}
                    value={this.state.body}
                    placeholder="Comment를 달아주세요."
                    required
                    />
                    <div>
                        <button type="submit">댓글작성</button>
                    </div>
                </form>
            </div>
        )
    }

    renderBoardComments(){
        console.log(this.state)
        return this.state.boardComments.map(boardComment => (
            <div key={boardComment.id}>
                <ul>
                    <li>{boardComment.body}</li>
                    <li>by. {boardComment.user.name}----{boardComment.created_at}</li>
                </ul>
            </div>
        ))
    }


    handleDelete(id){
        try{
            Axios.delete(`/boards/${id}`).then(
                alert(id+'번 게시물 삭제되었습니다.')
            )
        }catch{
            console.log(`삭제 오류났어요`);
        }finally{
            console.log(id+`번 게시물 삭제 완료 boards index 페이지로 돌아갑니다.`),
            this.props.history.push(`/boards`)
        }
    }

    renderBoard(){
        return (
            <>
            <div>
                <ul>
                    <li>{this.state.board.id}</li>
                    <li>{this.state.board.user.name}</li>
                    <li>{this.state.board.title}</li>
                    <li>{this.state.board.description}</li>
                    <li>{this.state.board.created_at}</li>
                    <li>{this.state.board.updated_at}</li>
                </ul>
                <ul>
                    <li>
                        <Link to={`/boards/${this.state.board.id}/edit`}>EDIT</Link>
                    </li>
                    <li>
                        <button onClick={()=>this.handleDelete(`${this.state.board.id}`)}>Delete</button>
                    </li>
                    <li>
                        <button onClick={this.props.history.goBack}>이전 페이지로</button>
                    </li>
                </ul>
            </div>
            </>
        )
    }

    async getBoardComments(){
        try{
            return await Axios.get(`/boards/${this.props.match.params.id}`)
            .then(response =>
                this.setState({
                    boardComments : [...response.data.boardComments]
                })
            )
        }catch{
            console.log(`comments를 불러오는데 실패했습니다.`)

        }finally{
            this.setState({
                CommentsLoading : false
            })
        }
    }

    async getBoard(){
        try{
            return await Axios.get(`/boards/${this.props.match.params.id}`)
            .then(response =>
                this.setState({
                    board : response.data.board,
                })
            )
        }catch{
            this.setState({
                error : 'board show error'
            })

        }finally{
            this.setState({
                loading : false
            })
        }

    }

    componentDidMount(){
        console.log('componentDidMount 실행')
    }

    componentWillMount(){
        this.getBoard();
        this.getBoardComments();
        console.log('componentWillMount 실행')
    }

    render() {
        return (
        <div>
            <div>
            {this.state.loading ? <Loader /> : this.renderBoardBox()}
            </div>
        </div>
        )
    }
}
