import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vh;
  height : 80vh;
  line-height: 80vh;
  text-align: center;
  margin: 0 auto;
  span{
    font-size: 3rem;
    font-weight: 900;
  }
`;

class Loader extends Component {
  render() {
    return (
      <Container>
        <span>loading... ⏰</span>
      </Container>
    )
  }
}
export default Loader;
