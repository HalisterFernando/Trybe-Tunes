import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { FaUser } from 'react-icons/fa';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      isDisable: true,
      name: '',
      email: '',
      description: '',
      image: '',
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
        name: info.name,
        email: info.email,
        description: info.description,
        image: info.image,
      }, this.validate);
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,

    }, this.validate);
  };

  profileImage = () => {
    const { image } = this.state;
    return image
      ? <img className="rounded-full" src={ image } alt="foto" />
      : <FaUser className="text-r-dark text-4xl" />;
  }

  isBtnDisable = () => {
    const { isDisable } = this.state;

    return isDisable ? 'btn-disable md:w-1/2' : 'btn-able md:w-1/2';
  }

  validate = () => {
    const { name, email, description } = this.state;

    const minLength = 3;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailValidation = emailRegex.test(email);
    const descriptionValidation = description.length > 0;
    const userNameValidation = name.length >= minLength;

    const validation = emailValidation && descriptionValidation && userNameValidation;

    this.setState({ isDisable: !validation });
  }

  render() {
    const { loading, isDisable, name, email, description, image } = this.state;
    const { history } = this.props;
    return (
      <div>
        {
          loading ? <Loading /> : (
            <div className="h-screen">
              <Header />
              <div
                className="
              bg-r-dark
              min-h-full
              flex flex-col items-center
              px-4 pt-4"
                data-testid="page-profile"
              >

                <div className="flex justify-evenly items-center gap-4">
                  <span
                    className="
                    flex items-center justify-center
                    rounded-full
                    bg-r-orange
                    shadow shadow-r-cream
                    w-16 h-16"
                  >
                    {this.profileImage()}
                  </span>
                  <div>
                    <p
                      className="
                    text-xl text-center text-r-cream
                    font-semibold"
                    >
                      Foto de perfil
                    </p>
                    <input
                      className="p-1 rounded text-sm"
                      name="image"
                      value={ image }
                      type="text"
                      size="10"
                      onChange={ this.handleChange }
                    />
                  </div>
                </div>
                <form action="" className="w-10/12">

                  <label htmlFor="name">
                    <p className="text-xl text-r-cream font-semibold">Nome</p>
                    <input
                      className="w-full p-2 rounded text-xl"
                      name="name"
                      onChange={ this.handleChange }
                      value={ name }
                    />
                  </label>
                  <label htmlFor="email">
                    <p className="text-xl mt-10 text-r-cream font-semibold">Email</p>
                    <input
                      className="w-full p-2 rounded text-xl"
                      name="email"
                      onChange={ this.handleChange }
                      value={ email }
                    />
                  </label>
                  <div className="mt-10">
                    <p className="text-xl text-r-cream font-semibold">Descrição</p>
                    <textarea
                      className="w-full p-2 mb-4 rounded text-xl"
                      name="description"
                      onChange={ this.handleChange }
                      value={ description }
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className={ this.isBtnDisable() }
                      disabled={ isDisable }
                      type="button"
                      onClick={ () => {
                        updateUser({ name, email, description, image });
                        history.push('/profile');
                      } }
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
