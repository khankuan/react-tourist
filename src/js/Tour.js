import React from 'react';
import SimpleTourItem from './SimpleTourItem';
import TourIndicator from './TourIndicator';
import TourIndicatorStyles from './TourIndicatorStyles';
import { withTour } from './lib';

let globalPendingTours = [];
let globalTouring = null;
const hasDocument = typeof document !== undefined;

class Tour {

  constructor (steps) {
    this._tourables = {};
    this._steps = steps;
    this._currentStep = -1;
    this._pending = false;  //  If item not rendered and waiting

    //  Add tour div
    if (hasDocument) {
      this._tourDiv = document.createElement('div');
      document.body.appendChild(this._tourDiv);
    }

    //  Generate mixin
    this._generateMixin();
    this.withTour = this.withTour.bind(this);
  }

  register (component) {
    if (!hasDocument) {
      return;
    }

    const name = component.constructor.displayName || component.constructor.name || component.name;
    this._tourables[name] = component;
    if (this._pending){
      this._checkRender();
    }
  }

  deregister (component) {
    if (!hasDocument) {
      return;
    }

    const name = component.constructor.displayName || component.constructor.name || component.name;
    delete this._tourables[name];

    //  Retract if current component is dead and gone
    if (this._steps && this._steps[this._currentStep] && name === this._steps[this._currentStep].component){
      this._pending = true;
    }
  }

  withTour (component) {
    return withTour(component, this);
  }

  start (opts) {
    if (this._currentStep !== -1){
      this.reset();
    }

    //  If already touring, all to queue
    if (globalTouring){
      globalPendingTours.push({tour: this, opts});
      return;
    }

    globalTouring = this;

    opts = opts || {};
    this._auto = opts.auto;
    this.next();
    this._cb = opts.cb;
  }

  reset () {
    const step = this._steps[this._currentStep];
    this._unmountIndicator(step);
    React.unmountComponentAtNode(this._tourDiv);

    this._currentStep = -1;
    this._pending = false;
    this._functionCalling = false;

    if (globalTouring === this){
      globalTouring = null;
    }
  }

  next () {
    this.goToStep(this._currentStep + 1);
  }

  goToStep (stepIndex) {
    this._unmountIndicator();
    const step = this._steps[stepIndex];
    this._currentStep = stepIndex;
    try {
      React.unmountComponentAtNode(this._tourDiv);
    } catch(err){}

    if (!step){
      if (this._cb){
        this._cb();
      }

      globalTouring = null;

      //  Check next global tour
      if (globalPendingTours.length){
        const nextTour = globalPendingTours[0];
        globalPendingTours.splice(0, 1);
        nextTour.tour.start(nextTour.opts);
      }

      return;
    }

    this._pending = true;
    this._checkRender();
  }

  skip () {
    const step = this._steps[this._currentStep];
    this._unmountIndicator(step);
    React.unmountComponentAtNode(this._tourDiv);

    this._currentStep = this._steps.length - 1;
    this._pending = false;
    this.next();
  }

  _checkRender () {
    const step = this._steps[this._currentStep];

    //  If step is a function
    if (typeof step === 'function' && !this._functionCalling){
      this._functionCalling = true;
      step(() => {
        this._functionCalling = false;
        this._pending = false;
        this.next();
      });
      return;
    }

    //  If have next step
    if (step && this._pending){
      this._mountIndicator(step);
      if (this._auto){
        this._mountTourItem(step);
      }
    }
  }



  _prepareMountTourItem () {
    const step = this._steps[this._currentStep];
    this._mountTourItem(step);
  }

  _getStepMountNode (step) {
    try {
      const getElement = step.getElement || (x => { return React.findDOMNode(x); });
      return getElement(this._tourables[step.component].refs[step.ref]);
    } catch (err){
      return null;
    }
  }


  _mountTourItem (step) {
    let mountNode = this._getStepMountNode(step);
    if (!mountNode){
      return;
    }

    //  Style
    let boundingBox = mountNode.getBoundingClientRect();
    let style = {};
    style.position = 'absolute';
    style.zIndex = 10000000;

    //  Style position
    let left;
    if (step.alignX === 'left'){
      left = 0;
    } else if (step.alignX === 'right'){
      left = boundingBox.width;
    } else {
      left = boundingBox.width / 2;
    }
    let top;
    if (step.alignY === 'top'){
      top = 0;
    } else if (step.alignY === 'bottom'){
      top = boundingBox.height;
    } else {
      top = boundingBox.height / 2;
    }

    style.left = boundingBox.left + left;
    style.top = boundingBox.top + top;

    //  Prepare tour item
    let mountContent = step.content;
    if (typeof mountContent === 'string'){
      mountContent = (
        <SimpleTourItem
          message={mountContent}
          onDone={this.next.bind(this)}
          onSkip={this.skip.bind(this)} />
      );
    } else {
      mountContent = React.createElement(mountContent, {
        onDone: this.next.bind(this),
        onSkip: this.skip.bind(this)
      });
    }

    const tourItem = (
      <div className='tourist-backdrop'>
        <div style={style}>
          {mountContent}
        </div>
      </div>
    );

    //  Adjust position
    React.render(tourItem, this._tourDiv, () => {

      //  Push position if out of window
      const node = this._tourDiv.children[0].children[0];
      const nodeRect = node.getBoundingClientRect();

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const padding = 15;
      if (nodeRect.top + nodeRect.height + padding > windowHeight){
        node.style.top = (nodeRect.top - nodeRect.height) + 'px';
      }
      if (nodeRect.left + nodeRect.width + padding > windowWidth){
        node.style.left = (nodeRect.left - nodeRect.width) + 'px';
      }
    });
  }


  _mountIndicator (step) {
    let mountNode = this._getStepMountNode(step);
    if (!mountNode){
      return;
    }

    //  Create indicator mount node that covers the whole element
    const rect = mountNode.getBoundingClientRect();

    //  Sum all scrolls
    let extraX = 0;
    let extraY = 0;
    let parent = mountNode.parentElement;
    while (parent){
      extraX += parent.scrollLeft;
      extraY += parent.scrollTop;
      parent = parent.parentElement;
    }

    mountNode._tourIndicator = document.createElement('div');
    mountNode._tourIndicator.style.width = rect.width + 'px';
    mountNode._tourIndicator.style.height = rect.height + 'px';
    mountNode._tourIndicator.style.left = (rect.left + extraX) + 'px';
    mountNode._tourIndicator.style.top = (rect.top + extraY) + 'px';
    mountNode._tourIndicator.style.position = 'absolute';
    mountNode.appendChild(mountNode._tourIndicator);

    const style = (step.getStyle || TourIndicatorStyles.cover)(mountNode);

    //  Prepare tour item
    const tourIndicator = (
      <TourIndicator
        style={style}
        className={step.className}
        onClick={this._prepareMountTourItem.bind(this)} />
    );

    React.render(tourIndicator, mountNode._tourIndicator, () => {
      //  Animate to scroll height if needed
      if (!step.doNotScroll){
        const scrollX = mountNode._tourIndicator.offsetLeft - (window.innerWidth / 2);
        const scrollY = mountNode._tourIndicator.offsetTop - (window.innerHeight / 2);
        this._scrollTo(scrollX, scrollY, 200);
      }
    });
    this._pending = false;
  }

  _unmountIndicator () {
    const step = this._steps[this._currentStep];
    if (step && this._tourables[step.component] && this._tourables[step.component].refs[step.ref]){
      const getElementFunc = step.getElement || (x => {return x.getDOMNode(); });
      try {
        React.unmountComponentAtNode(getElementFunc(this._tourables[step.component].refs[step.ref])._tourIndicator);
      } catch(err) {
        return;
      }
    }
  }

  _generateMixin () {
    const tour = this;
    this.mixin = {
      componentDidMount () {
        tour.register(this);
      },
      componentDidUpdate () {
        tour.register(this);
      },
      componentWillUnmount () {
        tour.deregister(this);
      }
    };
  }

  //  http://jsfiddle.net/62MTU/15/
  _scrollTo (x, y, duration) {
    const changeX = x - window.scrollX;
    const changeY = y - window.scrollY;
    let currentTime = 0;
    const increment = 10;
    function easeInOutQuad (t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return c / 2 * t * t + b;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    const animateScroll = function(){
        currentTime += increment;
        const valX = easeInOutQuad(currentTime, x, changeX, duration);
        const valY = easeInOutQuad(currentTime, y, changeY, duration);
        window.scrollTo(valX - changeX, valY - changeY);
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
  }

}

Tour.IndicatorStyles = TourIndicatorStyles;

export default Tour;
