import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisable: true,
      loading: false,
      search: '',
      album: '',
      input: '',
    };
  }

  handleSearch = ({ target }) => {
    const { name, value } = target;
    const maxLength = 2;
    this.setState({ [name]: value, isDisable: value.length < maxLength, input: value });
  };

  albumSearch = () => {
    const { search } = this.state;
    this.setState({ loading: true, search: '' }, async () => {
      const album = await searchAlbumsAPI(search);
      this.setState({ loading: false, album });
    });
  };

  isBtnDisable = () => {
    const { isDisable } = this.state;

    return isDisable ? 'btn-disable' : 'btn-able';
  }

  render() {
    const { search, isDisable, loading, album, input } = this.state;

    return (
      <>
        <Header />
        <div
          className="
        bg-r-dark
        max-h-full
        flex flex-col items-center"
          data-testid="page-search"
        >
          {loading
            ? <Loading /> : (
              <form className="pt-10 w-80" action="">
                <label
                  className="
                flex flex-col
                md:flex-row
                md:justify-center
                px-10
                gap-2"
                  htmlFor="search"
                >
                  <input
                    name="search"
                    id="search"
                    className="p-2 bg-slate-100 rounded-md border border-r-dark"
                    onChange={ this.handleSearch }
                    data-testid="search-artist-input"
                    placeholder="Artista ou banda"
                    type="text"
                  />
                  <button
                    className={ this.isBtnDisable() }
                    value={ search }
                    disabled={ isDisable }
                    onClick={ this.albumSearch }
                    data-testid="search-artist-button"
                    type="button"
                  >
                    Pesquisar

                  </button>
                </label>
              </form>)}
          <div className="mt-10 min-h-screen bg-r-dark">
            {
              album.length !== 0 ? (
                <>
                  <p
                    className="
                  text-2xl text-center text-r-cream
                  mb-3"
                  >
                    {`Resultado de álbuns de: ${input}`}

                  </p>
                  <div className="flex flex-wrap justify-around gap-1">
                    {album.map((el) => (
                      <div key={ el.collectionId }>
                        <AlbumCard
                          albumImage={ el.artworkUrl100 }
                          albumName={ el.collectionName }
                          artistName={ el.artistName }
                          albumId={ el.collectionId }
                        />
                      </div>
                    ))}
                  </div>
                </>
              )
                : (
                  <p
                    className="
                text-center text-r-cream text-2xl"
                  >
                    Nenhum álbum foi encontrado

                  </p>
                )
            }
          </div>
        </div>
      </>
    );
  }
}
