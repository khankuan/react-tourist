import React from 'react';
import Tour from 'react-tourist';

import CustomTourItem from './components/CustomTourItem.jsx';

const steps = [
  {
    //  Step 1 - Cover indicator
    component: 'Page1',
    ref: 'step1',
    content: 'Example of a \'cover\' (also default) style indicator',
    getStyle: Tour.IndicatorStyles.cover
  }, {
    //  Step 2 - Box indicator
    component: 'Page1',
    ref: 'step2',
    content: 'Example of a \'box\' style indicator',
    getStyle: Tour.IndicatorStyles.box
  }, {
    //  Step 3 - Pulse indicator
    component: 'Page1',
    ref: 'step3',
    content: 'Example of a \'pulse\' style indicator. Note that vertical/horizontal alignment can be changed (check docs).',
    getStyle: Tour.IndicatorStyles.pulse
  }, {
    //  Step 4 - Cover indicator overwritten
    component: 'Page1',
    ref: 'step4',
    content: 'Example of a \'cover\' style indicator that is overwritten.',
    getStyle: Tour.IndicatorStyles.cover.overwrite({background: '#2980b9'})
  }, {
    //  Step 5 - Custom indicator
    component: 'Page1',
    ref: 'step5',
    alignY: 'top',
    content: 'Example of a custom style indicator.',
    getStyle: mountNode => {  //  Underlines the component
      return {
        width: '12px',
        height: '12px',
        marginLeft: 'calc(50% - 8px)',
        marginTop: '-8px',
        backgroundColor: '#e74c3c',
        border: '3px solid #222',
        borderRadius: '100%',
        cursor: 'pointer',
        zIndex: '10000000',
        position: 'absolute'
      };
    }
  }, {
    //  Step 6 - Tour item on a newly mounted component
    component: 'Page2',
    ref: 'step6',
    content: 'Example of a tour item on a newly mounted component (page 2)'
  }, {
    //  Step 7 - Custom content
    component: 'Page2',
    ref: 'step7',
    content: CustomTourItem
  }, {
    //  Step 8 - Custom getElement function
    component: 'Page2',
    ref: 'step8',
    content: 'Example of a custom getElement function. This allows you to get any element relative to the ref element.',
    getElement: node => { return React.findDOMNode(node).children[0]; }
  },
    //  Step 9 - Function call
  function(cb){
    window.myCallback = cb;
  }
];

const myTour = new Tour(steps);
window.myTour = myTour;
export {myTour, steps};

