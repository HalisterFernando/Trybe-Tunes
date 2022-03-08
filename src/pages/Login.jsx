import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

    this.setState({ loading: true });

    await createUser({ name });

    this.setState({ name: '', redirect: true });
  };

  render() {
    const { name, isDisable, redirect, loading } = this.state;
    console.log(this.state);
    return (
      <>
        {loading ? <Loading /> : (
          <div data-testid="page-login">
            <form action="">
              <label htmlFor="name">
                <input
                  id="name"
                  onChange={ this.handleChange }
                  value={ name }
                  name="name"
                  type="text"
                  data-testid="login-name-input"
                />
              </label>
              <button
                disabled={ isDisable }
                data-testid="login-submit-button"
                type="button"
                onClick={ this.enterClick }
              >
                Entrar

              </button>

            </form>

          </div>
        )}
        {redirect && <Redirect to="/search" /> }
      </>

    );
  }
}
