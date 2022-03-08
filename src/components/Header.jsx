import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: '',
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const userInfo = await getUser();

    this.setState({ user: userInfo.name, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{ loading ? <Loading /> : user }</h1>
      </header>
    );
  }
}
