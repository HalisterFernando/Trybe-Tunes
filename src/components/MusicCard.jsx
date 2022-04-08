import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,

    };
  }

  componentDidMount() {
    const { trackId } = this.props;
    this.setState({ loading: true }, async () => {
      const faveSongs = await getFavoriteSongs();

      this.setState({
        loading: false,
        checked: faveSongs.some((el) => el.trackId === trackId),
      });
    });
  }

    // Lógica para favoritar uma música
    handleFave = (ev, musicObj) => {
      const { checked } = ev.target;

      // Se checked for verdadeiro adiciona a música a lista de favoritos, do contrário remove
      this.setState({ loading: true }, async () => {
        if (checked) { await addSong(musicObj); } else { await removeSong(musicObj); }

        this.setState({ loading: false, checked });
      });
    };

    render() {
      const { trackName, previewUrl, trackId, musicObj } = this.props;
      const { loading, checked } = this.state;
      return (
        <div>
          {loading && <Loading />}
          <p>{trackName}</p>
          <label htmlFor={ trackId }>
            Favorita
            <input
              id={ trackId }
              type="checkbox"
              name="favorite"
              checked={ checked }
              onChange={ (ev) => this.handleFave(ev, musicObj) }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
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
  musicObj: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,

};
