import React from 'react';

export function withTour(Component, tour) {
  return class WithTour extends React.Component {
    componentDidMount() {
      tour.register(this.refs.component);
    }
    componentDidUpdate() {
      tour.register(this.refs.component);
    }
    componentWillUnmount() {
      tour.deregister(this.refs.component);
    }
    render() {
      return (
        <Component ref='component' {...this.props} />
      );
    }
  };
}
