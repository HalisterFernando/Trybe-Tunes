import { PropTypes } from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      songs: [],
      artistName: '',
      collectionName: '',
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({}, async () => {
      const songs = await getMusics(params.id);
      this.setState({
        loading: false,
        songs: songs.slice(1),
        artistName: songs[0].artistName,
        collectionName: songs[0].collectionName,
      });
    });
  }

  render() {
    const { songs, loading, artistName, collectionName } = this.state;
    return (
      <>
        <Header />
        {!loading && (
          <>
            <p data-testid="artist-name">{artistName}</p>
            <p data-testid="album-name">{collectionName}</p>
          </>
        ) }

        {loading && songs.length === 0 ? <Loading /> : (
          <div data-testid="page-album">

            {songs.map((el) => (
              <MusicCard
                key={ el.trackId }
                trackName={ el.trackName }
                trackId={ el.trackId }
                previewUrl={ el.previewUrl }
                musicObj={ el }
              />
            ))}
          </div>)}
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
