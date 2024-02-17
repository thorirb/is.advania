import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

type LayoutProps = {
  children: React.ReactElement;
}

export default function Layout (props: LayoutProps) {

  return (
    <div>
      <NavMenu />
      <Container tag="main">
        { props.children }
      </Container>
    </div>
  );
}
