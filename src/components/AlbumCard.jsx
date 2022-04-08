import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Renderiza os albums dos artistas buscados
export default class AlbumCard extends Component {
  render() {
    const { albumImage, albumName, artistName, albumId } = this.props;
    return (
      <div>
        <div>
          <img src={ albumImage } alt={ albumName } />
        </div>
        <div>
          <h3>{albumName}</h3>
          <Link
            data-testid={ `link-to-album-${albumId}` }
            to={ `/album/${albumId}` }
          >
            {artistName}
          </Link>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albumImage: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  albumId: PropTypes.number.isRequired,
};
