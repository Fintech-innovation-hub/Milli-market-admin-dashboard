import React from "react";
import Card from "./Card";

function CardsContainer({ title, data }) {
  console.log(data)
  return (
    <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-5 ">
      {data.map((item) => (
        <Card title={title} key={item.id} item={item} {...item} />
      ))}
    </div>
  );
}

export default CardsContainer;
