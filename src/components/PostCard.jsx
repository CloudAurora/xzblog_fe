import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { css } from 'react-emotion';
import Card from '@material-ui/core/Card';
import { Event, BookmarkBorder, ImportContacts } from '@material-ui/icons';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class PostCard extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  render() {
    const { post, ...rest } = this.props;

    return (
      <Card {...rest} className={css`margin-bottom: 20px;`}>
        <CardContent>
          <Typography variant="h5" component="h2" className={titleCls}>
            {post.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            <Event className={smallCls} />
            <span className={smallCls}>{moment(post.createTime).format('YYYY-MM-DD HH:mm')}</span>
            <BookmarkBorder className={smallCls} />
            <span className={smallCls}>{post.categories.map(c => c.name).join('/')}</span>
          </Typography>
          <Typography component="p">{post.summary}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <ImportContacts
              className={css`
                margin-right: .2em;
                font-size: 20px;
                vertical-align: middle;
              `}
            />{' '}
            Read More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const smallCls = css`
  vertical-align: middle;
  margin-right: 5px;
  &.svg {
    font-size: 20px;
  }
`;
const titleCls = css`
  margin: .3em 0 !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
