import React, { useState, useEffect, useRef } from 'react'
import TrackInfo from './TrackInfo'
import Play from './Play'
import Pause from './Pause'
import Bar from './Bar'

const Player = ({
    source,
    slug,
    trackName,
    trackArtist,
    trackImage,
    trackDate,
    loop,
    preload,
    showTrackInfo,
    togglePlay,
    index,
    isCurrent
}) => {
    const audioRef = useRef()

    const [duration, setDuration] = useState()
    const [curTime, setCurTime] = useState()
    const [playing, setPlaying] = useState(false)
    const [clickedTime, setClickedTime] = useState()

    // check if source is a single string, if so convert to array
    if (!Array.isArray(source) && String(source) === source) {
        source = source.split()
    }

    useEffect(() => {
        const audio = audioRef.current

        // state setters
        const setAudioData = async () => {

            while(audio.duration === Infinity) {
              await new Promise(r => setTimeout(r, 10));
              audio.currentTime = 10000000*Math.random();
            }

            let duration = audio.duration ;
 
            var newDuration = parseTime(duration).trim();

            setDuration(newDuration);
            setCurTime(audio.currentTime)
        }

        const setAudioTime = () => setCurTime(audio.currentTime)

        // DOM listeners: update React state on DOM events
        audio.addEventListener('loadeddata', setAudioData)
        audio.addEventListener('timeupdate', setAudioTime)

        if (clickedTime && clickedTime !== curTime) {
            audio.currentTime = clickedTime
            setClickedTime(null)
        }

        // effect cleanup
        return () => {
            audio.removeEventListener('loadeddata', setAudioData)
            audio.removeEventListener('timeupdate', setAudioTime)
        }
    }, [clickedTime, curTime])

   const parseTime = (time) => { // send time in seconds
    // eslint-disable-next-line 

    let hours = parseInt(time / 60 / 60), 
        mins = Math.abs(parseInt(time / 60) - (hours * 60)), 
        seconds = Math.round(time % 60);
   
    return isNaN(hours) || isNaN(mins) || isNaN(seconds) ? `00:00:01` :
           `${hours > 9 ?Math.max(hours, 0):'0'+Math.max(hours, 0)}:
            ${mins > 9 ?Math.max(mins, 0):'0'+Math.max(0, mins)}:
            ${seconds > 9 ?Math.max(0, seconds):'0'+Math.max(0, seconds)}`;

    }
   
    return (
        <div className="player">
            <audio id={slug} ref={audioRef} loop={loop} preload={preload}>
                {source &&
                    source.map((src, i) => {
                        return <source key={i} src={src} />
                    })}
                Your browser does not support the <code>audio</code> element.
            </audio>

            <div className="controls">
                {playing && isCurrent ? (
                    <Pause
                        handleClick={() => {
                            setPlaying(false)
                            togglePlay(slug, index)
                        }}
                    />
                ) : (
                    <Play
                        handleClick={() => {
                            setPlaying(true)
                            togglePlay(slug, index)
                        }}
                    />
                )}
                {showTrackInfo && (
                    <TrackInfo
                        trackName={trackName}
                        trackArtist={trackArtist}
                        trackDate = {trackDate}
                        trackImage={trackImage ? trackImage : null}
                    />
                )}
                  <span>
                    {duration }
                 </span>   
            </div>
        </div>
    )
}

Player.defaultProps = {
    source: 'https://studio.bio/reaudio/iiwii.mp3',
    showTrackInfo: true,
    trackName: 'Unknown',
    trackArtist: 'Unknown Artist',
    loop: false,
    preload: 'auto'
}

export default Player
