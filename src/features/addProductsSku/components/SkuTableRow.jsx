import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { baseUrl } from '../../../constants';
import { Vortex } from 'react-loader-spinner';
import { useRef } from 'react';

function SkuTableRow({
  index,
  title,
  inputSku,
  ikpu,
  barcode,
  id,
  status,
  price,
  setItems,
  self,
  item,
}) {
  console.log(self);
  const [showIkpuModal, setShowIkpuModal] = useState(false);
  const [price1, setPrice] = useState(price || '');
  const [ikpuCode, setIkpuCode] = useState(ikpu?.code || '');
  const [ikpuId, setIkpuId] = useState(ikpu?.id || '');
  const [barcodeCode, setBarcodeCode] = useState(barcode?.code || '');
  const [barcodeId, setBarcodeId] = useState(barcode?.id || "");
  const [ikpuDatas, setIkpuDatas] = useState(null);
  const [barcodeDatas, setBarcodeDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notfound, setNotfound] = useState('');

  const chooseIkpu = (id, title, code) => {
    setIkpuCode(code);
    setIkpuId(id);
    setShowIkpuModal(false);
  };
  const refs = useRef(false);
  useEffect(() => {
    if (!refs.current) {
      refs.current = true;
      return;
    }
    const changed = self.map((item) => {
      return item.id === id
        ? {
            ...item,
            ikpu: ikpuId,
            barcode: barcodeId,
            price: price1,
          }
        : item;
    });
    setItems(changed);
  }, [barcodeCode, price1, ikpuCode]);
  useEffect(() => {
    if (barcodeCode.length === 13) {
      axios
        .get(`${baseUrl}/v1/product/barcode/?code=${barcodeCode}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('access-token')
            )}`,
          },
        })
        .then((res) => {
          setBarcodeDatas(res.data);
          if (res.data?.data?.length > 0) {
            setBarcodeId(res.data?.data[0].code);
          } else {
            setBarcodeId('');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [barcode]);

  const ikpuHandler = (e) => {
    setIkpuCode(e.target.value);
    if (ikpuCode.length > 1 && ikpuCode.length < 13) {
      setShowIkpuModal(true);
      axios
        .get(`${baseUrl}/v1/product/ikpu/?q=${e.target.value}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('access-token')
            )}`,
          },
        })
        .then((res) => {
          setIkpuDatas(res.data?.data);
        })
        .catch((err) => console.log(err));
    } else {
      setShowIkpuModal(false);
    }
  };

  // data:[{code:"",title}]
  return (
    <tr className="hover:bg-slate-400 duration-500 cursor-pointer">
      <td>{index + 1}</td>

      <td>{title || inputSku}</td>
      <td>
        <input
          minLength={13}
          maxLength={13}
          value={barcodeCode}
          name="barcode"
          onChange={(e) => setBarcodeCode(e.target.value)}
          type="text"
          className="text-black"
        />
      </td>
      <td className="relative w-96">
        <input
          className=""
          value={ikpuCode}
          name="ikpu"
          type="text"
          onChange={ikpuHandler}
        />
        <div
          className={` ${
            showIkpuModal ? '' : 'hidden'
          } h-80 w-96 bg-white text-black absolute p-3 top-[-320px] left-16 overflow-scroll`}
        >
          {/* {loading && (
            <div className=" h-full w-full flex items-center justify-center">
              <Vortex
                visible={true}
                height="110"
                width="110"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
              />
            </div>
          )} */}
          {ikpuDatas?.map((item) => (
            <div
              key={item.id}
              onClick={() => chooseIkpu(item.id, item.title_ln, item.code)}
              className="p-2 border-b-orange-600 border-2 flex flex-col items-start gap-1 text-black"
            >
              <h2 className="text-left text-[13px]">{item.title_ln}</h2>
              <p className="text-left text-[15px]">{item.code}</p>
            </div>
          ))}
        </div>
      </td>
      <td>
        <input
          value={price1}
          name="price1"
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="price"
        />
      </td>

      <td>{status}</td>
    </tr>
  );
}

export default SkuTableRow;
