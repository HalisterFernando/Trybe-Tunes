import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Disco from '../images/disco.png';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisable: true,
      redirect: false,
      loading: false,
      name: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const maxLength = 3;

    this.setState({
      [name]: value,
      isDisable: value.length < maxLength,
    });
  };

  enterClick = async () => {
    const { name } = this.state;

    this.setState({ loading: true }, async () => {
      await createUser({ name });
      this.setState({ name: '', redirect: true });
    });
  };

  isBtnDisable = () => {
    const { isDisable } = this.state;

    return isDisable ? 'btn-disable' : 'btn-able';
  }

  render() {
    const { name, isDisable, redirect, loading } = this.state;

    return (
      <>
        {loading ? <Loading /> : (
          <div
            className="
          flex justify-center items-center
          h-screen
          bg-[url('/images/bg-disco.jpg')] bg-cover bg-no-repeat"
          >
            <div
              className="
              flex flex-col items-center justify-evenly
              border border-r-dark rounded-md
              bg-r-cream
              p-3
              h-80"
              data-testid="page-login"
            >
              <h1
                className="
              text-center text-5xl text-r-orange
              font-cursive
              text-shadow-h1"
              >
                Trybe Tunes

              </h1>
              <img className="w-20" src={ Disco } alt="disco" />
              <form className="flex flex-col items-center" action="">
                <label className="mb-3 flex items-center gap-2 w-full" htmlFor="name">
                  <input
                    id="name"
                    className="p-2 bg-slate-100 rounded-md border border-r-dark w-full"
                    onChange={ this.handleChange }
                    value={ name }
                    name="name"
                    type="text"
                    data-testid="login-name-input"
                  />
                </label>
                <button
                  className={ this.isBtnDisable() }
                  disabled={ isDisable }
                  data-testid="login-submit-button"
                  type="button"
                  onClick={ this.enterClick }
                >
                  Entrar

                </button>
                <div className="mt-10">

                  <a
                    className="text-r-dark mt-1 hover:underline hover:font-semibold"
                    href="https://www.flaticon.com/br/icones-gratis/vinil"
                    title="vinil ícones"
                  >
                    Vinil ícones criados por Slidicon - Flaticon
                  </a>
                </div>
              </form>
            </div>
          </div>
        )}
        {redirect && <Redirect to="/search" /> }
      </>

    );
  }
}
