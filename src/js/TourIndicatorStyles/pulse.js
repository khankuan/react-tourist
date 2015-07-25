import {merge} from '../helpers';


export function makePulse (alignX='center', alignY='center') {
  function pulseWithStyle(mergeStyle){
    return mountNode => {
      const style = merge({
        width: '60px',
        height: '60px',
        marginLeft: '-30px',
        marginTop: '-30px',
        animation: 'pulse 1s infinite ease-out',
        WebkitAnimation: 'pulse 1s infinite ease-out',
        MozAnimation: 'pulse 1s infinite ease-out',
        backgroundColor: 'red',
        borderRadius: '100%',
        cursor: 'pointer',
        zIndex: '10000000',
        position: 'absolute'
      }, mergeStyle);

      const rect = mountNode.getBoundingClientRect();

      //  Left
      if (alignX.toLowerCase() === 'left'){
        style.left = 0;
      } else if (alignX.toLowerCase() === 'right'){
        style.left = rect.width;
      } else {
        style.left = rect.width / 2;
      }

      //  Top
      if (alignY.toLowerCase() === 'top'){
        style.top = 0;
      } else if (alignY.toLowerCase() === 'bottom'){
        style.top = rect.height;
      } else {
        style.top = rect.height / 2;
      }

      return style;
    };
  }

  const pulse = pulseWithStyle();
  pulse.overwrite = pulseWithStyle;
  return pulse;
}


const indicatorStyle = makePulse();
export default indicatorStyle;
