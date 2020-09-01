import React, { Fragment } from 'react'

const TrackInfo = ({ trackName, trackArtist, trackDate, viewOnly,views, 
                              checkOutUsersProfile, goToIndividualVoiceBlast }) => {
    return (
        <div  >
            <div  >
                {viewOnly ?
                 <span style={{color:'green'}}   onClick ={goToIndividualVoiceBlast} >{trackName}</span>:
                 <span className="track-name">{trackName}</span>
                }

                {trackArtist && (
                    <Fragment>
                        <span>&nbsp; - &nbsp;</span>

                        {viewOnly?
                          <span onClick={checkOutUsersProfile} 
                                style={{color:'skyblue'}}
                                >{trackArtist} </span>:
                          <span  >{trackArtist} </span>
                        }
                        <span>{trackDate}</span> 
                        <span> {views} </span>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default TrackInfo
