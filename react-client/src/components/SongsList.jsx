import React from 'react';

class SongsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  componentDidMount() {
  }


  render () {
    const { names } = this.props;
    return (
    <div className="songsList">
      <div className="songList-title">Song List</div>
      {names.map( name => <div className="song-name">{name}</div>)}
    </div>
    )
  }
}

export default SongsList;