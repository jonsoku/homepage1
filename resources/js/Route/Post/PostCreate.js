import React, { Component } from 'react'

export default class PostCreate extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts : []
        }
    }

    componentDidMount(){
        this.setState({
            posts: this.props.posts
        })
        console.log(this.props)
    }

    render() {
        return this.props.posts.map(post => (
            <div key={post.id}>
                <div>
                    <span>{post.description}</span><button onClick={()=>this.props.onDelete(post.id)}>삭제</button>
                </div>
            </div>
        ))
    }
}
