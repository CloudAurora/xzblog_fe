import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import Header from 'src/components/Header';
import Body from 'src/components/Body';

export default class App extends Component {
  render() {
    return (
      <VerticalLayout>
        <Header />
        <Body />
      </VerticalLayout>
    );
  }
}

const VerticalLayout = styled.main`
  width: 100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
  & > .item-fixed{
    flex: 0 0 auto;
  }
  & > .item-grow{
    flex: 1 
  }
`;
