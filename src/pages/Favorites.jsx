import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getFaves();
  }

  getFaves = () => {
    this.setState({}, async () => {
      const faveSongs = await getFavoriteSongs();

      this.setState({
        loading: false,
        faveSongs,
      });
    });
  }

  render() {
    const { faveSongs, loading } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-favorites">

          {
            loading
              ? <Loading />
              : (faveSongs.map((el) => (
                <MusicCard
                  key={ el.trackId }
                  trackName={ el.trackName }
                  trackId={ el.trackId }
                  previewUrl={ el.previewUrl }
                  musicObj={ el }
                />
              )))
          }
        </div>
      </>
    );
  }
}
