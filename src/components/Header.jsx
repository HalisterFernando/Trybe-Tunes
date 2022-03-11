import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({}, async () => {
      const userInfo = await getUser();
      this.setState({ user: userInfo.name, loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      loading ? <Loading /> : (
        <header data-testid="header-component">
          <h1 data-testid="header-user-name">{ user }</h1>
          <nav>
            <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </nav>
        </header>
      )
    );
  }
}
