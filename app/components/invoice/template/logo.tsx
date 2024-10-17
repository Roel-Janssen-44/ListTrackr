'use client';

import { useState, useEffect } from 'react';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { pinata } from '@/app/lib/pinata';
import { set } from 'date-fns';

export default function TemplateLogoUpload({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  const [file, setFile] = useState<File>(null);
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  const uploadFile = async () => {
    if (isInitialRender) {
      if (!invoice.logo || invoice.logo == '') return;
      setUploading(true);
      const urlRequest = await fetch('/api/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cid: invoice.logo }),
      });
      const url = await urlRequest.json();
      setUrl(url);
      setUploading(false);
    } else {
      if (!file) return;

      try {
        setUrl('');
        setUploading(true);
        const keyRequest = await fetch('/api/key');
        const keyData = await keyRequest.json();
        const upload = await pinata.upload.file(file).key(keyData.JWT);
        const urlRequest = await fetch('/api/sign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cid: upload.cid }),
        });
        const url = await urlRequest.json();
        setUrl(url);
        setUploading(false);
        setInvoice({
          ...invoice,
          logo: upload.cid,
        });
      } catch (e) {
        console.log(e);
        setUploading(false);
        setError('Trouble uploading file');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  useEffect(() => {
    uploadFile();
  }, [file]);

  const handleDrop = (e) => {
    e.preventDefault();

    setFile(e?.dataTransfer?.files[0]);
    e.currentTarget.classList.add('border-white');
    e.currentTarget.classList.remove('border-primary');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-white');
    e.currentTarget.classList.add('border-primary');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.add('border-white');
    e.currentTarget.classList.remove('border-primary');
    // if (
    //   invoice.settings.themeColor !== '' ||
    //   invoice.settings.themeColor !== null
    // ) {
    //   e.currentTarget.styles.add({ borderCcolor: invoice.settings.themeColor });
    // }
  };

  // Todo - add border color on hover

  return (
    <div>
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        htmlFor={`dropzone-file-${invoice.id}`}
        // style={
        //   invoice.settings.themeColor
        //     ? { borderColor: invoice.settings.themeColor }
        //     : null
        // }
        className="relative flex h-auto w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-transparent bg-white px-3 py-3 text-gray-800 shadow duration-150 hover:border-primary xs:w-auto xs:px-5 sm:inline-block md:px-8 md:py-4"
      >
        <>
          <div className="flex flex-row items-center gap-3">
            <svg
              style={
                invoice.settings.themeColor
                  ? { color: invoice.settings.themeColor }
                  : null
              }
              aria-hidden="true"
              className={`h-10 w-10 ${url || uploading ? 'hidden' : 'block'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <div className="flex flex-col justify-center">
              <p
                className={`mb-2 text-sm text-gray-900 ${
                  url || uploading ? 'text-transparent' : ''
                }`}
              >
                <span className="font-semibold">Click to upload a file</span> or
                drag a file.
              </p>
              <p
                className={`text-xs text-gray-900 ${
                  url || uploading ? 'text-transparent' : ''
                }`}
              >
                .PNG, .JPG, .JPEG of .WEBP are allowed <br />
                Max filesize: 1MB
              </p>
            </div>
          </div>
        </>
        <input
          id={`dropzone-file-${invoice.id}`}
          type="file"
          name="file"
          className="hidden"
          disabled={uploading}
          onChange={handleChange}
        />

        {url && (
          <div className="inline-block">
            <img
              src={url}
              height={100}
              width={150}
              aria-hidden
              alt="Uploaded file from user"
              className="absolute left-1/2 top-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2 rounded-3xl p-4"
            />
          </div>
        )}

        {uploading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="text-surface relative inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
      </label>
      {(error != '' || error == null) && (
        <p className="w-full text-left text-red-700">{error}</p>
      )}
    </div>
  );
}
