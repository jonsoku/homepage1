import React, { Component } from 'react'
import Axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    width: 1100px;
    margin: 0 auto;
`;

const FormDiv = styled.div`
    input{
        width: 100%;
        margin-bottom: 2rem;
    }
    textarea{
        width: 100%;
        margin-bottom: 2rem;
    }
`;

export default class YoutebeCreate extends Component {

    constructor(props){
        super(props);
        this.state = {
            title : '',
            url : '',
            description : ''
        }

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        try{
            Axios.post('/youtubes',{
                title : this.state.title,
                url : this.state.url,
                description: this.state.description
            })
        }catch{
            console.log('error')
        }finally{
            this.props.history.push(`/youtubes`)
        }
    }

    handleChange1(e){
        this.setState({
            title : e.target.value
        })
    }
    handleChange2(e){
        this.setState({
            url : e.target.value
        })
    }
    handleChange3(e){
        this.setState({
            description : e.target.value
        })
    }


    render() {
        return (
        <Container>
            <form onSubmit={this.handleSubmit}>
                <FormDiv>
                    <input
                        onChange={this.handleChange1}
                        value={this.state.title}
                        placeholder="title을 입력해주세요."
                    />
                </FormDiv>
                <FormDiv>
                    <textarea
                        onChange={this.handleChange2}
                        value={this.state.url}
                        placeholder="Youtube 주소를 입력해주세요 예시: https://youtu.be/C18ug3e7luM"
                    />
                </FormDiv>
                <FormDiv>
                    <textarea
                        onChange={this.handleChange3}
                        value={this.state.description}
                        placeholder="description을  입력해주세요."
                    />
                </FormDiv>
                <button type="submit">작성</button>
            </form>
        </Container>
        )
    }
}
