import React from 'react';
import { myTour } from '../my-tour';
import CodeExample from './CodeExample.jsx';

class Page1 extends React.Component {

  static displayName = 'Page1'

  render() {
    return (
      <div className='page'>

        {
          // Step 1
        }
        <div className='step'>
          <h4 className='step-header'>Step 1: Cover style Indicators</h4>
          <p ref='step1'>
            Indicators are used to catch user's attaction for the next tour item. Built-in ones are provided. The default style is <em>cover</em>.
          </p>
          <CodeExample codeText={`
            {\r\r
              //  Step 1 - Cover indicator\r
              component: 'Page1',\r
              ref: 'step1',\r
              content: 'Example of a "cover" (also default) style indicator',\r
              getStyle: Tour.IndicatorStyles.cover\r\r
            }\r
          `} />
        </div>

        {
          // Step 2
        }
        <div className='step'>
          <h4 className='step-header'>Step 2: Box style Indicators</h4>
          <p ref='step2'>
            Alternative indicator style.
          </p>
          <CodeExample codeText={`\r
            {\r\r
              //  Step 2 - Box indicator\r
              component: 'Page1',\r
              ref: 'step2',\r
              content: 'Example of a "box" style indicator',\r
              getStyle: Tour.IndicatorStyles.box\r\r
            }
          `} />
        </div>

        {
          // Step 3
        }
        <div className='step'>
          <h4 className='step-header'>Step 3: Pulse style Indicators</h4>
          <p ref='step3'>
            Alternative indicator style.
          </p>
          <CodeExample codeText={`
            {\r\r
              //  Step 3 - Pulse indicator\r
              component: 'Page1',\r
              ref: 'step3',\r
              content: 'Example of a "pulse" style indicator. Note that vertical/horizontal alignment can be changed (check docs).',\r
              getStyle: Tour.IndicatorStyles.pulse\r\r
            }
          `} />
        </div>

        {
          // Step 4
        }
        <div className='step'>
          <h4 className='step-header'>Step 4: Cover style Indicator with overwrites</h4>
          <p ref='step4'>
            Overwriting allows you to tweak the built-in indicators, such as changing the indicator background color.
          </p>
          <CodeExample codeText={`
            {\r\r
              //  Step 4 - Cover indicator overwritten\r
              component: 'Page1',\r
              ref: 'step4',\r
              content: 'Example of a "cover" style indicator that is overwritten.',\r
              getStyle: Tour.IndicatorStyles.cover.overwrite({background: '#2980b9'})\r
            }\r
          `} />
        </div>

        {
          // Step 5
        }
        <div className='step'>
          <h4 className='step-header'>Step 5: Custom style Indicator</h4>
          <p ref='step5'>
            Sometimes you may want your own indicator style. You can pass in a function instead for <em>getStyle</em>. The mounted node (the ref node) will be passed in. You can use it for calculations etc if required.
          </p>
         <CodeExample codeText={`
            {\r\r
              //  Step 5 - Custom indicator\r
              component: 'Page1',\r
              ref: 'step5',\r
              alignY: 'top',\r
              content: 'Example of a custom style indicator.',\r
              getStyle: mountNode => {  //  Underlines the component\r
                return {\r
                  width: '16px',\r
                  height: '16px',\r
                  marginLeft: '-10px',\r
                  marginTop: '-10px',\r
                  backgroundColor: 'red',\r
                  border: '3px solid #444',\r
                  borderRadius: '100%',\r
                  cursor: 'pointer',\r
                  zIndex: '10000000',\r
                  position: 'absolute'\r
                };\r\r
            }
          `} />
        </div>

        {
          // Next Page
        }
        <div className='step'>
          <h4 className='step-header'>Next..</h4>
          <p>
            In step 6, we will demo a tour item for a newly mounted component. Go to <a href='#/page2'>page 2</a>.
          </p>
        </div>

      </div>
    );
  }
}

//  TODO: Using this because of bug in babel: https://github.com/babel/babel/issues/2702
export default myTour.withTour(Page1);

