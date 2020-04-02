import React, { useState, useEffect } from 'react';

export default ({ target, speed, start = 0 }) => {
  const [count, setCount] = useState(start);
  useEffect(() => {
    let inc = target / speed;
    if (count < target) {
      setTimeout(() => setCount(prevCount => prevCount + inc));
    } else {
      setCount(target);
    }
  }, [count, speed, target]);

  return <span style={{ position: 'relative' }}>{Math.round(count)}</span>;
};
