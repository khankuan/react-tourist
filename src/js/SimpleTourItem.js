import React from 'react';

class SimpleTourItem extends React.Component {

  render() {
    const containerStyle = {
      background: 'white',
      padding: '20px',
      color: 'black',
      maxWidth: '300px'
    };

    const buttonStyle = {
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#3498db',
      margin: '12px'
    };

    return (
      <div style={containerStyle}>

        <p>{this.props.message}</p>

        <span
          className='simple-tour-item-button'
          style={buttonStyle}
          onClick={this.props.onSkip}>
          Skip
        </span>

        <span
          className='simple-tour-item-button'
          style={buttonStyle}
          onClick={this.props.onDone}>
          Next
        </span>

      </div>
    );
  }
}

SimpleTourItem.propTypes = {
  message: React.PropTypes.string,
  onSkip: React.PropTypes.func,
  onDone: React.PropTypes.func
};

export default SimpleTourItem;

