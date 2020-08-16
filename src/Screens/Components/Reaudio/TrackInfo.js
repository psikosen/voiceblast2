import React, { Fragment } from 'react'

const TrackInfo = ({ trackName, trackArtist, trackImage, trackDate }) => {
    return (
        <div className="track-info">
            {trackImage && (
                <div className="track-image">
                    <img src={trackImage} alt={`${trackName}-${trackArtist}`} />
                </div>
            )}
            <div className="info-wrap">
                <span className="track-name">{trackName}</span>
                {trackArtist && (
                    <Fragment>
                        <span className="track-divider">&nbsp; - &nbsp;</span>
                        <span className="track-artist">{trackArtist} </span>
                        <span className="track-date">{trackDate}</span>
                        
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default TrackInfo
