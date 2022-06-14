import React, { Component } from 'react';
import { FaSearch, FaStar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Disco from '../images/disco.png';
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
        <header className="bg-r-cream p-2" data-testid="header-component">
          <div className="flex justify-between items-center mb-2">
            <span
              className="
              flex gap-2
              text-3xl text-shadow-span text-r-orange
              md:text-5xl
              font-cursive font-light
              tracking-wide
            "
            >
              Trybe Tunes
              <img className="w-10 md:w-12" src={ Disco } alt="disco" />
            </span>

            <span
              className="
            px-2 pl-0
            border border-r-dark
            rounded-full
            flex items-center gap-2
            bg-r-dark
            text-r-cream
            md:text-xl
            font-medium
            "
              data-testid="header-user-name"
            >
              <span
                className="
              flex items-center justify-center
              rounded-full
              bg-r-orange
              w-6 h-6
              md:w-7 md:h-7
              "
              >
                <FaUser className="text-r-dark" />

              </span>
              { user.split(' ')[0] }

            </span>

          </div>
          <nav>
            <div className="flex justify-evenly">
              <Link className="nav-link" data-testid="link-to-search" to="/search">
                <FaSearch />
                <span>Pesquisar</span>
              </Link>
              <Link className="nav-link" data-testid="link-to-favorites" to="/favorites">
                <FaStar />
                Favoritos
              </Link>
              <Link className="nav-link" data-testid="link-to-profile" to="/profile">
                <FaUser />
                Perfil
              </Link>
            </div>
            <div className="flex justify-center">
              <a
                className="text-r-dark mt-1 hover:underline hover:font-semibold "
                href="https://www.flaticon.com/br/icones-gratis/vinil"
                title="vinil ícones"
              >
                Vinil ícones criados por Slidicon - Flaticon
              </a>
            </div>
          </nav>
        </header>
      )
    );
  }
}
