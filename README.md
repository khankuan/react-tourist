# React Tourist
A library for in-app tour guide in React. Checkout the [example](http://khankuan.github.io/react-tourist) page.


## Creating a tour
```js
import Tour from 'react-tourist';
const tourItems = [
  { component: 'ExampleDiv1', ref: 'header', content: 'Hello World!' },
  { component: 'ExampleDiv2', ref: 'header', content: 'Bye World!' }
];
const myTour = new Tour(tourItems);
```

## Tour methods
Start (and automatically show tour)
```js
myTour.start({
  _auto: true,
  cb: () => { alert('Tour completed!') }
});
```

Trigger next item programmatically. For custom ([See more](#Tour item)), the onDone prop is passed in to the element. You can use that as an alternative to trigger the next action.
```js
myTour.next();
```

Reset
```js
myTour.reset();
```

Go to step
```js
myTour.goToStep(3);
```

Skip (ends the tour immediately). For custom ([See more](#Tour item)), the onSkip prop is passed in to the element. You can use that as an alternative to trigger the skip action.
```js
myTour.skip();
```

## Setting up React Components
Component displayName and refs are used to target the particular tour element.

Or es6
```js
@myTour.withTour
class ExampleDiv1 extends React.Component {
  render: function(){
    return (
      <h4 ref='header'>Hello world div!</h4>
    );
  }
}
expoxt const ExampleDiv1;
```

## Tour item
Can be either an object or a function with a callback

```js
{
  component: 'ExampleDiv1',
  ref: 'header',
  content: 'Hello World!'
  getElement: function(refNode){ return React.findDOMNode(refNode).children[0]; }
  style:  Tour.IndicatorStyle.cover
}
```

```js
function(cb){
  doWork().then(cb);
}
```
###  Tour item props
Properties of tour item object.
- component: Display Name of React component
- ref: React ref on the target element
- content: String or React Component
  - For String, a component `SimpleTourItem` is provided to render the tour item
  - For React Compoent, 2 function props are passed in (`onDone`, `onSkip`). The functions can be used by your custom component to continue or skip the tour
- style: An object containing React style ([See more](#Tour item prop style))
- doNotScroll: Do not automatically scroll to indicator position
- getElement: A function for customising the element to use for indicator
  - Sometimes you may want to use a particular children of a ref
```
{
  getElement: function(refComponent) {
    return React.findDOMNode(refComponent).children[0];
  }
}
```

#### Tour item prop style
Default ones are provided in `Tour.IndicatorStyle`. 3 styles are available: `IndicatorStyle.cover`, `IndicatorStyle.box`, `IndicatorStyle.pulse`

For `IndicatorStyle.pulse`, the position is assumed to be centered. 
```js
IndicatorStyle.makePulse('left', 'top') //  (`left`, `center`, `right` and `top`, `center`, `bottom`)
```

Default styles can be overwritten by your custom style props.
```js
IndicatorStyle.cover.overwrite({background: 'orange'})
```

Besides the default ones, you can use your own style object. The style is applied to a div that will overlay the element.
```js
{
  style: function (element){
    return {
      background: 'yellow',
      width: element.width + 'px'
      height: element.height/2 + 'px'
    };
  }
}
```



## Dev Instructions
==============================
- Init: `npm install`
- Develop: `npm run dev`
- Compile: `npm run compile`
- Compile for production: `npm run compile-prod`
- Deploy to gh-pages: `npm run build-example`
