import React from 'react'

const PauseIcon = ({trackImage,trackName,trackArtist}) => {
    return (
      <div className="img-overlay-wrap">
        <div className="track-image">
         <img src={trackImage} alt={`${trackName}-${trackArtist}`} />
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-pause-circle"
            viewBox="0 0 24 24" >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M10 15L10 9"></path>
            <path d="M14 15L14 9"></path>
        </svg>
        </div>
     </div>
    )
}

export default PauseIcon
