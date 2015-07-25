import React from 'react';
import { myTour } from '../my-tour';
import CodeExample from './CodeExample.jsx';

const Page1 = React.createClass({

  mixins: [myTour.mixin],

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
            {
              //  Step 1 - Cover indicator
              component: 'Page1',
              ref: 'step1',
              content: 'Example of a \'cover\' (also default) style indicator',
              getStyle: Tour.IndicatorStyles.cover
            }
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
          <CodeExample codeText={`
            {
              //  Step 2 - Box indicator
              component: 'Page1',
              ref: 'step2',
              content: 'Example of a \'box\' style indicator',
              getStyle: Tour.IndicatorStyles.box
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
            {
              //  Step 3 - Pulse indicator
              component: 'Page1',
              ref: 'step3',
              content: 'Example of a \'pulse\' style indicator. Note that vertical/horizontal alignment can be changed (check docs).',
              getStyle: Tour.IndicatorStyles.pulse
            }
          `} />
        </div>

        {
          // Step 4
        }
        <div className='step'>
          <h4 className='step-header'>Step 4: Pulse style Indicator with overwrites</h4>
          <p ref='step4'>
            Overwriting allows you to tweak the built-in indicators, such as changing the indicator background color.
          </p>
          <CodeExample codeText={`
            {
              //  Step 4 - Cover indicator overwritten
              component: 'Page1',
              ref: 'step4',
              content: 'Example of a \'cover\' style indicator that is overwritten.',
              getStyle: Tour.IndicatorStyles.cover.overwrite({background: '#2980b9'})
            }
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
            {
              //  Step 5 - Custom indicator
              component: 'Page1',
              ref: 'step5',
              alignY: 'top',
              content: 'Example of a custom style indicator.',
              getStyle: mountNode => {  //  Underlines the component
                return {
                  width: '16px',
                  height: '16px',
                  marginLeft: '-10px',
                  marginTop: '-10px',
                  backgroundColor: 'red',
                  border: '3px solid #444',
                  borderRadius: '100%',
                  cursor: 'pointer',
                  zIndex: '10000000',
                  position: 'absolute'
                };
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
});

export default Page1;
