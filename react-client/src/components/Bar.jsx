import React from 'react';

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
    this.renderBar = this.renderBar.bind(this);
  }

  renderBar() {
    const { note, playSynth, event } = this.props;
    if (!event) {
      return (
        <div className={`note-click ${note}`} onClick={(e) => playSynth(e)}>
          <div>
            {note}
          </div>
        </div>
      )
    } else {
      return (
        <div className={`note-hover ${note}`} onMouseEnter={(e) => playSynth(e)}>
          <div>
            {note}
          </div>
        </div>
      )
    }
  }

  render () {
    return (
    this.renderBar()
    )
  }
}

export default Bar;