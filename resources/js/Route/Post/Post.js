import React, { Component } from 'react'
import Axios from 'axios';
import PostCreate from './PostCreate';

export default class Post extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts : [],
            description : '',
            error : null,
            loading : true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    getPosts(){
        return Axios.get('/posts').then(response => this.setState({
            posts : [...response.data.posts]
        }))
    }

    renderPostForm(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea 
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </div>

                    <div>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        )
    }

    handleSubmit(e){
        e.preventDefault();
        try{
            return Axios.post('/posts',{
                description : this.state.description
            }).then(this.setState({
                description : ''
            }))
        }catch{
            this.setState({
                error : 'handleSubmit error'
            })
        }finally{
            this.getPosts();
        }
    }
    handleChange(e){
        this.setState({
            description : e.target.value
        })
    }

    handleDelete(id){
        return Axios.delete(`/posts/${id}`).then(
            ()=> {this.getPosts()}
        )
    }

    componentDidMount(){
        this.getPosts();
    }

    render() {
        return (
            <>
            {this.renderPostForm()}
            <PostCreate posts={this.state.posts} onDelete={this.handleDelete}/>
            </>
        )
    }
}
