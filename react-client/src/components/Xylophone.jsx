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
      names: ['yes'],
      recording: false,
      event: false,
    }
    this.playSynth = this.playSynth.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
    this.playSong = this.playSong.bind(this);
    this.switchClick = this.switchClick.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  componentDidMount() {  
  }

  renderNotes() {
    return (
      <div>{this.state.songs}</div>
    )
  }

  playSynth(e) {
    let note = e.target.innerText;
    if (this.state.recording) {
      this.setState( ({ songs }) => ({ songs: [...songs, note]}))
    }
    synth.triggerAttackRelease(note, '8n')
  }

  toggleRecord() {
    console.log(this.state.recording);
    this.setState( ({ recording }) => ({ recording: !recording }))
    console.log(this.state.songs);
  }

  playSong() {
    var seq = new Tone.Sequence( (time, note) => synth.triggerAttackRelease(note, "8n", time),this.state.songs, 0.5);
    seq.loop = 0;
    seq.start(0);
    Tone.Transport.start();
  }

  switchClick() {
    this.setState( ({ event }) => ({ event: !event }))
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
        <button type='button' onClick={this.playSong}>Play saved song</button>
        <button type='button' onClick={this.switchClick}>{event ? 'Switch to press mode' : 'Switch to hover mode'}</button>
      </div>
      <SongsList songs={songs} names={names} />
    </div>
    )
  }
}

export default Xylophone;