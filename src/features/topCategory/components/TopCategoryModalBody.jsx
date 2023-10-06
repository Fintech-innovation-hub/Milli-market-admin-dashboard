import React, { useState } from "react";
import ProductCategorySelect from "../../products/components/CategorySelect/ProductCategorySelect";
import DownloadImg from "../../products/components/DownloadImg";
import {
  useAddTopCategoryMutation,
  useUpdateTopCategoryMutation,
} from "../../../services/topCategoryApi";
import DownloadImage from "../../../components/Images/DownloadImage";

function TopCategoryModalBody({ closeModal, extraObject }) {
  console.log(extraObject);

  const [ctgId, setCtgId] = useState(extraObject?.category?.id || "");
  const [image, setImage] = useState(extraObject?.image || "");
  const [url, setUrl] = useState(extraObject?.url || "");
  const [error, setError] = useState("");
  const [addTopCategory] = useAddTopCategoryMutation();
  const [editTopCategory] = useUpdateTopCategoryMutation();

  const addTopCategoryHandler = async (e) => {
    e.preventDefault();
    if (!ctgId || !image) {
      alert("malumotlarni to'liq kiriting!");
      return;
    }
    const formData = new FormData();
    formData.append("category", ctgId);
    formData.append("url", url);
    formData.append("file", image);

    await (extraObject
      ? editTopCategory({ id: extraObject?.id, formData })
      : addTopCategory(formData)
    )
      .then((res) => {
        setError("");
        closeModal();
      })
      .catch((err) => setError("Hatolik ruy berdi!"));
  };

  return (
    <form
      onSubmit={addTopCategoryHandler}
      className="w-full flex flex-col items-start gap-5 "
    >
      <ProductCategorySelect
        setCtgId={setCtgId}
        category={extraObject?.category}
        title="topCategory"
      />
      <div className="flex flex-col items-start gap-1">
        <label className="font-semibold text-lg" htmlFor="url">
          Url:
        </label>
        <input
          required
          className="border border-slate-500 rounded outline-none text-lg p-2 w-2/3"
          type="text"
          placeholder="url"
          onChange={(e) => setUrl(e.target.value)}
          defaultValue={extraObject?.url || ""}
          name="url"
        />
      </div>

      <DownloadImage image={image} setImage={setImage} textDownload={"Image"} />
      {error && <h1 className="font-bold text-lg text-red-500">{error}</h1>}
      <button className="bg-blue-600 text-white p-2 rounded">
        {extraObject ? "Edit" : "Add"} Top Category
      </button>
    </form>
  );
}

export default TopCategoryModalBody;
