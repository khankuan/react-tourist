import React from 'react';
import { myTour } from '../my-tour';
import CodeExample from './CodeExample.jsx';

const Page2 = React.createClass({

  mixins: [myTour.mixin],

  onDone (){
    if (window.myCallback){
      window.myCallback();
    }
  },

  render() {
    return (
      <div className='page'>

        {
          // Step 6
        }
        <div className='step'>
          <h4 className='step-header'>Step 6: Newly Mounted Components</h4>
          <p ref='step6'>
           In React, components are often not rendered at all. Page 2 was not mounted before we clicked on the link. React Tourist automatically tracks newly mounted components for you to continue the tour.
          </p>
          <CodeExample codeText={`
            {
              //  Step 6 - Tour item on a newly mounted component
              component: 'Page2',
              ref: 'step6',
              content: 'Example of a tour item on a newly mounted component (page 2)'
            }
          `} />
        </div>

        {
          // Step 7
        }
        <div className='step'>
          <h4 className='step-header'>Step 7: Custom Tour Items</h4>
          <p ref='step7'>
            The content attribute of each tour item takes in a string or a react component. The tour popups you have seen so far are string contents. However, you may want to customise the entire popup. Props including <em>onDone, onSkip</em> are provided to your component so you can call them when necessary.
          </p>
          <CodeExample codeText={`
            {
              //  Step 7 - Custom content
              component: 'Page2',
              ref: 'step7',
              content: CustomTourItem
            }
          `} />
        </div>

        {
          // Step 8
        }
        <div className='step'>
          <h4 className='step-header'>Step 8: Custom getElement Function</h4>
          <div ref='step8'>
            <p>The indicator and tour items uses the ref element as the base to computing where to display.</p>
            <p>However, you may want to use another element instead. An example will be to use a children element rather than the ref element itself. In this example, the first child element (only the first sentence) is used.</p>
          </div>
          <CodeExample codeText={`
            {
              //  Step 8 - Custom getElement function
              component: 'Page2',
              ref: 'step8',
              content: 'Example of a custom getElement function. This allows you to get any element relative to the ref element.',
              getElement: node => { return React.findDOMNode(node).children[0]; }
            }
          `} />
        </div>

        {
          // Step 9
        }
        <div className='step'>
          <h4 className='step-header'>Step 9: Function Calls</h4>
          <p ref='step9'>
            More than often, we want to do some processing in between tour items, such as preparing example data for users. Besides tour items (object containing step attributes), you can pass in a function as one of the step. A callback param is passed in to your function. It is required to execute the callback function when the step is done.
          </p>
          <p>
            <p>Click on the button to execute window.myCallback. We used window in this example page for simplicity sake.</p>
          </p>
          <CodeExample codeText={`
            //  Step 9 - Function call
            function(cb){
              window.myCallback = cb;
            }
          `} />
          <button onClick={this.onDone}>Trigger Callback</button>
        </div>

        {
          // Back Page 1
        }
        <div className='step'>
          <h4 className='step-header'>We're done!</h4>
          <p>
            That's all! Back to <a href='#/page1'>page 1</a>.
          </p>
        </div>


      </div>
    );
  }
});

export default Page2;

