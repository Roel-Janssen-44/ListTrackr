'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { useRef } from 'react';
import { pinata } from '@/app/lib/pinata';

import { useFormState } from 'react-dom';

const initialState = { message: null, errors: {} };

export default function TemplateLogoUpload({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }

    try {
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
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <div>
      {/* <input type="file" onChange={handleChange} />
      <button disabled={uploading} onClick={uploadFile}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {url && <img src={url} alt="Image from Pinata" />} */}

      <div>
        <label
          //  onDrop={handleDrop}
          //     onDragOver={handleDragOver}
          //     onDragLeave={handleDragLeave}
          htmlFor={`dropzone-file-${invoice.id}`}
          className="relative flex h-auto w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-200 px-3 py-3 text-gray-800 shadow duration-150 hover:border-transparent hover:bg-gray-300 xs:w-auto xs:px-5 sm:inline-block  md:px-8 md:py-4"
        >
          <>
            <div className="flex flex-row items-center gap-3">
              <svg
                aria-hidden="true"
                className={`hidden h-10 w-10 text-gray-400 sm:block ${
                  url || uploading ? 'text-transparent' : ''
                }`}
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
                  className={`mb-2 text-sm text-gray-600 ${
                    url || uploading ? 'text-transparent' : ''
                  }`}
                >
                  <span className="font-semibold">Click to upload a file</span>{' '}
                  or drag a file.
                </p>
                <p
                  className={`text-xs text-gray-600 ${
                    url || uploading ? 'text-transparent' : ''
                  }`}
                >
                  .PNG, .JPG, .JPEG of .WEBP are allowed <br />
                  Max filesize: 1MB
                </p>
              </div>
              <p
                className={`absolute left-[40%] top-1/2 -translate-y-1/2 pr-3 text-sm text-gray-600 ${
                  url ? '' : 'text-transparent'
                }`}
              >
                <span className="font-semibold">Klik of sleep</span> opnieuw een
                bestand om het huidige bestand te vervangen
              </p>
            </div>
          </>
          <input
            id={`dropzone-file-${invoice.id}`}
            type="file"
            name="file"
            className="hidden"
            onChange={handleChange}
          />

          {url && (
            <div className="inline-block">
              <Image
                src={url}
                height={100}
                width={150}
                aria-hidden
                alt="Uploaded file from user"
                className="absolute left-0 top-0 h-full w-auto rounded-lg"
              />
            </div>
          )}
          {/* {loading && (
          <CircularProgress className="w-10 h-10 absolute top-1/2 -translate-y-1/2 left-8 z-30" />
          )}  */}
        </label>
        {/* {(fileError != '' || fileError == null) && (
          <p className="w-full text-left text-red-700">{fileError}</p>
        )}  */}
      </div>
    </div>
  );
}
