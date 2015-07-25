import {merge} from '../helpers';

function cover (style) {
  return mountNode => {
    return merge({
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      borderRadius: 0,
      animation: 'glow 1s infinite ease-out',
      WebkitAnimation: 'glow 1s infinite ease-out',
      MozAnimation: 'glow 1s infinite ease-out',
      background: 'red',
      cursor: 'pointer'
    }, style);
  };
}

const indicatorStyle = cover();
indicatorStyle.overwrite = cover;
export default indicatorStyle;
