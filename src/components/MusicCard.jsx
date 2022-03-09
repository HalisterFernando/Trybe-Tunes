import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  //   async componentDidMount() {
  //     const { trackName } = this.props;
  //     const faveSongs = await getFavoriteSongs();
  //     console.log(faveSongs);
  //     this.setState({ checked: faveSongs.includes(trackName) });
  //     console.log(faveSongs.includes(trackName));
  //   }

    handleFave = ({ target }) => {
      const { value, checked } = target;

      this.setState({ loading: true }, async () => {
        if (checked) { await addSong(value); }
        this.setState({ loading: false });
      });
    };

    render() {
      const { trackName, previewUrl, trackId, faveSongs } = this.props;
      const { loading } = this.state;
      return (
        <div>
          {loading && <Loading />}
          <p>{trackName}</p>
          <label htmlFor="favorite">
            Favorita
            <input
              id="favorite"
              type="checkbox"
              name="favorite"
              value={ trackName }
              onChange={ this.handleFave }
              checked={ faveSongs }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
      );
    }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  faveSongs: PropTypes.bool.isRequired,

};
