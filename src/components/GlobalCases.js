import React, { useEffect, useState, Fragment } from 'react';
import CountUp from '../components/UIElements/CountUp';
import Spinner from './UIElements/Spinner';
import globalIcon from '../assets/img/screen.svg';
import './GlobalCases.css';
import CountryCases from './CountryCases';

export default () => {
  const [confirmed, setConirmed] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [loading, setIsloading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://covid19.mathdro.id/api');
        const data = await response.json();
        setConirmed(data.confirmed.value);
        setRecovered(data.recovered.value);
        setDeaths(data.deaths.value);
        setIsloading(false);
      } catch {
        setError('حدث خطأ أثناء جلب البيانات');
      }
    })();
  }, []);

  let content;
  if (error) {
    content = <h1 className='deaths'>{error}</h1>;
  } else if (loading) {
    content = <Spinner margin='5rem' />;
  } else {
    content = (
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
    );
  }

  return (
    <Fragment>
      <CountryCases />
      <section className='global'>
        <img src={globalIcon} alt='global' />
        {content}
      </section>
    </Fragment>
  );
};
