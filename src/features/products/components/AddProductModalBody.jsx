import { useReducer, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { useAddProductMutation } from '../../../services/productApi';
import { showNotification } from '../../common/headerSlice';
import Editor from './Editor';
import { useCountriesQuery } from '../../../services/countryApi';
import { useBrandsQuery } from '../../../services/brandApi';
import Steps from './Steps';
import DoubleEditor from './DoubleEditor';
import DownloadImg from './DownloadImg';
import { useCharacteristicsQuery } from '../../../services/characteristicApi';
import { productReducer, initialValue } from '../../../reducer/productReducer';
import ProductCategorySelect from './ProductCategorySelect';
import ProductFormTop from './ProductFormTop';
import { useSellersQuery } from '../../../services/sellerApi';
import { useNavigate } from 'react-router-dom';
import { useModelsQuery } from '../../../services/modelApi';
import axios from 'axios';
import CharacterSection from './CharacteristicsSection/CharacterSection';
import AddAttributeSection from './AddAttributeSection';
import { clearCharacters, filterCharacteristicValues } from '../productSlice';

function AddProductModalBody({ closeModal, extraObject, size }) {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [ctgId, setCtgId] = useState('');
  const [titleLn, setTitleLn] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [country, setCountry] = useState('');
  const [brand, setBrand] = useState(1);
  const [showModel, setShowModel] = useState(false);
  const [model, setModel] = useState('');
  const [seller, setSeller] = useState('');
  const [attributesLn, setAttributesLn] = useState({});
  const [attributesRu, setAttributesRu] = useState({});
  const [descriptionLn, setDescriptionLn] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [sostavUz, setSostavUz] = useState('');
  const [sostavRu, setSostavRu] = useState('');
  const [instructionUz, setInstructionUz] = useState('');
  const [instructionRu, setInstructionRu] = useState('');
  const [sertificateUz, setSertificateUz] = useState('');
  const [sertificateRu, setSertificateRu] = useState('');
  const [showCompound, setShowCompound] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  // const [allCharacters, setAllCharacters] = useState([]);
  const { data: brands, isSuccess: isSuccessBrand } = useBrandsQuery();
  const { data: countries, isSuccess: isSuccessCountry } = useCountriesQuery();
  const { data: sellers, isSuccess: isSuccessSellers } = useSellersQuery();
  const { data: models, isSuccess: isSuccessModels } = useModelsQuery(brand);
  const { data: characteristics, isSuccess: isSuccessCharacteristics } =
    useCharacteristicsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addProduct, result] = useAddProductMutation();
  const allCharacters = useSelector(
    (state) => state.product.chosenCharacteristics
  );
  const saveNewProduct = (btnName) => {
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
    const headers = {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem('access-token')
      )}`,
    };

    addProduct(data);
    axios
      .post('https://admin.milli.uz/api/v1/product/', data, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.data);
        dispatch(clearCharacters());
        if (btnName === 'save') navigate('/app/products/all');
        if (btnName === 'next')
          navigate(`/app/product/${res?.data?.data?.id}/sku`);
      })
      .catch((err) => {
        console.log(err);
      });
  
  };
  useEffect(() => {
    if (ctgId && titleLn && titleRu && brand && model) {
      setDisabledBtn(false);
    } else setDisabledBtn(true);
    filterCharacteristicValues();
  }, [ctgId, titleLn, titleRu, brand, model, allCharacters]);

  return (
    <div className="bg-white rounded-xl py-2 px-8 ">
      <section className="grid grid-cols-1 gap-x-5 gap-y-2 w-full">
        <div className="flex items-center justify-between">
          <Steps title={'first'} />
          <ProductFormTop
            disabledBtn={disabledBtn}
            closeModal={closeModal}
            saveNewProduct={saveNewProduct}
          />
        </div>
        <ProductCategorySelect setCtgId={setCtgId} />
        <div className="flex flex-col w-full gap-y-5 ">
          <div className="w-1/2">
            <div className={`form-control w-full mt-3`}>
              <label className="label">
                <span className={'label-text text-base-content font-bold '}>
                  Title_uz
                </span>
              </label>
              <input
                required
                type="text"
                value={titleLn}
                onChange={(e) => setTitleLn(e.target.value)}
                placeholder="title ln"
                name="titleUz"
                className=" rounded p-2 outline-none  product-input "
              />
            </div>
            <div className={`form-control w-full mt-3`}>
              <label className="label">
                <span className={'label-text text-base-content font-bold '}>
                  Title_ru
                </span>
              </label>
              <input
                required
                type="text"
                value={titleRu}
                onChange={(e) => setTitleRu(e.target.value)}
                placeholder="title ru"
                name="titleRu"
                className=" product-input rounded p-2 outline-none  input-bordered w-full  "
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">
                Country
              </h2>
              <select
                value={country}
                className="w-full border-2 border-inherit p-2 text-base outline-0 cursor-pointer"
                onChange={(e) => {
                  setCountry(Number(e.target.value));
                }}
                name="country"
              >
                <option disabled value="">
                  Choose country
                </option>
                {countries?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">Seller</h2>
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
            <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">Бранд</h2>
              <select
                name="brand"
                value={brand}
                className="w-full border-2 border-inherit p-2 text-base outline-0 cursor-pointer"
                onChange={(e) => {
                  setBrand(e.target.value);
                  setShowModel(true);
                }}
              >
                <option value="" disabled>
                  Choose brand
                </option>
                {isSuccessBrand &&
                  brands?.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
            {showModel && (
              <div className="">
                <h2 className="text-base my-3 font-semibold uppercase">
                  Model
                </h2>
                <select
                  name="model"
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                  className="w-full border-2 border-inherit p-2 text-base outline-0"
                  placeholder="Choose model"
                  data-te-select-init
                  data-te-select-visible-options="3"
                >
                  <option disabled value="">
                    Choose model
                  </option>
                  {isSuccessModels &&
                    models?.data?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <h2 className="text-base my-3 font-semibold uppercase">
            PRODUCT DESCRIPTION IN UZBEK
          </h2>

          <Editor
            initialValue={descriptionLn}
            // productInfo={productInfo}
            name="descUz"
            // updateProductTitleFormValue={updateProductTitleFormValue}

            setDess={setDescriptionLn}
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
            <CharacterSection characteristics={characteristics?.data} />
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
                textLabel={'Состав'}
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
                textLabel={'Инструкция'}
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
                setDessTwo={setSertificateUz}
                initialValueOne={sertificateUz}
                initialValueTwo={sertificateRu}
                textLabel={'Сертификаты'}
              />
            )}
          </div>
          <div className="h-0.5 bg-slate-300"></div>
          <div className="">
            <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">
                Загрузить фотографии
              </h2>
              <DownloadImg textDownload={'фото'} />
            </div>
            {/* <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">
                Загрузить видео (размер до 10мб)
              </h2>
              <DownloadImg textDownload={'видео'} />
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddProductModalBody;
