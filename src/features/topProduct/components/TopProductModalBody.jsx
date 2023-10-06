import React, { useState } from "react";

import { useProductsQuery } from "../../../services/productApi";
import ProductSelect from "../../../components/Selects/ProductSelect";
import {
  useAddTopProductMutation,
  useUpdateTopProductMutation,
} from "../../../services/topProductApi";

function TopProductModalBody({ closeModal, extraObject }) {
  const [error, setError] = useState("");
  const [productID, setProductID] = useState("");
  const { data: products, isSuccess } = useProductsQuery();
  const [addTopProduct] = useAddTopProductMutation();
  const [updateTopProduct] = useUpdateTopProductMutation();

  const addTopProductHandler = async (e) => {
    e.preventDefault();
    if (!productID) {
      alert("select product!");
      return;
    }

    e.preventDefault();
    const productt = {
    product:productID,
    id: extraObject?.id,
    };
    console.log(productt)
    await (extraObject
      ? updateTopProduct(productt)
      : addTopProduct({ product: productID })
    )
      .unwrap()
      .then((res) => {
        setError("");
        closeModal();
      })
      .catch((err) => setError("Hatolik ruy berdi!"));
  };

  return (
    <form
      onSubmit={addTopProductHandler}
      className="w-full flex flex-col items-start gap-5 min-h-[260px]"
    >
      {isSuccess && (
        <ProductSelect setProductID={setProductID} products={products?.data} />
      )}
      {error && <h1 className="font-bold text-lg text-red-500">{error}</h1>}
      <button className="bg-blue-600 text-white p-2 rounded">
        {extraObject ? "Edit" : "Add"} top product
      </button>
    </form>
  );
}

export default TopProductModalBody;
