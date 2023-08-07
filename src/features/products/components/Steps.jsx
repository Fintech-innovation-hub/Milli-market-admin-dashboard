import React from "react";

const Steps = () => {
  return (
    <ol className="flex items-center mt-6 w-8/12 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
      <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
        <span className="mr-2">1</span>
          Карточка <span className="hidden sm:inline-flex sm:ml-2">товара</span>
        </span>
      </li>
      <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          <span className="mr-2">2</span>
          Additional <span className="hidden sm:inline-flex sm:ml-2">Info</span>
        </span>
      </li>
    </ol>
  );
};

export default Steps;
