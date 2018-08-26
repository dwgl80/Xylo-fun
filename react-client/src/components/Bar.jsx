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
    const { note, playSynth } = this.props;
    return (
    <div className={`note ${note}`} onClick={(e) => playSynth(e)}>
      <div>
      {note}
      </div>
    </div>)
  }
}

export default Bar;