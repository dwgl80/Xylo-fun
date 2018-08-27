import React from 'react';
import Bar from './Bar.jsx';
import axios from 'axios';
import Tone from 'tone';
import SongsList from './SongsList.jsx'

const synth = new Tone.Synth().toMaster()

class Xylophone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
      songs: [],
      currSong: [],
      names: [],
      recording: false,
      event: false,
    }
    this.playSynth = this.playSynth.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
    this.playSong = this.playSong.bind(this);
    this.switchClick = this.switchClick.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
    this.nameSong = this.nameSong.bind(this);
    this.saveSong = this.saveSong.bind(this);
    this.getNames = this.getNames.bind(this);
    this.getSong = this.getSong.bind(this);
  }

  componentDidMount() {  
    this.getNames();
  }

  getNames() {
    axios.get('/songs/name')
      .then( res => this.setState( ({ names }) => ({ names: res.data })))
      .catch( err => console.log(err));
  }

  saveSong(name, song) {
    axios.post('/songs/save', { name: name, song: song })
      .then( res => console.log('you saved the song!'))
      .catch( err => console.log(err));
  }

  getSong(e) {
    let name = e.target.innerText;
    axios.get('/songs/song', {params: { name: name }})
      .then( res => {
        let song = res.data.song;
        this.playSong(song);
      })
      .catch( err => console.log(err));
  } 

  renderNotes() {
    return (
      <div>{this.state.currSong}</div>
    )
  }

  playSynth(e) {
    let note = e.target.innerText;
    if (this.state.recording) {
      this.setState( ({ currSong }) => ({ currSong: [...currSong, note]}));
    }
    synth.triggerAttackRelease(note, '8n')
  }

  toggleRecord() {
    if (this.state.recording) {
      let name = this.nameSong();
      console.log(name, this.state.currSong);
      if (name) {
        this.saveSong(name, this.state.currSong);
      }
      this.setState( ({ currSong }) => ({ currSong: []}));
    }
    this.setState( ({ recording }) => ({ recording: !recording }));
  }

  playSong(song = this.state.currSong) {
    var seq = new Tone.Sequence( (time, note) => synth.triggerAttackRelease(note, "8n", time), song, 0.5);
    seq.loop = 0;
    seq.start(0);
    Tone.Transport.start();
  }

  switchClick() {
    this.setState( ({ event }) => ({ event: !event }));
  }

  nameSong() {
    let songName = prompt("Name your song bitch!", "")
    this.setState( ({ names }) => ({ names: [...names, songName]}));
    return songName;
  }


  render () {
    const { notes, songs, event, recording, names } = this.state;
    return (
    <div>
      <div className="cursor"></div>
      <h1>Xylo-Fun</h1>
      <div className="container">
        <div className="notes">
          {notes.map( (note, index) => <Bar key={index} note={note} event={event} playSynth={this.playSynth} />)}
        </div>
    </div>
    {recording ? <div className='recording'>Recording...</div> : null}
    {recording ? this.renderNotes() : null}
      <div>
        <button type='button' onClick={this.toggleRecord}>Record</button>
        <button type='button' onClick={() => this.playSong()}>Playback</button>
        <button type='button' onClick={this.switchClick}>{event ? 'Switch to press mode' : 'Switch to hover mode'}</button>
      </div>
      <SongsList songs={songs} names={names} getSong={this.getSong}/>
    </div>
    )
  }
}

export default Xylophone;