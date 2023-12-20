import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

function DownloadImagesLists({
  index,
  image,
  setImages,
  setImagess,
  imagess,
  images,
  extraObject,
  leng,
}) {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  return (
    <div
      onMouseOver={() => setShowDeleteIcon(true)}
      onMouseLeave={() => setShowDeleteIcon(false)}
      className={`cursor-pointer   relative h-40 w-full`}
    >
      <img
        className="h-40 w-full object-cover rounded"
        src={image}
        alt="Uploaded"
      />
      <TrashIcon
        onClick={() => {
          setImagess(imagess.filter((item, ind) => ind !== index));
          setImages(images.filter((item, ind) => ind !== index));
        }}
        className={` ${
          showDeleteIcon ? "inline-block" : "hidden"
        } absolute h-6 w-6 cursor-pointer top-4 right-3 
         text-black font-bold`}
      />
    </div>
  );
}

export default DownloadImagesLists;
