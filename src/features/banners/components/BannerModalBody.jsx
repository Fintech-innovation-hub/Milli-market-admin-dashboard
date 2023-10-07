import React, { useState } from "react";

import Titles from "../../products/components/Titles";
import Editor from "../../products/components/Editor";
import {
  useAddBannerMutation,
  useUpdateBannerMutation,
} from "../../../services/bannerApi";
import DownloadImage from "../../../components/Images/DownloadImage";

function BannerModalBody({ closeModal, extraObject }) {
  console.log(extraObject)
  const [error, setError] = useState("");
  const [titleLn, setTitleLn] = useState(extraObject?.title_ln || "");
  const [titleRu, setTitleRu] = useState(extraObject?.title_ru ||"");
  const [descriptionLn, setDescriptionLn] = useState(extraObject?.description_ln || "");
  const [descriptionRu, setDescriptionRu] = useState(extraObject?.description_ru || "");
  const [image, setImage] = useState(extraObject?.image || "");

  const [addBanner] = useAddBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  const addBannerHandler = async (e) => {
    e.preventDefault();
    if (
      !titleLn ||
      !titleRu ||
      !descriptionLn ||
      !descriptionRu ||
      !image
    ) {
      alert("Malumotlarni to'liq kiriting!");
      return;
    }
    const formData = new FormData();
    formData.append("title_ln", titleLn);
    formData.append("title_ru", titleRu);
    formData.append("description_ln", descriptionLn);
    formData.append("description_ru", descriptionRu);
    formData.append("url", "https://milli.uz");
    formData.append("file", image);
    await (extraObject
      ? updateBanner({ id: extraObject?.id, formData })
      : addBanner(formData)
    )
      .unwrap()
      .then((res) => {
        setError("");
        console.log("qoshildi");
        closeModal();
      })
      .catch((err) => setError("Hatolik ruy berdi!"));
  };

  return (
    <form
      onSubmit={addBannerHandler}
      className="w-full flex flex-col items-start gap-5 min-h-[260px]"
    >
      <div className="flex flex-col w-full gap-y-2 ">
        <Titles
          titleLn={titleLn}
          setTitleLn={setTitleLn}
          titleRu={titleRu}
          setTitleRu={setTitleRu}
          //   currentProduct={currentProduct}
        />
      </div>
      <div className="">
        <h2 className="text-base my-3 font-semibold uppercase">
          PRODUCT DESCRIPTION IN UZBEK
        </h2>

        <Editor
          initialValue={descriptionLn}
          setDess={setDescriptionLn}
          name="descUz"
        />
      </div>

      <div className="">
        <h2 className="text-base my-3 font-semibold uppercase">
          Описание товара на русском
        </h2>
        <Editor initialValue={descriptionRu} setDess={setDescriptionRu} />
      </div>
      <DownloadImage image={image} setImage={setImage} textDownload={"Image"} />

      {error && <h1 className="font-bold text-lg text-red-500">{error}</h1>}
      <button className="bg-blue-600 text-white p-2 rounded">
        {extraObject ? "Edit" : "Add"} banner
      </button>
    </form>
  );
}

export default BannerModalBody;
