import { useEffect } from "react";

export default function ProductSelect({ products, setProductID }) {

  useEffect(()=>{
    setProductID(products[0].id)
  },[])
  
  return (
    <select
      onChange={(e) => {
        console.log(e.target.value)
        setProductID(e.target.value);
      }}
      className="w-full  border-2 border-inherit p-2 text-base outline-0 cursor-pointer"
      placeholder="Choose Product"
      data-te-select-init
      data-te-select-visible-options="3"
      name="product"
      defaultValue={products[0]?.title}
    >
      {products.map((item) =>{
       return (
        <option key={item.id} label={item.title} value={item.id}>
          {item.title}
        </option>
      )
       }
      )}
    </select>
  );
}
