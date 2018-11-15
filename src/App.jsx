import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'src/components/Header';
import Home from 'src/pages/Home';
import Archive from 'src/pages/Archive';
import Category from 'src/pages/Category';
import Tag from 'src/pages/Tag';
import About from 'src/pages/About';

export default class App extends Component {
  renderBody = () => (
    <Switch>
      <Route path="/home/" component={Home} />
      <Route path="/archive/" component={Archive} />
      <Route path="/category/" component={Category} />
      <Route path="/tag/" component={Tag} />
      <Route path="/about/" component={About} />
      <Route path="/" render={() => <Redirect to="/home" />} />
    </Switch>
  )

  render() {
    return (
      <VerticalLayout>
        <Header />
        {this.renderBody()}
      </VerticalLayout>
    );
  }
}

const VerticalLayout = styled.main`
  min-height: 100vh;
  width: 100%;
  background: #f9f9f9;
  display: flex;
  position: relative;
  flex-direction: column;
  & > .item-fixed {
    flex: 0 0 auto;
  }
  & > .item-grow {
    flex: 1;
  }
`;
