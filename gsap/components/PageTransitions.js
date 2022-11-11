import { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import gsap from 'gsap';

const MainComponent = styled.div`
  transform-style: preserve-3d;
  &.page-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 4;
    opacity: 0;
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
      transform: translateY(
        -${(props) => props.routingPageOffset}px
      );
    }
    backface-visibility: hidden;
  }

  &.page-enter-done {
  }
`;

const SecondaryComponent = styled.div`
  position: relative;
`;

const Grid = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);

  div {
    background-color: #fff;
    visibility: hidden;
  }
`;

const PageTransitions = ({
  children,
  route,
  routingPageOffset,
}) => {
  const [transitioning, setTransitioning] = useState();
  const tl = useRef();
  const transitionRef = useRef();

  const playTransition = () => {
    tl.current.play(0);
    setTransitioning(true);
  };

  const stopTransition = () => {
    setTransitioning('');
  };

  useEffect(() => {
    if (!transitionRef.current) {
      return;
    }

    const squares = transitionRef.current.children;
    gsap.set(squares, {
      autoAlpha: 1,
    });

    tl.current = gsap
      .timeline({
        repeat: 1,
        repeatDelay: 0.2,
        yoyo: true,
        paused: true,
      })
      .fromTo(
        squares,
        {
          scale: 0,
          borderRadius: '100%',
        },
        {
          scale: 1,
          borderRadius: 0,
          stagger: {
            grid: 'auto',
            from: 'random',
            ease: 'sine',
            amount: 0.4, //要調整（timeoutの半数？）
          },
        }
      );
    return () => {
      tl.current.kill();
    };
  }, []);

  return (
    <>
      <TransitionGroup
        className={transitioning ? 'transitioning' : ''}
      >
        <CSSTransition
          key={route}
          classNames='page'
          timeout={800}
          onEnter={playTransition}
          onExited={stopTransition}
        >
          <MainComponent
            routingPageOffset={routingPageOffset}
          >
            <SecondaryComponent className='page-transition-inner'>
              {children}
            </SecondaryComponent>
          </MainComponent>
        </CSSTransition>
      </TransitionGroup>
      <Grid ref={transitionRef}>
        {[...Array(100)].map((_, i) => (
          <div key={i} />
        ))}
      </Grid>
    </>
  );
};

export default PageTransitions;
