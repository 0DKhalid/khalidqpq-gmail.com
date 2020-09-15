import React, { useEffect, useState, Fragment } from 'react';
import CountUp from '../components/UIElements/CountUp';
import Spinner from './UIElements/Spinner';
import globalIcon from '../assets/img/screen.svg';
import CountryCases from './CountryCases';
import countries from '../util/countriesCode';
import './GlobalCases.css';

export default () => {
  const [confirmed, setConirmed] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [loading, setIsloading] = useState(true);
  const [error, setError] = useState('');
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setIsloading(true);
        const response = await fetch(process.env.REACT_APP_API_URL);
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

  const countryCodeToName = (countryCode) => {
    const countryName = countries[countryCode];
    setCountryName(countryName);
  };

  const onSelectCountry = async (countryCode) => {
    countryCodeToName(countryCode);
    console.log(countryCode);

    setIsloading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/countries/${countryCode}`
      );
      const data = await response.json();
      setConirmed(data.confirmed.value);
      setRecovered(data.recovered.value);
      setDeaths(data.deaths.value);
      setIsloading(false);
      setError('');
    } catch {
      setError('لا توجد بيانات');
    }
  };

  let content;
  if (error) {
    content = (
      <h1 className='deaths' style={{ fontSize: '2rem', marginBottom: '8rem' }}>
        {error}
      </h1>
    );
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
      <CountryCases onSelect={onSelectCountry} />
      <section className='global'>
        <img
          className={countryName ? 'img-size' : ''}
          src={
            countryName
              ? `https://assets.thebasetrip.com/api/v2/countries/flags/${countryName}.svg`
              : globalIcon
          }
          alt={countryName ? countryName : 'global'}
        />
        {content}
      </section>
      <footer>
        {' '}
        <a href='https://github.com/0DKhalid'>&copy;Khalid Ayed</a>
        <div>
          Icons made by{' '}
          <a href='https://www.flaticon.com/authors/freepik' title='Freepik'>
            Freepik
          </a>{' '}
          from{' '}
          <a href='https://www.flaticon.com/' title='Flaticon'>
            www.flaticon.com
          </a>
        </div>
      </footer>
    </Fragment>
  );
};
