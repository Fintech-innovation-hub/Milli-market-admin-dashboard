import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { baseUrl } from '../../../constants';
import { Vortex } from 'react-loader-spinner';

function SkuTableRow({ index, title, inputSku, id, status }) {
  const [showIkpuModal, setShowIkpuModal] = useState(false);
  const [price, setPrice] = useState('');
  const [ikpu, setIkpu] = useState('');
  const [barcode, setBarcode] = useState('');
  const [ikpuDatas, setIkpuDatas] = useState(null);
  const [barcodeDatas, setBarcodeDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notfound, setNotfound] = useState('');
  const handleChange = (e) => {
    setIkpu(e.target.value);
  };
  console.log(ikpuDatas);
  const chooseIkpu = (id, title, code) => {
    setIkpu(code);
    setShowIkpuModal(false);
  };

  useEffect(() => {
    if (barcode.length === 13) {
      axios
        .get(`${baseUrl}/v1/product/barcode/?code=${barcode}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('access-token')
            )}`,
          },
        })
        .then((res) => {
          setBarcodeDatas(res.data);
          if (res.data?.data?.length > 0) {
            setBarcode(res.data?.data[0].code);
          } else {
            setBarcode('');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [barcode]);

  useEffect(() => {
    if (ikpu.length >= 2 && ikpu.length < 12) {
      axios
        .get(`${baseUrl}/v1/product/ikpu/?q=${ikpu}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('access-token')
            )}`,
          },
        })
        .then((res) => {
          setShowIkpuModal(true);
          if (res.data?.data?.length === 0) {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setNotfound('Malumot topilmadi😒');
            }, 3000);
            return;
          }
          setLoading(false);
          setNotfound('');
          setIkpuDatas(res.data?.data);
        })
        .catch((err) => console.log(err));
    } else {
      setShowIkpuModal(false);
      setLoading(false);
      setNotfound('');
    }
  }, [ikpu]);

  console.log(barcodeDatas);
  // data:[{code:"",title}]
  return (
    <tr className="hover:bg-slate-400 duration-500 cursor-pointer">
      <td>{index + 1}</td>

      <td>{title || inputSku}</td>
      <td>
        <input
          minLength={13}
          maxLength={13}
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          type="text"
        />
      </td>
      <td className="relative w-96">
        <input
          className="w-full"
          value={ikpu}
          type="search"
          onChange={handleChange}
        />
        <div
          className={` ${
            showIkpuModal ? '' : 'hidden'
          } h-80 w-96 bg-white text-black absolute p-3 top-[-320px] left-16 overflow-scroll`}
        >
          {loading && (
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
          )}
          <h1 className="text-lg text-red-500">{!loading && notfound}</h1>
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
