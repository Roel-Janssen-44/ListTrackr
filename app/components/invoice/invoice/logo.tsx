'use client';

import { useEffect, useState } from 'react';

export default function InvoiceLogo({ logo }: { logo: string }) {
  // Todo - add loading and error state

  const [url, setUrl] = useState('');
  const fetchImage = async () => {
    const urlRequest = await fetch('/api/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cid: logo }),
    });
    const url = await urlRequest.json();
    setUrl(url);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return <>{url !== '' && <img src={url} alt="" width={125} height={150} />}</>;
}
