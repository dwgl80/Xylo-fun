import React from 'react';

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  componentDidMount() {
  }


  render () {
    const { note, playSynth, index } = this.props;
    return (
    <div className={note} onClick={(e) => playSynth(e)}>
      {note}
    </div>)
  }
}

export default Bar;