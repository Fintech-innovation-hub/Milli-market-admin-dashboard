import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import { useDispatch } from "react-redux";
import { openModal } from "../../common/modalSlice";

function TopCategoryTableRow({
  index,
  title,
  id,
  category,
  product,
  image,
  item,
}) {
  const dispatch = useDispatch();

  const deleteCurrentTopCategory = () => {
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
  };
  const editCurrentTopCategory = () => {
    dispatch(
      openModal({
        title: "Edit Top Category",
        bodyType: MODAL_BODY_TYPES.TOP_CATEGORY_ADD_NEW,
        extraObject: item,
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
          className={`${snapshot.isDragging ? "bg-sky-600" : ""} text-center  `}
        >
          <td>
            {/* <MdDragHandle size={25}/> */}
            {index + 1}
          </td>
          <td className=" flex justify-center items-center">
            <img
              className="h-12  w-12 object-cover bg-slate-500"
              src={image}
              alt={category?.title_ln}
            />
          </td>
          <td>{category.title_ln}</td>
          <td className="">
            <button className="mr-5" onClick={deleteCurrentTopCategory}>
              <BsFillTrashFill className="text-xl cursor-pointer" />
            </button>
            <button onClick={editCurrentTopCategory}>
              <AiFillEdit className="text-xl cursor-pointer" />
            </button>
          </td>
        </tr>
      )}
    </Draggable>
  );
}

export default TopCategoryTableRow;
