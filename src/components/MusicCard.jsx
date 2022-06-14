import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
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
      const { favoriteSongs } = this.props;

      // Se checked for verdadeiro adiciona a música a lista de favoritos, do contrário remove
      this.setState({ loading: true }, async () => {
        if (checked) { await addSong(musicObj); } else { await removeSong(musicObj); }

        this.setState({ loading: false, checked });
      });
      favoriteSongs();
    };

    render() {
      const { trackName, previewUrl, trackId, musicObj } = this.props;
      const { loading, checked } = this.state;
      return (
        <div
          className="
        flex flex-col md:flex-row
        items-center
        border-y border-r-cream
        py-2 pb-6"
        >
          {loading ? <Loading /> : (
            <>
              <div
                className="
              flex items-center justify-between
              w-[300px] md:w-full
              px-3
              mb-2"
              >
                <p className="text-r-cream text-xl font-semibold">{trackName}</p>

                <label htmlFor={ trackId } className="relative flex items-center gap-4">
                  <audio
                    className="hidden md:inline"
                    data-testid="audio-component"
                    src={ previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                  </audio>
                  { checked
                    ? <FaStar className="text-xl text-r-cream" />
                    : <FaRegStar className="text-xl text-r-cream" />}
                  <input
                    className="absolute hidden"
                    checked={ checked }
                    type="checkbox"
                    id={ trackId }
                    onChange={ (ev) => this.handleFave(ev, musicObj) }
                  />
                </label>

              </div>
              <audio
                className="md:hidden"
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
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
  musicObj: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  favoriteSongs: PropTypes.func.isRequired,

};
