import React from 'react';

function Seller({ seller, setSeller, sellers }) {
  return (
    <div className="">
      <h2 className="text-base my-3 font-semibold uppercase">
        Seller
  
      </h2>
      <select
        value={seller}
        name="seller"
        className="w-full border-2 border-inherit p-2 text-base outline-0 cursor-pointer"
        onChange={(e) => {
          setSeller(e.target.value);
        }}
      >
        <option disabled value="">
          Choose seller
        </option>
        {sellers?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.phone_number}
            {item.first_name && ` - ${item.first_name}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Seller;
