import React from 'react'
import PauseIcon from './assets/PauseIcon'

const Pause = ({ handleClick,trackImage,trackName,trackArtist }) => {
    return (
        <button className="player__button" onClick={handleClick}>
            <PauseIcon trackImage={trackImage} trackName={trackName} trackArtist={trackArtist}/>
        </button>
    )
}

export default Pause
