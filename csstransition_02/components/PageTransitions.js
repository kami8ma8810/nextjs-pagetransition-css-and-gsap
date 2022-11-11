import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const transitionZoom = keyframes`
0%{
	transform: scale(1);
}
30%{
	transform: scale(.5);
}
70%{
	transform: scale(.5);
}
100%{
	transform: scale(1);
}
`;

const transitionOutFlip = keyframes`
from{
	transform: rotateY(0) translateZ(-1px);
}
to{
	transform: rotateY(180deg) translateZ(-1px);
}
`;

const transitionInFlip = keyframes`
from{
	transform: rotateY(-180deg) translateZ(1px);
}
to{
	transform: rotateY(0) translateZ(1px);
}`;

const MainComponent = styled.div`
  transform-style: preserve-3d;
  &.page-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* opacity: 0; */
    z-index: 4;
    animation: ${transitionInFlip} 0.4s 0.25s cubic-bezier(0.37, 0, 0.63, 1) both;
    backface-visibility: hidden;
  }

  &.page-enter-active,
  &.page-exit-active {
    .page-transition-inner {
      height: 100vh;
      overflow: hidden;
      animation: ${transitionZoom} 0.8s cubic-bezier(0.45, 0, 0.55, 1) both;
      background-color: #fff;
    }
  }

  &.page-exit {
  }

  &.page-exit-active {
    main {
      transform: translateY(-${(props) => props.routingPageOffset}px);
    }
    animation: ${transitionOutFlip} 0.4s 0.25s cubic-bezier(0.37, 0, 0.63, 1) both;
    backface-visibility: hidden;
  }

  &.page-enter-done {
  }
`;

const SecondaryComponent = styled.div`
  position: relative;
`;

const PageTransitions = ({ children, route, routingPageOffset }) => {
  const [transitioning, setTransitioning] = useState();

  const playTransition = () => {
    setTransitioning(true);
  };

  const stopTransition = () => {
    setTransitioning('');
  };

  return (
    <>
      <TransitionGroup className={transitioning ? 'transitioning' : ''}>
        <CSSTransition key={route} classNames='page' timeout={800} onEnter={playTransition} onExited={stopTransition}>
          <MainComponent routingPageOffset={routingPageOffset}>
            <SecondaryComponent className='page-transition-inner'>{children}</SecondaryComponent>
          </MainComponent>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default PageTransitions;
