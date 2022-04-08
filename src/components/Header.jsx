import React, { Component } from 'react';
import { FaSearch, FaStar, FaUser } from 'react-icons/fa';
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
          <h1 className="header-h1" data-testid="header-user-name">{ user }</h1>
          <nav className="header-nav">
            <div className="nav-links">
              <Link data-testid="link-to-search" to="/search">
                <FaSearch className="nav-icon" />
                <span>Pesquisar</span>
              </Link>
              <Link data-testid="link-to-favorites" to="/favorites">
                <FaStar className="nav-icon" />
                Favoritos
              </Link>
              <Link data-testid="link-to-profile" to="/profile">
                <FaUser className="nav-icon" />
                Perfil

              </Link>
            </div>
          </nav>
        </header>
      )
    );
  }
}
