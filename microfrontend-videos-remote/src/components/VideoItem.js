import React from 'react'
import './VideoItem.css'

export default ({ video, onVideoSelect }) => {

  return (
    <div onClick={() => onVideoSelect(video)} className="video-item item">
      <img className="ui image" src={video.profile_image.small} />
      <div className="content">
        <div className="header">{video.first_name}</div>
      </div>
    </div>
  )
}
