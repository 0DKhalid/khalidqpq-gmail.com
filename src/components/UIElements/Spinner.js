import React from 'react';

import './Spinner.css';

export default ({ margin }) => (
  <div style={{ margin: `${margin} auto` }} className='loader'>
    Loading...
  </div>
);
