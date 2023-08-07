import React, { useState,useEffect } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

function AddAttributeSection({ setAttributesLn,setAttributesRu}) {
  const [ln, setLn] = useState('');
  const [ru, setRu] = useState('');

  const [combinedArray, setCombinedArray] = useState([]);
  const sets = [setLn, setRu];
  const addAtribut = () => {
    if (!ln) {
      alert('attribut kiriting!');
      return;
    }
    const newAtt = {
      attributes_ln: ln,
      attributes_ru: ru,
      id: combinedArray.length + 1,
    };
    setCombinedArray([...combinedArray, newAtt]);
    sets.forEach((fn) => fn(''));
  };


  const deleteAtr = (id) => {
    let filtered = combinedArray.filter((item) => item.id !== id);
    setCombinedArray(filtered);
  };
  
  useEffect(() => {
    const attributeLns = combinedArray.map((item) => item.attributes_ln);
    const attributeRus = combinedArray.map((item) => item.attributes_ru);
    let atlns = {};
    let atrus = {};
    attributeLns.map((elem, index) => (atlns[index] = elem));
    attributeRus.map((elem, index) => (atrus[index] = elem));
    setAttributesLn(atlns)
    setAttributesRu(atrus)
 
  }, [combinedArray]);

  return (
    <div className="flex flex-col  items-start gap-3 my-3">
      <div className="flex gap-x-5 items-end ">
        <div className={`form-control w-full mt-3 `}>
          <label className="label">
            <span className={'label-text text-base-content font-bold '}>
              Attribut_uz
            </span>
          </label>
          <input
            required
            type="text"
            value={ln}
            onChange={(e) => setLn(e.target.value)}
            name="attributUz"
            placeholder="attribute ln"
            className="border border-solid border-gray-400 rounded p-2 outline-none  input-bordered w-full  "
          />
        </div>
        <div className={`form-control w-full mt-3`}>
          <label className="label">
            <span className={'label-text text-base-content font-bold '}>
              Attribut_ru
            </span>
          </label>
          <input
            required
            type="text"
            value={ru}
            onChange={(e) => setRu(e.target.value)}
            name="attributRu"
            placeholder="attribute ru"
            className="border border-solid border-gray-400 rounded p-2 outline-none  input-bordered w-full  "
          />
        </div>
        <button className="btn btn-primary px-6" onClick={addAtribut}>
          Add
        </button>
      </div>

      {combinedArray.length > 0 && (
        <table className="w-1/2 min-w-[400px] border-slate-500 rounded p-2 text-left">
          <thead>
            <tr>
              <th>№</th>
              <th>Attr uz</th>
              <th>Attr ru</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {combinedArray.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.attributes_ln}</td>
                <td>{item.attributes_ru}</td>
                <td>
                  <button onClick={() => deleteAtr(item.id)}>
                    <BsFillTrashFill className="text-[15px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AddAttributeSection;
