import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: '',
    };
  }

    handleFave = async ({ target }) => {
      const { name, checked, value } = target;

      this.setState({ loading: true, [name]: checked });

      if (checked) { await addSong(value); }

      this.setState({ loading: false });
    };

    render() {
      const { trackName, previewUrl, trackId } = this.props;
      const { favorite, loading } = this.state;
      return (
        <div>
          { loading
            ? <Loading />
            : (
              <>
                <p>{trackName}</p>
                <label htmlFor="favorite">
                  Favorita
                  <input
                    id="favorite"
                    type="checkbox"
                    name="favorite"
                    value={ trackName }
                    checked={ favorite }
                    onChange={ this.handleFave }
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
              </>
            )}

        </div>
      );
    }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
