import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const MainComponent = styled.div`
  &.page-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }

  &.page-exit {
    ~ .wipe {
      transform: translateY(100%);
    }
  }

  &.page-exit-active {
    ~ .wipe {
      transform: translateY(0);
      transition: transform 0.5s cubic-bezier(0.33, 1, 0.68, 1);
    }

    main {
      transform: translateY(-${(props) => props.routingPageOffset}px);
    }
  }

  &.page-enter-done {
    ~ .wipe {
      transform: translateY(-100%);
      transition: transform 0.5s cubic-bezier(0.32, 0, 0.67, 0);
    }
  }
`;

const Wipe = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 5;
  transform: translateY(100%);
`;

const PageTransitions = ({ children, route, routingPageOffset }) => {
  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition key={route} classNames='page' timeout={800}>
          <MainComponent routingPageOffset={routingPageOffset}>{children}</MainComponent>
        </CSSTransition>
      </TransitionGroup>
      <Wipe className='wipe' />
    </>
  );
};

export default PageTransitions;
