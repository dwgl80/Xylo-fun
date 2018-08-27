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
    const { names, getSong } = this.props;
    return (
    <div className="songsList">
      <div className="songList-title">Song List</div>
      {names.map( (name, index) => <div className="song-name" key={index} onClick={(e) => getSong(e)}>{name}</div>)}
    </div>
    )
  }
}

export default SongsList;