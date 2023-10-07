import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {AiFillEdit} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import { openModal } from "../../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import { useDispatch } from "react-redux";
import parse from 'html-react-parser';

function BannerTableRow({ index, title_ln,title_ru,image,item, id, description_ln }) {
  const dispatch = useDispatch();

  const deleteCurrentBanner = () => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this banner?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.BANNER_DELETE,
          id,
        },
      })
    );
  };
  const editCurrentBanner = () => {
    dispatch(
      openModal({
        title: "Edit Banner",
        bodyType: MODAL_BODY_TYPES.BANNER_ADD_NEW,
        extraObject: item,
      })
    );
  };
  console.log(description_ln)
  return (
    <Draggable index={index} draggableId={id.toString()}>
      {(provided, snapshot) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${snapshot.isDragging ? "bg-sky-600" : ""} text-center`}
        >
          <td>
            {/* <MdDragHandle size={25}/> */}
            {index+1}
          </td>
          <td className=" flex justify-center items-center">
            <img
            className="h-12 w-12 object-cover bg-slate-500"
              src={image}
              alt={title_ln}
            />
          </td>
          <td>{title_ln}</td>
          <td>{parse(description_ln)}</td>
          <td className="">
            <button className="mr-5" onClick={deleteCurrentBanner}>
              <BsFillTrashFill className="text-xl cursor-pointer"/>
            </button>
            <button onClick={editCurrentBanner}>
              <AiFillEdit className="text-xl cursor-pointer"/>
            </button>
          </td>
        </tr>
      )}
    </Draggable>
  );
}

export default BannerTableRow;
