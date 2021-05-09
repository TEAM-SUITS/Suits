import { useState, useEffect } from 'react';
import _ from 'lodash';

export default function useScrollDetect() {
  const [isScrolled, setIsScrolled] = useState(false);

  const detectScroll = () => {
    const scrollY = window.pageYOffset;
    console.log(scrollY);
    if (scrollY > 0) {
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
