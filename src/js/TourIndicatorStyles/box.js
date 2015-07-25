import {merge} from '../helpers';

function box (style) {
  return mountNode => {
    return merge({
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      animation: 'glow 1s infinite ease-out',
      WebkitAnimation: 'glow 1s infinite ease-out',
      MozAnimation: 'glow 1s infinite ease-out',
      border: '4px solid red',
      marginTop: '-4px',
      marginLeft: '-4px',
      cursor: 'pointer'
    }, style);
  };
}

const indicatorStyle = box();
indicatorStyle.overwrite = box;
export default indicatorStyle;
