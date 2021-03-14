import React, {useState} from 'react'
import ReactPlayer from 'react-player'
import './Looper.css'

function Looper() {
    const [url, setUrl] = useState('')

    return (
        <div className='video-root'>
            <input autoComplete='off' className='url' onChange={e => setUrl(e.target.value)} placeholder='please enter a youtube url'/>
            <ReactPlayer url={url} className='video' controls={true}/>
        </div>
        
    )
}

export default Looper
