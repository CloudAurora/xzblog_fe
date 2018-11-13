import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withRouter, matchPath } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

@inject('baseStore')
@withStyles(styles)
@withRouter
@observer
export default class ScrollableTabsButtonAuto extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  syncMobxWithRouter = (location = this.props.location) => {
    const match = matchPath(location.pathname, {
      path: '/:page?',
    });
    this.props.baseStore.page = match.params.page || 'home';
  };

  componentDidMount = () => {
    this.syncMobxWithRouter();
    this.unlisten = this.props.history.listen(location => this.syncMobxWithRouter(location));
  };

  componentWillUnmount = () => {
    this.unlisten && this.unlisten();
  };

  state = {
    menus: [
      {
        id: 'home',
        label: '首页',
      },
      {
        id: 'archive',
        label: '归档',
      },
      {
        id: 'category',
        label: '分类',
      },
      {
        id: 'tag',
        label: '标签',
      },
      {
        id: 'about',
        label: '关于我们',
      },
    ],
  };

  get page() {
    return this.props.baseStore.page || 'home';
  }

  handleChange = (event, index) => {
    const menu = this.state.menus[index];
    // this.props.baseStore.page = menu.id;
    this.props.history.push(`/${menu.id}/`);
  };

  render() {
    const { classes } = this.props;
    let index = this.state.menus.findIndex(menu => menu.id === this.page);
    if (index < 0) index = 0;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={index}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            // scrollable
            // scrollButtons="auto"
            centered
          >
            {this.state.menus.map(menu => <Tab key={menu.id} label={menu.label} />)}
          </Tabs>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}
