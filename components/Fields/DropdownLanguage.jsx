import { useRouter } from 'next/router';
import { useState } from 'react';
import { local } from 'store2';
import { NoSsr } from '..';
import { languages } from '../../languages';
import DropdownWithImage from './DropdownWithImage';

const DropdownLanguage = () => {
  if (!local.get(process.env.LANGUAGE_KEY)) {
    local.set(process.env.LANGUAGE_KEY, 'en');
  }
  const [language, setLanguage] = useState(local.get(process.env.LANGUAGE_KEY));
  const router = useRouter();

  const handleSelect = (value) => {
    local.set(process.env.LANGUAGE_KEY, value);
    setLanguage(value);
    router.reload();
  };

  const showLanguage = (lang) => (
    <option key={lang} value={lang}>
      <div className="flex gap-2 items-center w-full">
        <img
          alt={lang}
          className="rounded-full"
          height="24px"
          src={`/flags/${lang}.png`}
          width="24px"
        />
        <span className="font-bold uppercase">{lang}</span>
      </div>
    </option>
  );

  return (
    <NoSsr>
      <div className="max-w-min" id="language-dd">
        <DropdownWithImage
          icon={<i className="fas fa-chevron-down mt-0.5" />}
          onSelect={handleSelect}
          value={language}
        >
          {languages.map(showLanguage)}
        </DropdownWithImage>
      </div>
    </NoSsr>
  );
};

export default DropdownLanguage;
