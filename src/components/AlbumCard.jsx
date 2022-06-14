import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Renderiza os albums dos artistas buscados
export default class AlbumCard extends Component {
  render() {
    const { albumImage, albumName, artistName, albumId } = this.props;
    return (
      <div className="p-3 mb-2 w-[160px] h-[200px] rounded-md bg-r-cream">
        <Link to={ `/album/${albumId}` }>
          <div className="flex justify-center">
            <img className="w-[150px]" src={ albumImage } alt="thumbnail" />
          </div>
          <div>
            <p className="text-center text-r-dark font-semibold truncate">{albumName}</p>
          </div>
          <p className="text-center text-r-dark font-semibold truncate">{artistName}</p>
        </Link>
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
