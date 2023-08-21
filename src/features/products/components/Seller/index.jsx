import React from 'react';

function Seller({ seller, setSeller, sellers, currentProduct }) {
  console.log(currentProduct);
  return (
    <div className="">
      <h2 className="text-base my-3 font-semibold uppercase">
        Seller
        {currentProduct && (
          <span className="text-lg ml-3 lowercase">
            ({currentProduct?.seller?.first_name}-
            {currentProduct?.seller?.phone_number})
          </span>
        )}
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
        {sellers?.data?.map((item) => (
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
