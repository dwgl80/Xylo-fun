import React from 'react';
import Bar from './Bar.jsx';
import axios from 'axios';
import Tone from 'tone';

const synth = new Tone.Synth().toMaster()

class Xylophone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
      songs: '',
      recording: false
    }
    this.playSynth = this.playSynth.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
  }

  componentDidMount() {
  }

  playSynth(e) {
    let note = e.target.innerText;
    console.log(note);
    synth.triggerAttackRelease(note, '8n')
  }

  toggleRecord() {
    // console.log(this.state.recording);
    this.setState( ({ recording }) => ({ recording: !recording }))
  }


  render () {
    const { notes } = this.state;
    return (
    <div>
    <div>
      <h1>Xylo-Fun</h1>
      {notes.map( (note, index) => <Bar index={index} note={note} playSynth={this.playSynth} />)}
    </div>
    <div>
      <button type='button' onClick={this.toggleRecord}>Record</button>
      </div>
      </div>

    )
  }
}

export default Xylophone;