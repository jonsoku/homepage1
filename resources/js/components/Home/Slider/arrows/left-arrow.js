import React from 'react';
import styled from 'styled-components';

const Arrow = styled.div`
    position: absolute;
    left: 5%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const LeftArrow = (props) => {
  return (
    <Arrow className="backArrow" onClick={props.goToPrevSlide}>
      <i className="fas fa-chevron-left fa-2x" aria-hidden="true"></i>
    </Arrow>
  );
}

export default LeftArrow;
