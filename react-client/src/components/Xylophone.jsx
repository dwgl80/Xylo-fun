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
      recording: false
    }
    this.playSynth = this.playSynth.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
    this.playSong = this.playSong.bind(this);
    this.playNote = this.playNote.bind(this);
  }

  componentDidMount() {
    
  }

  playSynth(e) {
    let note = e.target.innerText;
    if (this.state.recording) {
      this.setState( ({ songs }) => ({ songs: [...songs, note]}))
    }
    synth.triggerAttackRelease(note, '8n')
  }

  playNote(note) {
    synth.triggerAttackRelease(note, '8n');
  }

  toggleRecord() {
    console.log(this.state.recording);
    this.setState( ({ recording }) => ({ recording: !recording }))
    console.log(this.state.songs);
  }

  playSong() {
    // let playlist = [];
    // for (let i = 0; i < this.state.songs.length; i++) {
    //   playlist.push([i, this.state.songs[i]]);
    // }
    var seq = new Tone.Sequence( (time, note) => synth.triggerAttackRelease(note, "8n", time),this.state.songs, 0.5);
    seq.loop = 0;
    seq.start(0);
    Tone.Transport.start();
  }


  render () {
    const { notes, songs } = this.state;
    return (
    <div>
      <h1>Xylo-Fun</h1>
      <div>
        <SongsList songs={songs} />
      </div>
    <div className="container">
      {notes.map( (note, index) => <Bar key={index} note={note} playSynth={this.playSynth} />)}
    </div>
    <div>
      <button type='button' onClick={this.toggleRecord}>Record</button>
      <button type='button' onClick={this.playSong}>Play saved song</button>
      </div>
      </div>
    )
  }
}

export default Xylophone;