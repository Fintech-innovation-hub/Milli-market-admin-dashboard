import React, { useState } from "react";
import DownloadImagesLists from "./DownloadImagesLists";
// import { AiOutlinePlus } from "react-icons/ai";

const DownloadImg = ({ textDownload, images, setImages, extraObject }) => {
  const [imagess, setImagess] = useState(extraObject?.images || []);
  console.log(images);
  console.log(imagess);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file.name);
    setImages([...images, file]);
    setImagess([...imagess, URL.createObjectURL(file)]);
  };
  return (
    <div className="flex flex-col items-start gap-4  ">
      <label
        htmlFor="dropzone-file"
        className={`${
          images.length > 0 ? "hidden" : "flex"
        }   flex-col items-center justify-center  h-36 w-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600
         dark:hover:border-gray-500 dark:hover:bg-gray-600`}
      >
        <div
          className={` flex-col  items-center justify-center px-6 text-center pt-5 pb-6`}
        >
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
      <div className="grid grid-cols-1 items-start md:grid-cols-3 gap-1">
        {imagess.map((image, index, self) => (
          <DownloadImagesLists
            key={index}
            setImages={setImages}
            setImagess={setImagess}
            image={image}
            index={index}
            images={images}
            imagess={self}
            leng={self.length}
            extraObject={extraObject}
          />
        ))}
      </div>
    </div>
  );
};

export default DownloadImg;
