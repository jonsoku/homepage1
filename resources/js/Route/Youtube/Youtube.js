import React, { Component } from 'react'
import Axios from 'axios';
import YoutubeRender from './YoutubeRender';
import Loader from '../../components/Loader';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';

const Container = styled.div`
    width: 1100px;
    margin : 0 auto;
    height : inherit;
    display:grid;
    grid-gap:60px;
    grid-template-columns: repeat( 2, minmax(250px, 1fr) );
`;

const CreateBox = styled.div`
    width: 1100px;
    margin: 20px auto;
    a{
        display:block;
        width : 100%;
        height: 10vh;
        line-height :10vh;
        text-align:center;
        background-color:black;
        color: #fff;
        font-size:2rem;
        font-weight: 900;
    }
`;



export default class Youtube extends Component {

    constructor(props){
        super(props);
        this.state = {
            youtubes : [],
            loading: true,
            //react-js-pagination 부분
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 10
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    async getYoutubes(){
        try{
            return await Axios.get(`/youtubes`).then(response => this.setState({
                youtubes : [...response.data.youtubes.data]
            }))
        }catch{

        }finally{
            this.setState({
                loading: false
            })
        }
    }

    handleDelete(id){
        return Axios.delete(`/youtubes/${id}`).then(
            ()=> {this.getYoutubes()}
        )
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        console.log(this.state, 'from handlepagechage')
        this.setState({activePage: pageNumber});
        Axios.get('/youtubes?page='+pageNumber)
        .then(response => {
            this.setState({
                youtubes : [...response.data.youtubes.data],
                activePage: response.data.youtubes.current_page,
                itemsCountPerPage: response.data.youtubes.per_page,
                totalItemsCount: response.data.youtubes.total,
            })
        })
      }

    componentDidMount(){
        this.getYoutubes();
        this.handlePageChange();
    }

    render() {
        console.log(this.state)
        return (
        <div>
            <CreateBox>
                <Link to="/youtubes/create">create</Link>
            </CreateBox>
            {this.state.loading ? <Loader /> : (
                <>
                    <Container>
                        <YoutubeRender onDelete={this.handleDelete} youtubes={this.state.youtubes}/>
                    </Container>
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                    onChange={this.handlePageChange}
                    itemClass='page-item'
                    linkClass='page-link'
                    />
                </>
            )}
        </div>
        )
    }
}
