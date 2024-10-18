'use client';

import { useEffect, useState } from 'react';

export default function PreviewLogo({ logo }: { logo: string }) {
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

  return (
    <div className="flex">
      {url !== '' && <img src={url} alt="" width={250} height={150} />}
    </div>
  );
}
