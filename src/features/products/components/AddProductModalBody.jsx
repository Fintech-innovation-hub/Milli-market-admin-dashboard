import { useReducer, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import {
  useAddProductMutation,
  useProductItemQuery,
} from '../../../services/productApi';
import { showNotification } from '../../common/headerSlice';
import Editor from './Editor';
import { useCountriesQuery } from '../../../services/countryApi';
import { useBrandsQuery } from '../../../services/brandApi';
import Steps from './Steps';
import DoubleEditor from './DoubleEditor';
import DownloadImg from './DownloadImg';
import { useCharacteristicsQuery } from '../../../services/characteristicApi';
import { productReducer, initialValue } from '../../../reducer/productReducer';
import ProductCategorySelect from './CategorySelect/ProductCategorySelect';
import ProductFormTop from './ProductFormTop';
import { useSellersQuery } from '../../../services/sellerApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useModelsQuery } from '../../../services/modelApi';
import axios from 'axios';
import CharacterSection from './CharacteristicsSection/CharacterSection';
import AddAttributeSection from './AddAttributeSection';
import { clearCharacters, filterCharacteristicValues } from '../productSlice';
import CountrySelect from './CountrySelect/CountrySelect';
import BrandSelect from './BrandSelect/BrandSelect';
import ModelSelect from './ModalSelect/ModalSelect';
import { baseUrl } from '../../../constants';
import Titles from './Titles';
import Seller from './Seller';

function AddProductModalBody({ closeModal, extraObject, size }) {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);

  const [disabledCountry, setDisabledCountry] = useState(false);
  const [disabledBrand, setDisabledBrand] = useState(false);
  const [disabledModel, setDisabledModel] = useState(false);
  const [titleTopBtn, setTitleTopBtn] = useState('first');
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
    axios
      .post('https://admin.milli.uz/api/v1/product/', data, {
        headers: headers,
      })
      .then((res) => {
        dispatch(clearCharacters());
        if (btnName === 'save') navigate('/app/products/all');
        if (btnName === 'next')
          navigate(`/app/product/${res?.data?.data?.id}/sku`);
        setTitleTopBtn('second');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const refs = useRef(false);
  useEffect(() => {
    if (!refs.current) {
      refs.current = true;
    } else {
      if (ctgId && titleLn && titleRu && brand && model) {
        setDisabledBtn(false);
      } else setDisabledBtn(true);
      filterCharacteristicValues();
    }
  }, [ctgId, titleLn, titleRu, brand, model, allCharacters]);

  useEffect(() => {
    const getData = async () => {
      const headers = {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem('access-token')
        )}`,
      };
      try {
        const data = await axios.get(
          `${baseUrl}/v1/product/?product_id=${productId}`,
          {
            headers: headers,
          }
        );
        console.log(data?.data);
        setCurrentProduct(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (productId !== ' new') {
      getData()
      console.log("new emas")
    }
  }, []);

  console.log("add product")

  return (
    <div className="bg-white rounded-xl py-2 px-4 ">
      <ProductFormTop
        title={titleTopBtn}
        setTitleTopBtn={setTitleTopBtn}
        disabledBtn={disabledBtn}
        closeModal={closeModal}
        saveNewProduct={saveNewProduct}
      />

      <ProductCategorySelect
        currentProduct={currentProduct}
        setCtgId={setCtgId}
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
            sellers={sellers}
            currentProduct={currentProduct}
          />
          <CountrySelect
            disabledCountry={disabledCountry}
            setDisabledCountry={setDisabledCountry}
            country={country}
            setCountry={setCountry}
            countries={countries}
            currentProduct={currentProduct}
          />

          <BrandSelect
            disabledBrand={disabledBrand}
            setDisabledBrand={setDisabledBrand}
            brand={brand}
            setBrand={setBrand}
            setShowModel={setShowModel}
            brands={isSuccessBrand ? brands.data : []}
          />

          {showModel && (
            <ModelSelect
              setModel={setModel}
              model={model}
              disabledModel={disabledModel}
              setDisabledModel={setDisabledModel}
              models={models?.data}
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
        
        </div>
      </div>
    </div>
  );
}

export default AddProductModalBody;
