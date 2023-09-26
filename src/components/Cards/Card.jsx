import React from "react";
import { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
// import TrashIcon from '@heroicons/react/24/outline/TrashIcon'

function Card({ title, id, category, product, images, item }) {
  const [showAction, setShowAction] = useState(false);
  const dispatch = useDispatch();

  const deleteCurrentCategory = () => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this top category?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.TOP_CATEGORY_DELETE,
          id,
        },
      })
    );
    setShowAction(false);
  };

  const editCurrentCategory = () => {
    dispatch(
      openModal({
        title: "Edit Top Category",
        bodyType: MODAL_BODY_TYPES.TOP_CATEGORY_ADD_NEW,
        extraObject: item,
      })
    );
    setShowAction(false);
  };
  return (
    <div className="p-5 grid-cols-1 flex flex-col relative items-center gap-3 bg-slate-200 rounded-lg">
      <button onClick={() => setShowAction((p) => !p)}>
        <BsThreeDotsVertical className="font-bold text-2xl top-2 right-0 absolute" />
      </button>
      <div
        className={`${
          showAction ? "flex" : "hidden"
        } h-auto flex flex-col items-start gap-2 rounded-md text-white  absolute top-8 right-0 w-24 bg-sky-600`}
      >
        <button
          onClick={deleteCurrentCategory}
          className="hover:bg-sky-800 h-8 w-full font-bold text-center"
        >
          delete
        </button>
        <button
          onClick={editCurrentCategory}
          className="hover:bg-sky-800 h-8 w-full font-bold text-center"
        >
          edit
        </button>
      </div>
      <div className={`flex ${images.length > 1 && "overflow-x-scroll"} gap-3`}>
        {images.map((item, index) => (
          <img
            key={index}
            className=" cursor-pointer flex-1 w-full h-56 object-cover"
            src={`data:image/jpeg;base64,${item.image}`}
            alt={title}
          />
        ))}
      </div>
      <h2 className="font-bold text-lg ">
        {category?.title_ln || product?.title_ln || ""}
      </h2>
    </div>
  );
}

export default Card;
