import React from 'react';
import { myTour } from '../my-tour';
import CodeExample from './CodeExample.jsx';

class Page2 extends React.Component {

  static displayName = 'Page2'

  onDone (){
    if (window.myCallback){
      window.myCallback();
    }
  }

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
            {\r\r
              //  Step 6 - Tour item on a newly mounted component\r
              component: 'Page2',\r
              ref: 'step6',\r
              content: 'Example of a tour item on a newly mounted component (page 2)'\r\r
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
            {\r\r
              //  Step 7 - Custom content\r
              component: 'Page2',\r
              ref: 'step7',\r
              content: CustomTourItem\r\r
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
            {\r\r
              //  Step 8 - Custom getElement function\r
              component: 'Page2',\r
              ref: 'step8',\r
              content: 'Example of a custom getElement function. This allows you to get any element relative to the ref element.',\r
              getElement: node => { return React.findDOMNode(node).children[0]; }\r\r
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
            //  Step 9 - Function call\r
            function(cb){\r
              window.myCallback = cb;\r
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
}

//  TODO: Using this because of bug in babel: https://github.com/babel/babel/issues/2702
export default myTour.withTour(Page2);

