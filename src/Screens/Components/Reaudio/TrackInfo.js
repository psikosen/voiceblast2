import React, { Fragment } from 'react'

const TrackInfo = ({ trackName, trackArtist, trackImage, trackDate, viewOnly,views, 
                              checkOutUsersProfile, goToIndividualVoiceBlast }) => {
    return (
        <div className="track-info">
            {trackImage && (
                <div className="track-image">
                    <img src={trackImage} alt={`${trackName}-${trackArtist}`} />
                </div>
            )}
            <div className="info-wrap">
                {viewOnly ?
                 <span style={{color:'green'}}  className="track-name" onClick ={goToIndividualVoiceBlast} >{trackName}</span>:
                 <span className="track-name">{trackName}</span>
                }
                {trackArtist && (
                    <Fragment>
                        <span className="track-divider">&nbsp; - &nbsp;</span>

                        {viewOnly?
                          <span onClick={checkOutUsersProfile} 
                                style={{color:'skyblue'}}
                                className="track-artist">{trackArtist} </span>:
                          <span className="track-artist">{trackArtist} </span>
                        }
                        <span className="track-date">{trackDate}</span> 
                        <span className ="track-artist"> {views} </span>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default TrackInfo
