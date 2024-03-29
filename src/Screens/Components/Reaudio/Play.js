import React from 'react'
import PlayIcon from './assets/PlayIcon'

const Play = ({ handleClick, trackImage,trackName,trackArtist }) => {
    return (
        <button className="player__button" onClick={handleClick}>
            <PlayIcon trackImage={trackImage} trackName={trackName} trackArtist={trackArtist} />
        </button>
    )
}

export default Play
