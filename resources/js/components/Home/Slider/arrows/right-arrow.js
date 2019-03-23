import React from 'react';

import styled from 'styled-components';

const Arrow = styled.div`
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const RightArrow = (props) => {
  return (
    <Arrow className="nextArrow" onClick={props.goToNextSlide}>
      <i className="fas fa-chevron-right fa-2x" aria-hidden="true"></i>
    </Arrow>
  );
}

export default RightArrow;
