import { useEffect } from 'react';

const useResize = (callback: () => void, interval = 100) => {
  useEffect(() => {
    callback();
  }, [callback]);

  useEffect(() => {
    let timeoutID: number;

    const handleResize = () => {
      window.clearTimeout(timeoutID);
      timeoutID = window.setTimeout(callback, interval);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback, interval]);
};

export default useResize;
