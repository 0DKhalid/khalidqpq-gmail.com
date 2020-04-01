import React from 'react';

import './GlobalCases.css';

export default () => {
  return (
    <section className='global'>
      <div>IMage</div>
      <div className='container'>
        <div>
          <h2>الحالات المسجلة</h2>
          <div>1000</div>
        </div>
        <div>
          <h2>حالات التعافي</h2>
          <div>1000</div>
        </div>
        <div>
          <h2>حالات الوفاة</h2>
          <div>1000</div>
        </div>
      </div>
    </section>
  );
};
