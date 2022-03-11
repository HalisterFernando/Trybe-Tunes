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

  render() {
    const { search, isDisable, loading, album, input } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          {loading
            ? <Loading /> : (
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
                  onClick={ this.albumSearch }
                  data-testid="search-artist-button"
                  type="button"
                >
                  Pesquisar

                </button>
              </form>)}
          <div>
            {
              album.length !== 0 ? (
                <>
                  <p>{`Resultado de álbuns de: ${input}`}</p>
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
                </>
              )
                : <p>Nenhum álbum foi encontrado</p>
            }
          </div>
        </div>
      </>
    );
  }
}
