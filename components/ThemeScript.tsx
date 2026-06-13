'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useRef } from 'react';

export default function ThemeScript() {
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){try{var t=localStorage.getItem('hondana_settings');
            if(t){var s=JSON.parse(t);
            if(s.theme==='light'){
              document.documentElement.classList.add('light');
              document.documentElement.classList.remove('dark');
              document.documentElement.setAttribute('data-theme','light');
            }else{
              document.documentElement.classList.add('dark');
              document.documentElement.classList.remove('light');
              document.documentElement.setAttribute('data-theme','dark');
            }}
            }catch(e){}})()
          `,
        }}
      />
    );
  });

  return null;
}
