import React from 'react';
import { myTour } from '../my-tour';
import {RouteHandler} from 'react-router';

class Header extends React.Component {

  constructor (){
    super();
    this.state = {};
  }

  startTour (){
    myTour.reset();
    myTour.start({cb: this.setComplete.bind(this, true)});
    this.setComplete(false);
  }

  setComplete (complete){
    this.setState({completed: complete});
  }

  render() {

    const style = {};
    if (this.state.completed){
      style.background = '#3498db';
    }

    return (
      <div>
        <div className='header' style={style}>
          <h3>Using React Tourist</h3>
          <p>This example page contains a simple article to guide you with using the library. The example tour uses elements in the article.</p>
          <button onClick={this.startTour.bind(this)}>
            {this.state.completed ? 'Restart Tour' : 'Start Tour'}
          </button>
        </div>
        <RouteHandler />
      </div>
    );
  }

}


export default Header;
