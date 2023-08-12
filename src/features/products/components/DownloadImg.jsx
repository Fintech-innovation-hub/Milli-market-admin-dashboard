import React, { useState } from 'react';
// import { AiOutlinePlus } from "react-icons/ai";

const DownloadImg = ({ textDownload }) => {
  const [images, setImages] = useState([]);
 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImages([...images, URL.createObjectURL(file)]);
    // setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex items-start gap-5 ">
      <div className='flex items-center gap-5'>
        {images.length > 0 &&
          images.map((image) => (
            <img className="h-44 w-40 object-cover rounded" src={image} alt="Uploaded" />
          ))}
      </div>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center  h-44 w-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center px-6 text-center pt-5 pb-6">
          <p className="mb-2 text-2xl font-medium text-gray-500 dark:text-gray-400">
            Добавить {textDownload}
          </p>
        </div>
        <input
          onChange={handleImageChange}
          accept="image/*"
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>
    </div>
  );
};

export default DownloadImg;
