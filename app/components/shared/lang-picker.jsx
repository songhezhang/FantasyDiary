import React from 'react';
import cx from 'classnames';
import { locales } from '../../../server/config';

if (process.env.BROWSER) {
  require('styles/app.css');
}

type Props = {
  activeLocale: string,
  onChange: Function<string>
};

// const { locales } = config;

function LangPicker(props: Props) {
  const { activeLocale, onChange } = props;

  return (
    <ul className='lang--picker un-select'>
      { Object.keys(locales).map((locale, index) =>
        <li key={ index }>
          <a
            className={ cx({ active: locale === activeLocale }) }
            onClick={ () => onChange(locale) }>
            { locales[locale] }
          </a>
        </li>) }
    </ul>
  );
}

export default LangPicker;
