import React, { useEffect, useRef, useState } from 'react';

import Spinner from './UIElements/Spinner';
import { buildMap } from '../MapConfig';
import './Map.css';

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const mapEl = useRef();
  useEffect(() => {
    (async function() {
      async function getCountriesCases(url) {
        const response = await fetch(url);

        const data = await response.json();

        const dataArr = data.countries
          .filter(countries => countries.iso2)
          .map(country => `${url}/${country.iso2}`);

        const countries = await Promise.all(
          dataArr.map(async url => {
            // rturn fetch(url).then(response => response.json());
            const response = await fetch(url);
            return await response.json();
          })
        );

        const countriesData = countries
          .filter(country => country.confirmed)
          .map(country => {
            const countryISO2 = country.confirmed.detail.slice(41, 43);
            const countryData = {
              confirmed: country.confirmed.value,
              recovered: country.recovered.value,
              deaths: country.deaths.value
            };

            return { [countryISO2]: countryData };
          })
          .reduce((acc, cur) => Object.assign(acc, cur), {});
        return countriesData;
      }

      const data = await getCountriesCases(
        'https://covid19.mathdro.id/api/countries'
      );
      setIsLoading(false);
      buildMap(mapEl.current, data);
    })();
  }, []);

  return isLoading ? <Spinner /> : <div ref={mapEl} className='Map'></div>;
};
