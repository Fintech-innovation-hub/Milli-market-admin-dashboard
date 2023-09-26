import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ErrorText from '../../../components/Typography/ErrorText';
// import { showNotification } from '../../common/headerSlice';
import {
  useAddProductMutation,
  usePatchProductDetailsMutation,
} from "../../../services/productApi";
import Editor from "./Editor";
import { useCountriesQuery } from "../../../services/countryApi";
import { useBrandsQuery } from "../../../services/brandApi";
import DoubleEditor from "./DoubleEditor";
import DownloadImg from "./DownloadImg";
import { useCharacteristicsQuery } from "../../../services/characteristicApi";
import ProductCategorySelect from "./CategorySelect/ProductCategorySelect";
import ProductFormTop from "./ProductFormTop";
import { useSellersQuery } from "../../../services/sellerApi";
import { useNavigate } from "react-router-dom";
import { useModelsQuery } from "../../../services/modelApi";
import axios from "axios";
import CharacterSection from "./CharacteristicsSection/CharacterSection";
import AddAttributeSection from "./AddAttributeSection";
import { clearCharacters, filterCharacteristicValues } from "../productSlice";
import CountrySelect from "./CountrySelect/CountrySelect";
import BrandSelect from "./BrandSelect/BrandSelect";
import ModelSelect from "./ModalSelect/ModalSelect";
import { baseUrl } from "../../../constants";
import Titles from "./Titles";
import Seller from "./Seller";

function AddProductModalBody({ currentProduct }) {
  console.log(currentProduct)
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [ctgId, setCtgId] = useState(currentProduct?.category?.id || "");
  const [titleLn, setTitleLn] = useState(currentProduct?.title?.ln || "");
  const [titleRu, setTitleRu] = useState(currentProduct?.title?.ru || "");
  const [seller, setSeller] = useState(currentProduct?.seller?.id || "");
  const [country, setCountry] = useState(currentProduct?.country?.id || "");
  const [disabledCountry, setDisabledCountry] = useState(false);
  const [brand, setBrand] = useState(currentProduct?.brand?.id || 1);
  const [disabledBrand, setDisabledBrand] = useState(false);
  const [model, setModel] = useState(currentProduct?.model?.id);
  const [showModel, setShowModel] = useState(false);
  const [disabledModel, setDisabledModel] = useState(false);
  const [attributesLn, setAttributesLn] = useState(
    currentProduct?.attributes?.ln
  );
  const [attributesRu, setAttributesRu] = useState(
    currentProduct?.attributes?.ru
  );
  const [descriptionRu, setDescriptionRu] = useState("");
  const [descriptionLn, setDescriptionLn] = useState("");
  const [showCompound, setShowCompound] = useState(false);
  const [sostavUz, setSostavUz] = useState(currentProduct?.composition?.ln);
  const [sostavRu, setSostavRu] = useState(currentProduct?.composition?.ru);
  const [instructionUz, setInstructionUz] = useState(
    currentProduct?.composition?.ln
  );
  const [instructionRu, setInstructionRu] = useState(
    currentProduct?.composition?.ru
  );
  const [sertificateUz, setSertificateUz] = useState(
    currentProduct?.sertificate?.ln
  );
  const [sertificateRu, setSertificateRu] = useState(
    currentProduct?.sertificate?.ru
  );
  const [showInstruction, setShowInstruction] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [images, setImages] = useState([]);
  const { data: sellers, isSuccess: isSuccessSellers } = useSellersQuery();
  const { data: countries, isSuccess: isSuccessCountry } = useCountriesQuery();
  const { data: brands, isSuccess: isSuccessBrand } = useBrandsQuery();
  const { data: models, isSuccess: isSuccessModels } = useModelsQuery(brand);
  const { data: characteristics, isSuccess: isSuccessCharacteristics } =
    useCharacteristicsQuery();
  const [updateProduct] = usePatchProductDetailsMutation();
  const [addProduct] = useAddProductMutation();

  const allCharacters = useSelector(
    (state) => state.product.chosenCharacteristics
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const refs = useRef(false);
  useEffect(() => {
    if (!refs.current) {
      refs.current = true;
    } else {
      if (ctgId && titleLn && titleRu) {
        setDisabledBtn(false);
      } else setDisabledBtn(true);
      filterCharacteristicValues();
    }
  }, [ctgId, titleLn, titleRu, allCharacters]);

  const saveNewProduct = async (btnName) => {
    const chosenAllCharacters = allCharacters
      .filter((item) => item.chosenValues.length > 0)
      .map((item) => {
        return {
          id: item.charId,
          values: item.chosenValues.map((elem) => elem.id),
        };
      });
    const data = {
      category: ctgId,
      seller: seller,
      model: model,
      country: country,
      brand: brand,
      title_ln: titleLn,
      title_ru: titleRu,
      description_ln: descriptionLn,
      description_ru: descriptionRu,
      composition_ln: sostavUz,
      composition_ru: sostavRu,
      sertificate_ln: sertificateUz,
      sertificate_ru: sertificateRu,
      attributes_ln: attributesLn,
      attributes_ru: attributesRu,
      characteristics: chosenAllCharacters,
    };
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image);
    });
    console.log(formData);
    if (!currentProduct) {
      addProduct(data)
        .then((res) => {
          if (res?.data?.status) {
            console.log(res);
            const formData = new FormData();
            images.forEach((image) => {
              formData.append("file", image);
            });
            axios
              .post(
                `${baseUrl}/v1/product/images/${res?.data?.data?.id}/`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${JSON.parse(
                      localStorage.getItem("access-token")
                    )}`,
                    "Content-Type": "multipart/form-data; ",
                  },
                }
              )
              .then((res) => {
                dispatch(clearCharacters());
                if (btnName === "save") navigate("/app/products/all");
                if (btnName === "next")
                  navigate(`/app/product/${res?.data?.data?.id}/sku`);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateProduct({ id: currentProduct?.id, data })
        .unwrap()
        .then((res) => {
          dispatch(clearCharacters());
          if (btnName === "save") navigate("/app/products/all");
          if (btnName === "next")
            navigate(`/app/product/${currentProduct?.id}/sku`);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (ctgId && seller && titleLn && titleRu && country && model && brand) {
      setDisabledBrand(false);
    }
  }, [ctgId, seller, titleLn, titleRu, country, model, brand]);

  return (
    <div className="bg-white rounded-xl py-2 px-4 ">
      <ProductFormTop
        title="first"
        disabledBtn={disabledBtn}
        saveNewProduct={saveNewProduct}
      />

      <ProductCategorySelect
        setCtgId={setCtgId}
        category={currentProduct?.category}
      />
      <div className="flex flex-col w-full gap-y-5 ">
        <Titles
          titleLn={titleLn}
          setTitleLn={setTitleLn}
          titleRu={titleRu}
          setTitleRu={setTitleRu}
          currentProduct={currentProduct}
        />
        <div className="w-1/2">
          <Seller
            seller={seller}
            setSeller={setSeller}
            sellers={isSuccessSellers ? sellers?.results : []}
          />

          <CountrySelect
            disabledCountry={disabledCountry}
            setDisabledCountry={setDisabledCountry}
            country={country}
            setCountry={setCountry}
            countries={isSuccessCountry ? countries?.results : []}
          />
          <BrandSelect
            disabledBrand={disabledBrand}
            setDisabledBrand={setDisabledBrand}
            brand={brand}
            setBrand={setBrand}
            setShowModel={setShowModel}
            brands={isSuccessBrand ? brands.results : []}
          />
          {showModel && (
            <ModelSelect
              setModel={setModel}
              model={model}
              disabledModel={disabledModel}
              setDisabledModel={setDisabledModel}
              models={isSuccessModels ? models?.results : []}
            />
          )}
        </div>
      </div>
      <div className="">
        <h2 className="text-base my-3 font-semibold uppercase">
          PRODUCT DESCRIPTION IN UZBEK
        </h2>

        <Editor
          initialValue={descriptionLn}
          setDess={setDescriptionLn}
          name="descUz"
          // productInfo={productInfo}
          // updateProductTitleFormValue={updateProductTitleFormValue}

          // getValue={getValue}
        />
      </div>

      <div className="">
        <h2 className="text-base my-3 font-semibold uppercase">
          Описание товара на русском
        </h2>
        <Editor initialValue={descriptionRu} setDess={setDescriptionRu} />
      </div>
      <AddAttributeSection
        setAttributesLn={setAttributesLn}
        setAttributesRu={setAttributesRu}
      />
      <div className="">
        {isSuccessCharacteristics && (
          <CharacterSection
            characters={currentProduct?.characteristics}
            characteristics={characteristics?.data}
          />
        )}
        <div className="h-0.5 bg-slate-300"></div>
        <div className="flex flex-col w-2/3 mb-8">
          <div className="mb-5">
            <h2 className="text-base my-3 font-semibold uppercase">
              Состав на Узбекском
            </h2>
            <p className="mb-7">Укажите состав товара</p>
            <button
              className="btn btn-success text-white px-6"
              onClick={() => setShowCompound(!showCompound)}
            >
              Добавить
            </button>
          </div>
          {showCompound && (
            <DoubleEditor
              setDessOne={setSostavUz}
              setDessTwo={setSostavRu}
              initialValueOne={sostavUz}
              initialValueTwo={sostavRu}
              textLabel={"Состав"}
            />
          )}
        </div>
        <div className="h-0.5 bg-slate-300"></div>
        <div className="flex flex-col w-2/3 mb-8">
          <div className="mb-5">
            <h2 className="text-base my-3 font-semibold uppercase">
              Инструкция на Узбекском
            </h2>
            <p className="mb-7">Укажите состав товара</p>
            <button
              className="btn btn-success text-white px-6"
              onClick={() => setShowInstruction(!showInstruction)}
            >
              Добавить
            </button>
          </div>
          {showInstruction && (
            <DoubleEditor
              setDessOne={setInstructionUz}
              setDessTwo={setInstructionRu}
              initialValueOne={instructionUz}
              initialValueTwo={instructionRu}
              textLabel={"Инструкция"}
            />
          )}
        </div>
        <div className="h-0.5 bg-slate-300"></div>
        <div className="flex flex-col w-2/3 mb-8">
          <div className="mb-5">
            <h2 className="text-base my-3 font-semibold uppercase">
              Сертификаты на Узбекском
            </h2>
            <p className="mb-7">Укажите состав товара</p>
            <button
              className="btn btn-success text-white px-6"
              onClick={() => setShowCertificate(!showCertificate)}
            >
              Добавить
            </button>
          </div>
          {showCertificate && (
            <DoubleEditor
              // productInfo={productInfo}
              setDessOne={setSertificateUz}
              setDessTwo={setSertificateRu}
              initialValueOne={sertificateUz}
              initialValueTwo={sertificateRu}
              textLabel={"Сертификаты"}
            />
          )}
        </div>
        <div className="h-0.5 bg-slate-300"></div>
        <div className="">
          <div className="">
            <h2 className="text-base my-3 font-semibold uppercase">
              Загрузить фотографии
            </h2>
            <DownloadImg
              images={images}
              setImages={setImages}
              textDownload={"фото"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModalBody;
