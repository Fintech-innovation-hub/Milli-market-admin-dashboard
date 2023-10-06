import { useState } from "react";

const DownloadImage = ({ image, setImage, textDownload }) => {
  const [rasm, setRasm] = useState(image);
  const handleImageChoose = (event) => {
    const file = event.target.files[0];
    setRasm(URL.createObjectURL(file));
    setImage(file);
  };

  return (
    <div className="flex flex-col items-start gap-4  ">
      <label
        htmlFor="dropzone-file"
        className={`flex  flex-col items-center justify-center  h-36 w-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600
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
          onChange={handleImageChoose}
          accept="image/*"
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>
      {rasm && (
        <div className={`cursor-pointer   relative h-40 w-full`}>
          <img
            className="h-40 w-full object-cover rounded"
            src={rasm}
            alt="Uploaded"
          />
        </div>
      )}
    </div>
  );
};

export default DownloadImage;
