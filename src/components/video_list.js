import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = props => {
  const videoItems = props.videos.map(el => {
    return (
      <VideoListItem
        onVideoSelect={props.onVideoSelect}
        key={el.etag}
        video={el} />
    );
  });
  return (
    <ul className="col-md-4 list-group">
    {videoItems}
    </ul>
  )
}

export default VideoList;
