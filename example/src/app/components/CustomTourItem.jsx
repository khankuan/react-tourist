import React from 'react';

export default class CustomTourItem extends React.Component {

  static propTypes = {
    onDone: React.PropTypes.func
  }

  render() {
    const divStyle = {
      background: '#f39c12',
      padding: '1em',
      color: 'white'
    };

    const spanStyle = {
      display: 'block',
      textAlign: 'right',
      padding: '0.2em',
      cursor: 'pointer'
    };

    return (
      <div style={divStyle}>
        <span style={spanStyle} onClick={this.props.onDone}>X</span>
        This is a custom tour item!
      </div>
    );
  }
}

