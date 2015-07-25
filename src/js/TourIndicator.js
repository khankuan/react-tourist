import React from 'react';

class TourIndicator extends React.Component {

  _handleClick(e) {
    e.stopPropagation();
    if (this.props.onClick){
      this.props.onClick(e);
    }
  }

  render() {
    return (
      <div
        {...this.props}
        onClick={this._handleClick.bind(this)}>
      </div>
    );
  }
}

TourIndicator.propTypes = {
  onClick: React.PropTypes.func
};

export default TourIndicator;
