import { useState } from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import gsap from 'gsap';

const MainComponent = styled.div`
  clip-path: 'polygon(0 0, 60% 0, 100% 0, 100% 50%, 100% 100%, 60% 100%, 0 100%)';
  /* transform-style: preserve-3d; */
  &.page-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* opacity: 0; */
    z-index: 0;
    backface-visibility: hidden;
  }

  &.page-enter-active,
  &.page-exit-active {
    .page-transition-inner {
      height: 100vh;
      overflow: hidden;
      background-color: #fff;
    }
  }

  &.page-exit {
  }

  &.page-exit-active {
    main {
      transform: translateY(-${(props) => props.routingPageOffset}px);
    }
    z-index: 1;
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

  const onExitStart = (element) => {
    gsap
      .timeline()
      .fromTo(
        element,
        {
          clipPath:
            'polygon(0 0, 60% 0, 100% 0, 100% 50%, 100% 100%, 60% 100%, 0 100%)',
        },
        {
          clipPath:
            // 'polygon(14% 29%, 24% 12%, 34% 33%, 61% 32%, 73% 10%, 87% 51%, 86% 76%, 74% 87%, 40% 90%, 19% 83%, 11% 68%, 9% 55%)',
            'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',
        }
      )
      .to(element, { xPercent: 100 });
    setTransitioning(true);
  };

  const stopTransition = () => {
    setTransitioning('');
  };

  return (
    <>
      <TransitionGroup className={transitioning ? 'transitioning' : ''}>
        <CSSTransition
          key={route}
          classNames='page'
          timeout={800}
          onExit={onExitStart}
          onExited={stopTransition}
        >
          <MainComponent routingPageOffset={routingPageOffset}>
            <SecondaryComponent className='page-transition-inner'>
              {children}
            </SecondaryComponent>
          </MainComponent>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default PageTransitions;
