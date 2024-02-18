import React from 'react';
import { Container } from 'reactstrap';

type LayoutProps = {
  children: React.ReactElement;
}

export default function Layout (props: LayoutProps) {

  return (
    <div>
      <Container tag="main">
        { props.children }
      </Container>
    </div>
  );
}
