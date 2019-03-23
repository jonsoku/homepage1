import React, { Component } from 'react'
import Axios from 'axios';
import Loader from '../../components/Loader';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';


export default class Board extends Component {

    constructor(props){
        super(props);
        this.state = {
            boards : [],
            error : null,
            loading : true,
            //react-js-pagination 부분
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 10
        }
        this.renderBoards = this.renderBoards.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.renderBoardsBox = this.renderBoardsBox.bind(this);
    }


    renderBoardsBox(){
        return (
            <>
                <div>
                    <Link to={`/boards/create`}>글작성</Link>
                </div>
                {this.renderBoards()}
                <div>
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                    onChange={this.handlePageChange}
                    itemClass='page-item'
                    linkClass='page-link'
                    />
                </div>
            </>
        )
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        console.log(this.state, 'from handlepagechage')
        this.setState({activePage: pageNumber});
        Axios.get('/boards?page='+pageNumber)
        .then(response => {
            this.setState({
                boards : [...response.data.boards.data],
                activePage: response.data.boards.current_page,
                itemsCountPerPage: response.data.boards.per_page,
                totalItemsCount: response.data.boards.total,
            })
        })
      }

    renderBoards(){
        return (
            this.state.boards.map(board => (
                <div key={board.id}>
                    <div>
                        <ul>
                            <li>{board.id}</li>
                            <li><Link to={`/boards/${board.id}`}>{board.title}</Link></li>
                            <li>{board.user.name}</li>
                            <li>{board.created_at}</li>
                            <li><small>{board.board_comments.length ? '댓글 수 : '+board.board_comments.length : '댓글이없어요'} </small></li>
                        </ul>
                    </div>
                </div>
            ))
        )
    }


    async getBoards(){
        try{
            return await Axios.get(`/boards`).then(response => this.setState({
                boards : [...response.data.boards.data],
                activePage: response.data.boards.current_page,
                itemsCountPerPage: response.data.boards.per_page,
                totalItemsCount: response.data.boards.total,
            }))
        }catch{
            this.setState({
                error : 'board index 화면불러오는 곳 error났어 확인해봐'
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
        this.getBoards();
        console.log('componentWillMount 실행')
    }

    render() {
        console.log(this.state)
        return (
        <div>
            <div>
                {this.state.loading ? <Loader /> : this.renderBoardsBox() }
            </div>
        </div>
        )
    }
}
