import React from 'react';
import Steps from './Steps';
import {useNavigate} from 'react-router-dom';

function ProductFormTop({ closeModal, title, saveNewProduct, disabledBtn,setTitleTopBtn }) {
  const navigate=useNavigate()
  return (
    <div className="flex items-center justify-between  w-full">
      <Steps title={title} />

      {
        (title ==='first' ? (
          <div className="modal-action">
            <button
              disabled={disabledBtn}
              className="btn btn-primary px-6 cursor-pointer"
              onClick={() => {
                saveNewProduct('save');
              }}
            >
              Save
            </button>
            <button
              disabled={disabledBtn}
              className="btn btn-primary px-6 cursor-pointer"
              onClick={() => {
                saveNewProduct('next');
              }}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="modal-action">
            <button
              disabled={disabledBtn}
              className="btn btn-primary px-6 cursor-pointer"
              onClick={() => {
                navigate(-1);
                setTitleTopBtn("first")
              }}
            >
              Prev
            </button>
            <button
              disabled={disabledBtn}
              className="btn btn-primary px-6 cursor-pointer"
              onClick={() => {
                saveNewProduct('next');
              }}
            >
              Finish
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default ProductFormTop;
