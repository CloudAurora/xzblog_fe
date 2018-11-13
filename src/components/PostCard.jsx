import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    margin: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

@withStyles(styles)
export default class PostCard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
  };

  render() {
    const { classes, post } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {post.createTime}/{post.lastModified}
          </Typography>
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {post.categories.map(c => c.name).join('/')}
          </Typography>
          <Typography component="p">
            {post.summary}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Read More</Button>
        </CardActions>
      </Card>
    );
  }
}
