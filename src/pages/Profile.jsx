import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { FaUser } from 'react-icons/fa';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    this.setState({}, async () => {
      const info = await getUser();
      this.setState({
        loading: false,
        info,
      });
    });
  }

  userImage = () => {
    const { info } = this.state;

    return info.image
      ? <img className="rounded-full" src={ info.image } alt="foto" />
      : <FaUser className="text-r-dark text-4xl" />;
  }

  render() {
    const { loading, info } = this.state;
    const { history } = this.props;
    return (
      <div>
        {
          loading ? <Loading /> : (
            <>
              <Header />
              <div
                className="flex flex-col items-center
              bg-r-dark
              h-screen
              px-4 pt-4"
                data-testid="page-profile"
              >

                <div className="flex justify-evenly items-center w-80">
                  <span
                    className="
                flex items-center justify-center
                rounded-full
                bg-r-orange
                shadow shadow-r-cream
                w-16 h-16"
                  >
                    {this.userImage()}
                  </span>
                  <button
                    className="
              px-2 py-1
              rounded
              bg-r-orange
              text-white text-lg
              font-semibold
              transition ease-in-out delay-75
            hover:text-r-dark hover:shadow hover:shadow-white"
                    type="button"
                    onClick={ () => history.push('/profile/edit') }
                  >
                    Editar Perfil
                  </button>
                </div>
                <div className="">
                  <div className="mt-10">
                    <p className="text-xl text-r-cream font-semibold">Nome</p>
                    <p className="text-xl text-r-cream mt-1">{info.name}</p>
                  </div>
                  <div className="mt-10">
                    <p className="text-xl text-r-cream font-semibold">Email</p>
                    <p className="text-xl text-r-cream mt-1">{info.email}</p>
                  </div>
                  <div className="mt-10">
                    <p className="text-xl text-r-cream font-semibold">Descrição</p>
                    <p className="text-xl text-r-cream mt-1">{info.description}</p>
                  </div>
                </div>

              </div>
            </>
          )
        }

      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
