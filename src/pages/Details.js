import React, {useState, useContext, useEffect} from 'react'
import Metronome from '@kevinorriss/react-metronome'
import Header from '../components/Header'
import Search from '../components/Search'
import { Token } from '../Token'
import './Details.css'
import Looper from '../components/Looper'

function Details() {
    const pathname = window.location.pathname;
    let subString = pathname.substring(1);
    let id = subString.split('/')[1];

    const {token} = useContext(Token);
    const [details, setDetails] = useState();
    const [track, setTrack] = useState();

    const mode = {
        "0": "Minor",
        "1": "Major"
    }
    const pitchClass = {
        "0": "C",
        "1": "C#/Db",
        "2": "D",
        "3": "D#/Eb",
        "4": "E",
        "5": "F",
        "6": "F#/Gb",
        "7": "G",
        "8": "G#/Ab",
        "9": "A",
        "10": "A#/Bb",
        "11": "B"
    }
    const majorDegrees = {
        "C": "C, D, E, F, G, A, B",
        "C#/Db": "C#/Db, D#/Eb, F, F#/Gb, G#/Ab, A#/Bb, C",
        "D": "D, E, F#/Gb, G, A, B, C#/Db",
        "D#/Eb": "D#/Eb, F, G, G#/Ab, A#/Bb, C#/Db, D",
        "E": "E, F#/Gb, G#/Ab, A, B, C#/Db, D#/Eb",
        "F": "F, G, A, A#/Bb, C, D, E",
        "F#/Gb": "F#/Gb, G#/Ab, A#/Bb, B, C#/Db, D#/Eb, F",
        "G": "G, A, B, C, D, E, F#/Gb",
        "G#/Ab": "G#/Ab, A#/Bb, C, C#/Db, D#/Eb, F, G",
        "A": "A, B, C#/Db, D, E, F#/Gb, G#/Ab",
        "A#/Bb": "A#/Bb, C, D, D#/Eb, F, G, A",
        "B": "B, C#/Db, D#/Eb, E, F#/Gb, G#/Ab, A#/Bb"
    }
    const minorDegrees = {
        "C": "C, D, D#/Eb, F, G, G#/Ab, A#/Bb",
        "C#/Db": "C#/Db, D#/Eb, E, F#/Gb, G#/Ab, A, B",
        "D": "D, E, F, G, A, A#/Bb, C",
        "D#/Eb": "D#/Eb, F, F#/Gb, G#/Ab, A#/Bb, B, C#/Db",
        "E": "E, F#/Gb, G, A, B, C, D",
        "F": "F, G, G#/Ab, A#/Bb, C, C#/Db, D#/Eb",
        "F#/Gb": "F#/Gb, G#/Ab, A, B, C#/Db, D, E",
        "G": "G, A, A#/Bb, C, D, D#/Eb, F",
        "G#/Ab": "G#/Ab, A#/Bb, B, C#/Db, D#/Eb, E, F#/Gb",
        "A": "A, B, C, D, E, F, G",
        "A#/Bb": "A#/Bb, C, C#/Db, D#/Eb, F, F#/Gb, G#/Ab",
        "B": "B, C#/Db, D, E, F#/Gb, G, A"
    }

    const getDetails = (id) => {
        fetch('https://api.spotify.com/v1/audio-features/' + id, {
                    method: 'GET',
                    headers: {'Authorization' : 'Bearer ' + token.access_token}
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    else {
                        return response.json();
                    }
                })
                .then(result => {
                    setDetails(result)
                })
                .catch(error => console.log('API failure' + error));
    }

    const getTrack = (id) => {
        fetch('https://api.spotify.com/v1/tracks/' + id, {
                    method: 'GET',
                    headers: {'Authorization' : 'Bearer ' + token.access_token}
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    else {
                        return response.json();
                    }
                })
                .then(result => {
                    setTrack(result)
                })
                .catch(error => console.log('API failure' + error));
    }

    useEffect(() => {
        token && getDetails(id);
        token && getTrack(id);
    }, [id])

    return (
        <div className='details-root'>
            <Header />
            <div className='details-content'>
                <Search/>
                {track && <div className='details-title'>{track.name + ' by: ' + track.artists[0].name}</div>}
                <div className='key-bpm'>
                    {details && <div className='details-bpm'>{'BPM: ' + details.tempo}</div>}
                    {details && <div className='details-key'>{'Key: ' + pitchClass[details.key] + ' ' + mode[details.mode]}</div>}
                </div>
                {details && details.mode === 0 ? 
                    <div className='details-degrees'>{minorDegrees[pitchClass[details.key]]}</div>
                    : 
                    <></>
                }
                {details && details.mode === 1 ? 
                    <div className='details-degrees'>{majorDegrees[pitchClass[details.key]]}</div>
                    : 
                    <></>
                }
            </div>
            <div className='metronome'>
                <Metronome/>
            </div>
            <Looper />
        </div>
    )
}

export default Details
