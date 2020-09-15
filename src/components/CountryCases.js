import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import countriesCodeName from '../util/countriesCodeName';
//import css module
import 'react-flags-select/css/react-flags-select.css';
import './CountryCases.css';

export default ({ onSelect }) => (
  <ReactFlagsSelect
    className='country-select'
    customLabels={countriesCodeName}
    placeholder='أختر دولة'
    searchable={true}
    searchPlaceholder='أبحث عن بلد'
    onSelect={onSelect}
  />
);
