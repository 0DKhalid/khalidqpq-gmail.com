import React, { useEffect, useState } from 'react';
import CountUp from '../components/UIElements/CountUp';
import './GlobalCases.css';

export default () => {
  const [confirmed, setConirmed] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://covid19.mathdro.id/api');
        const data = await response.json();
        setConirmed(data.confirmed.value);
        setRecovered(data.recovered.value);
        setDeaths(data.deaths.value);
        console.log(data.confirmed.value);
        console.log(data.recovered.value);
        console.log(data.deaths.value);
      } catch {
        setError('حدث خطأ أثناء جلب البيانات');
      }
    })();
  }, []);
  return (
    <section className='global'>
      <div>IMage</div>
      <div className='container'>
        <div>
          <h2>الحالات المسجلة</h2>
          <div className='number-circle confirmed'>
            <CountUp target={confirmed} speed={200} />
          </div>
        </div>
        <div>
          <h2>حالات التعافي</h2>
          <div className='number-circle recovered'>
            <CountUp target={recovered} speed={200} />
          </div>
        </div>
        <div>
          <h2>حالات الوفاة</h2>
          <div className='number-circle deaths'>
            <CountUp target={deaths} speed={200} />
          </div>
        </div>
      </div>
    </section>
  );
};
