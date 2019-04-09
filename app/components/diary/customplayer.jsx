import React from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';

const clientId = '5d9661a86a9450ffece7262aaf942d7f';
const resolveUrl = 'https://soundcloud.com/stepan-i-meduza-official/dolgo-obyasnyat';

class TrackInfo extends React.Component {
  render() {
    return (
      <div>
        <h2>track.title</h2>
        <h3>track.user.username</h3>
      </div>
    );
  }
}

class PlayPause extends React.Component {
  togglePlay() {
    let { playing, soundCloudAudio } = this.props;
    if (playing) {
      soundCloudAudio.pause();
    } else {
      soundCloudAudio.play();
    }
  }

  render() {
    let { playing } = this.props;
    let text = playing ? 'Pause' : 'Play';

    return (
      <button onClick={ this.togglePlay.bind(this) }>
        {text}
      </button>
    );
  }
}

class CustomPlayer extends React.Component {
  render() {
    return (
      <SoundPlayerContainer resolveUrl={ resolveUrl } clientId={ clientId }>
        <TrackInfo />
        <PlayPause />
      </SoundPlayerContainer>
    );
  }
}

export default CustomPlayer;
