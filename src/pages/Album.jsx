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
        songs: songs.slice(1), // Retorna a requisição sem o primeiro índice
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
        <div className="bg-r-dark">
          {!loading && (
            <div className="flex justify-center items-center gap-2 py-4">
              <div>
                <img src={ songs[0].artworkUrl100 } alt={ collectionName } />
              </div>
              <div>
                <p
                  className="
                text-xl text-center text-r-cream
                font-semibold"
                  data-testid="artist-name"
                >
                  {artistName}
                </p>
                <p
                  className="
                text-xl text-center text-r-cream
                font-semibold"
                  data-testid="album-name"
                >
                  {collectionName}
                </p>
              </div>
            </div>
          ) }

          {loading && songs.length === 0 ? <Loading /> : (
            <div className="bg-r-dark" data-testid="page-album">

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
