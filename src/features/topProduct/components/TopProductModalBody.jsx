import React, { useState } from "react";

import {
  useAddTopProductMutation,
  useUpdateTopProductMutation,
} from "../../../services/topProductApi";
import axios from "axios";
import { baseUrl } from "../../../constants";
import {
  useAddAdsProductMutation,
  useUpdateAdsProductMutation,
} from "../../../services/adsProductApi";

function TopProductModalBody({ closeModal, extraObject }) {
  const [searchItem, setSearchItem] = useState(
    extraObject?.product_item?.artikul_ln || ""
  );
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDatas, setShowDatas] = useState(false);
  const [error, setError] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productId, setProductId] = useState(extraObject?.id || "");
  const [productPrice, setProductPrice] = useState("");
  const [addTopProduct] = useAddTopProductMutation();
  const [updateTopProduct] = useUpdateTopProductMutation();
  const [addAdsProduct] = useAddAdsProductMutation();
  const [updateAdsProduct] = useUpdateAdsProductMutation();
  console.log(extraObject);

  const searchProductHandler = (e) => {
    e.preventDefault();

    if (!searchItem) {
      alert("product nomini kiriting");
      return;
    }
    setLoading(true);
    setIsSuccess(false);
    axios
      .get(`${baseUrl}/v1/product/items/?q=${searchItem}`)
      .then((res) => {
        setLoading(false);
        setSearchResults(res?.data?.results);
        setIsSuccess(true);
        setShowDatas(true);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
        setIsSuccess(false);
      });
  };

  const chooseProduct = (productId, productTitle, productNarx) => {
    setShowDatas(false);
    setProductId(productId);
    setProductTitle(productTitle);
    setProductPrice(productNarx);
    setSearchItem(
      `${productTitle} ${productPrice ? `${productNarx} UZS` : ""} `
    );
  };
  const addTopProductHandler = async () => {
    if (!productTitle) {
      alert("select product!");
      return;
    }
    const productt = {
      product_item: productId,
    };

    console.log(productt);
    await (extraObject?.id
      ? extraObject.pageTitle === "Ads Product"
        ? updateAdsProduct({ id: extraObject?.id, ...productt })
        : updateTopProduct({ id: extraObject?.id, ...productt })
      : extraObject.pageTitle === "Ads Product"
      ? addAdsProduct(productt)
      : addTopProduct(productt)
    )
      .unwrap()
      .then((res) => {
        setError("");
        closeModal();
      })
      .catch((err) => setError("Hatolik ruy berdi!"));
  };
  console.log(searchResults);

  return (
    <div className="w-full flex flex-col items-start gap-5 min-h-[260px]">
      <div className="w-full relative">
        <form onSubmit={searchProductHandler} className="w-full " action="">
          <input
            required
            className="border border-slate-500 rounded outline-none text-lg p-2 w-full"
            type="search"
            placeholder="search product"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
            name="search"
          />
        </form>
        {searchResults?.length > 0 && isSuccess ? (
          <div
            className={`${
              showDatas ? "block" : "hidden"
            } w-full  absolute  h-52 border border-slate-500 bg-white overflow-y-scroll`}
          >
            {searchResults.map((item) => (
              <div
                onClick={() =>
                  chooseProduct(item.id, item.artikul_ln, item.price)
                }
                key={item.id}
                className="w-full p-2 cursor-pointer flex items-center gap-3 hover:bg-sky-400"
              >
                <span>{item.artikul_ln}</span>
                <span>{item.price && `${item.price} UZS`}</span>
              </div>
            ))}
          </div>
        ) : (
          <h1>{isSuccess && "bunday mahsulot topilmadi"}</h1>
        )}
      </div>
      {/* <h1>{productTitle} {productPrice && `${productPrice} sum`}</h1> */}
      {error && <h1 className="font-bold text-lg text-red-500">{error}</h1>}
      <button
        onClick={addTopProductHandler}
        className="bg-blue-600 text-white p-2 rounded"
      >
        {extraObject?.id ? "Edit" : "Add"}{" "}
        {extraObject?.pageTitle === "Ads Product" ? "ads" : "top"} product
      </button>
    </div>
  );
}

export default TopProductModalBody;
