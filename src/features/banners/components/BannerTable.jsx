import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import BannerTableRow from "./BannerTableRow";

function BannerTable({ data }) {
  const [datas, setDatas] = useState(data); // Your table data
  const onDragEnd = (result) => {
    // Handle drag-and-drop logic here, e.g., reordering data
    if (!result.destination) return;
    // Update the 'data' array to reflect the new order
    const newData = [...datas];

    const [reorderedItem] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, reorderedItem);
    setDatas(newData);
  };
  useEffect(() => {
    setDatas(data);
  }, [data]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table className="product-table  w-full">
        <thead>
          <tr>
            <th>№</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <Droppable droppableId="tbody" type="banner">
          {(provided, snapshot) => (
            <tbody
              className="w-full"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {datas?.map((item, index) => (
                <BannerTableRow key={item.id} index={index} item={item} {...item} />
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
}

export default BannerTable;
