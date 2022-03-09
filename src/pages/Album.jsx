import { PropTypes } from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      songs: [],
      faveSongs: [],
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const decimal = 10;
    this.setState({ loading: true }, async () => {
      const songs = await getMusics(params.id.toString(decimal));
      const faveSongs = await getFavoriteSongs();
      this.setState({ songs, faveSongs, loading: false });
    });
  }

  render() {
    const { songs, loading, faveSongs } = this.state;

    const artistName = songs.filter((el) => el.artistName).map((el) => el.artistName);
    const albumName = songs
      .filter((el) => el.collectionName).map((el) => el.collectionName);
    const musicInfo = songs
      .filter((el) => el.trackId && el.trackName && el.previewUrl)
      .map((el) => ({
        trackId: el.trackId,
        trackName: el.trackName,
        previewUrl: el.previewUrl,
      }));

    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">{artistName[0]}</p>
          <p data-testid="album-name">{albumName[0]}</p>
          {loading && <Loading />}
          {musicInfo.map((el) => (
            <MusicCard
              key={ el.trackId }
              trackName={ el.trackName }
              previewUrl={ el.previewUrl }
              trackId={ el.trackId }
              faveSongs={
                faveSongs.length !== 0
                  ? faveSongs.some((fave) => fave === el.trackName)
                  : null
              }
            />
          ))}
        </div>
      </>
    );
  }
}

// Solução para validar as proptypes encontrada aqui https://github.com/airbnb/javascript/issues/1519;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,

};

export default Album;
