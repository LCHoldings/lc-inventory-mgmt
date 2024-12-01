import React from 'react';
import Image from 'next/image'

const ImageCellRenderer = (props: any) => {
  return (
    <div className='p-1 flex flex-row justify-center'>
      {props.value ? (
        <Image src={props.value} alt="Manufacturer" width={60} height={60} className="rounded-sm" />
      ) : (
        <div className="w-10 h-10 text-gray-300">
          <p>No Image</p>
        </div>
      )}
    </div>
  );
};

export default ImageCellRenderer;