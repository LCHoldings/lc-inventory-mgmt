import React from 'react';
import Image from 'next/image'
import { SquareX } from 'lucide-react'

const ImageCellRenderer = (props: any) => {
  return (
    <div className='p-1 flex flex-row justify-center'>
      {props.value ? (
        <Image src={props.value} alt="Manufacturer" width={60} height={60} className="rounded-sm" />
      ) : (
        <SquareX className='size-14' />
      )}
    </div>
  );
};

export default ImageCellRenderer;