import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import styled from 'styled-components';

const HeaderBox = styled.div`
    width: 100%;
    z-index: 999;
`;

const Container = styled.div`
    width: 1100px;
    margin: 0 auto;
`;
const HeaderContainer = styled.div`
    ul{
        display:flex;
    }
    li{

    }
    a{
        display: block;
        padding: 30px;
        font-size: 1.5rem;
        font-weight: 900;
        text-transform:uppercase;
    }
`;

const Header = () => (
    <HeaderBox>
        <Container>
            <HeaderContainer>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/boards">Board</Link></li>
                <li><Link to="/posts">Post</Link></li>
                <li><Link to="/youtubes">Youtube</Link></li>
            </ul>
            </HeaderContainer>
        </Container>
    </HeaderBox>

);

export default withRouter(Header);
