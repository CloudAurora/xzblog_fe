import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { observer, inject } from 'mobx-react';
import bannerImage from 'src/img/banner3.jpg';
import { primaryColor } from 'src/theme';
import { Typography } from '@material-ui/core';
import PostCard from './PostCard';
@inject('postStore')
@observer
export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.reload();
    console.log(this.props);
  }

  reload = () => {
    this.props.postStore.updatePosts();
  }

  get params() {
    return this.props.postStore.params || {};
  }

  get posts() {
    return this.props.postStore.posts || [];
  }

  render() {
    return (
      <section>
        <Banner
          className={css`
            display: flex;
            flex-direction: columns;
            justify-content: center;
            align-items: center;
          `}
        >
          <Typography variant="h3" component="h2">
            <span className={bannerTitleCls}>Tech will change the world !</span>
          </Typography>
        </Banner>
        <Container>
          <PostSection>{this.posts.map(post => <PostCard key={post.postId} post={post} />)}</PostSection>
        </Container>
      </section>
    );
  }
}

const bannerHeight = 500;
const Banner = styled.section`
  background: ${primaryColor[300]} url(${bannerImage}) no-repeat center 10%/cover;
  height: ${bannerHeight}px;
  margin-bottom: -100px;
`;
const Container = styled.main`
  width: 900px;
  margin: 0 auto;
  height: 100%;
`;

const PostSection = styled.section`
  max-width: 1400px;
  flex: 1 1 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const bannerTitleCls = css`
  color: #fff;
  background: rgba(10,10,10,0.35);
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  font-family: Poiret One;
`;
