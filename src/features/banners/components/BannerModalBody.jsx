import React, { useState } from "react";

import Titles from "../../products/components/Titles";
import Editor from "../../products/components/Editor";
import DownloadImg from "../../products/components/DownloadImg";
import {
  useAddBannerMutation,
  useUpdateBannerMutation,
} from "../../../services/bannerApi";

function BannerModalBody({ closeModal, extraObject }) {
  const [error, setError] = useState("");
  const [titleLn, setTitleLn] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [descriptionLn, setDescriptionLn] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [images, setImages] = useState([]);

  const [addBanner] = useAddBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  const addBannerHandler = async (e) => {
    e.preventDefault();
    if (
      !titleLn ||
      !titleRu ||
      !descriptionLn ||
      !descriptionRu ||
      images.length === 0
    ) {
      alert("Malumotlarni to'liq kiriting!");
      return;
    }
    // const data = {
    //   title_ln: titleLn,
    //   title_ru: titleRu,
    //   description_ln: descriptionLn,
    //   description_ru: descriptionRu,
    //   url: "https://milli.uz",
    //   file: images[0],
    // };
    // console.log(data);
    const formData = new FormData();
    formData.append("title_ln", titleLn);
    formData.append("title_ru", titleRu);
    formData.append("description_ln", descriptionLn);
    formData.append("description_ru", descriptionRu);
    formData.append("url", "https://milli.uz");
    formData.append("file", images[0]);
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
      <DownloadImg
        images={images}
        setImages={setImages}
        textDownload={"фото"}
      />
      {error && <h1 className="font-bold text-lg text-red-500">{error}</h1>}
      <button className="bg-blue-600 text-white p-2 rounded">
        {extraObject ? "Edit" : "Add"} banner
      </button>
    </form>
  );
}

export default BannerModalBody;
