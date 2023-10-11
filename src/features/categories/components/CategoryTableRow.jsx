import React from 'react'
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { AiFillEdit } from "react-icons/ai";

function CategoryTableRow({ getCategoryDetailHandler, deleteCurrentCategory, editCurrentCategory, index, title, id,children }) {
    return (
        <tr className="hover:bg-slate-400 duration-500 cursor-pointer">
            <td  >
                {index + 1}

            </td>
            <td onClick={() => {
                getCategoryDetailHandler(id,children)
            }
            }>{title}</td>
            <td><button className="btn btn-square btn-ghost" onClick={(event) => {
                event.stopPropagation();
                deleteCurrentCategory(id)
            }}>
                <TrashIcon className="w-5" />
            </button>
                <button onClick={() => editCurrentCategory(id)}>
                    <AiFillEdit className="text-xl cursor-pointer" />
                </button>

            </td>
        </tr>
    )
}

export default CategoryTableRow
