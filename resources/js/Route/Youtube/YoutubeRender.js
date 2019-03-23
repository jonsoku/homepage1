import React, { Component } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const Box = styled.div`
    width:100%;
    padding: 1rem;
    margin: 0 auto;
    transition: all .4s;
    box-shadow: 5px 5px 10px #ccc;
    &:hover{
        transform:scale(1.02);
        background-color: #eaeaea;
        border: 0;
    };
    
    
`;

const DeleteBox = styled.div`
    button{
        width: 100%;
        margin-top: 1rem;
        border:0;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid #eaeaea;
        padding: 1rem;
    }
`;


const Title = styled.div`
    font-size: 2rem;
    font-weight: 900;
    position: relative;
    small{
        position:absolute;
        left:0;
        top:2px;
        display:inline-block;
        font-weight: 300;
        background-color: black;
        color: #fff;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
        text-align:center;
        line-height: 2rem;

    }
    span{
        margin-left: 3rem;
        text-transform : uppercase;
    }
`;

const InfoBox = styled.div`
    margin-top: 1rem;
`;

const Author = styled.span`
    margin-right: 1rem;
`;

const Created = styled.span`
    font-size: 0.5rem;
`;

const Description = styled.div`
    margin: 2rem 0;
    span{
        font-size:1.6rem;
    }
`;

const YoutubeUrl = styled.p`
    font-size: 0.5rem;

`;

const YoutubeContainer = styled.div`
    position:relative;padding-bottom:56.25%;padding-top:30px;height:0;overflow:hidden;
`;

// const YoutubeIfram = styled.iframe`
//     position:absolute;top:0;left:0;width:100%;height:100%;
//     object{
//         position:absolute;top:0;left:0;width:100%;height:100%;
//     }
//     embed{
//         position:absolute;top:0;left:0;width:100%;height:100%;
//     }
// `;

export default class YoutubeRender extends Component {
    render() {
        return this.props.youtubes.map(youtube => (
            <Box key={youtube.id}>
                <Title><small>{youtube.id}</small><span>{youtube.title.substring(0,15)+''}</span></Title>
                <InfoBox>
                    <Author>{youtube.user.name}</Author>
                    <Created>{youtube.created_at}</Created>
                </InfoBox>
                <Description><span>{youtube.description}</span></Description>
                <YoutubeContainer className='player-wrapper'>
                    <ReactPlayer url={youtube.url} className='react-player' width="100%" height="100%"></ReactPlayer>
                </YoutubeContainer>
                <DeleteBox>
                    <button onClick={()=>this.props.onDelete(youtube.id)}>삭제</button>
                </DeleteBox>
            </Box>
        ))
    }
}
