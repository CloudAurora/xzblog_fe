import React, { Component } from 'react';
import styled from 'react-emotion';
import { observer, inject } from 'mobx-react';
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
    return <PostSection>{this.posts.map(post => <PostCard key={post.postId} post={post} />)}</PostSection>;
  }
}

const PostSection = styled.section`
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
`;
