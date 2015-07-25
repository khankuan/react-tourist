import React from 'react';

export function becomeTourable(Component, tour) {
  const TourItem = React.createClass({
    componentDidMount() {
      tour.register(this.refs.component);
    },
    componentDidUpdate() {
      tour.register(this.refs.component);
    },
    componentWillUnmount() {
      tour.deregister(this.refs.component);
    },
    render() {
      return (
        <Component ref='component' {...this.props} {...this.state} />
      );
    }
  });
  return TourItem;
}
