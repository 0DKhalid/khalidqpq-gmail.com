import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import countriesCode from '.././util/countriesCode';
//import css module
import 'react-flags-select/css/react-flags-select.css';
import './CountryCases.css';

export default () => (
  <ReactFlagsSelect
    className='country-select'
    customLabels={countriesCode}
    placeholder='أختر دولة'
    searchable={true}
    searchPlaceholder='أبحث عن بلد'
  />
);
