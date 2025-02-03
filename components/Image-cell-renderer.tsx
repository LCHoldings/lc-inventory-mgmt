"use client"

import React from 'react';
import Image from 'next/image'
import { SquareX } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ImageCellRenderer(image?: { image: string }) {
  const [error, setError] = useState(false)


  useEffect(() => {
    setError(false)
  }, [image])

  return (
    <div className='p-1 flex flex-row justify-center'>
      {image && !error ? (
        <Image
          src={image.image}
          alt="Manufacturer"
          onError={() => setError(true)}
          width={32}
          height={32}
          className="rounded-sm"
        />
      ) : (
        <SquareX className='size-8' />
      )}
    </div>
  );
}