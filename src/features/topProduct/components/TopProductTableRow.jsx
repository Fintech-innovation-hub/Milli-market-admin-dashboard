import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { openModal } from "../../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import { useDispatch } from "react-redux";

function TopProductTableRow({ index, title, id, product_item,image, item }) {
  const dispatch = useDispatch();

  const deleteCurrentTopProduct = () => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this ${title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.TOP_PRODUCT_DELETE,
          pageTitle: title,
          id,
        },
      })
    );
  };
  const editCurrentTopProduct = () => {
    dispatch(
      openModal({
        title: `Edit ${title} `,
        bodyType: MODAL_BODY_TYPES.TOP_PRODUCT_ADD_NEW,
        extraObject: {...item,pageTitle:title}
      })
    );
  };
  return (
    <Draggable index={index} draggableId={id.toString()}>
      {(provided, snapshot) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${snapshot.isDragging ? "bg-sky-600" : ""} text-start`}
        >
          <td>
            {/* <MdDragHandle size={25}/> */}
            {index + 1}
          </td>
          <td className=" flex justify-center items-center">
            {image ? (
              <img
                className="h-12 w-12 object-cover bg-slate-500"
                src={image}
                alt={product_item?.artikul_ln}
              />
            ) : (
              "Not"
            )}
          </td>
          <td>{product_item.artikul_ln}</td>
          <td>{product_item.price || "-"}</td>
          <td className="">
            <button className="mr-5" onClick={deleteCurrentTopProduct}>
              <BsFillTrashFill className="text-xl cursor-pointer" />
            </button>
            <button onClick={editCurrentTopProduct}>
              <AiFillEdit className="text-xl cursor-pointer" />
            </button>
          </td>
        </tr>
      )}
    </Draggable>
  );
}

export default TopProductTableRow;
