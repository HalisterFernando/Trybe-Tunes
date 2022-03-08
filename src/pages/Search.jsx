import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisable: true,
      search: '',
    };
  }

  handleSearch = ({ target }) => {
    const { name, value } = target;
    const maxLength = 2;
    this.setState({ [name]: value, isDisable: value.length < maxLength });
  };

  render() {
    const { search, isDisable } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form action="">
            <label htmlFor="search">
              <input
                name="search"
                id="search"
                onChange={ this.handleSearch }
                data-testid="search-artist-input"
                type="text"
              />
            </label>
            <button
              value={ search }
              disabled={ isDisable }
              data-testid="search-artist-button"
              type="button"
            >
              Pesquisar

            </button>
          </form>
        </div>
      </>
    );
  }
}
