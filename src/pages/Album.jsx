import { PropTypes } from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const decimal = 10;
    const songs = await getMusics(params.id.toString(decimal));
    this.setState({ songs });
  }

  render() {
    const { songs } = this.state;
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
    console.log(musicInfo);
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">{artistName[0]}</p>
          <p data-testid="album-name">{albumName[0]}</p>
          {musicInfo.map((el) => (
            <MusicCard
              key={ el.trackId }
              trackName={ el.trackName }
              previewUrl={ el.previewUrl }
            />
          ))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params.id: PropTypes.number.isRequired,
  }),
};

export default Album;
