import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_key = 'AIzaSyBM75s6Ru18ZxXvgjS9lD1UgZydLw-TeFo';


// create a new component, that should produce html
// App was functional component but because it has
// to keep track of the videos, it has to be
// a class based component

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('longboard');
  }

  videoSearch(term) {
    YTSearch({key: API_key, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
      const videoSearch = _.debounce(term => {this.videoSearch(term)}, 500);
      return (
        <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
        </div>
      );
    }
}

//take this component's generated html and put it on the page (in the DOM)

ReactDOM.render(<App />, document.querySelector('.container'));
