import { useState, useEffect } from 'react';
import _ from 'lodash';

export default function useScrollDetect() {
  const [isScrolled, setIsScrolled] = useState(false);

  const detectScroll = () => {
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    console.log(scrollTop);
    if (scrollTop > 45) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const throttledScroll = _.throttle(detectScroll, 500);

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [throttledScroll]);

  return isScrolled;
}
