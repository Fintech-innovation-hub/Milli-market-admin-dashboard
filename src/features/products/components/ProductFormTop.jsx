import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductFormTop({ closeModal, saveNewProduct, disabledBtn }) {
  const navigate = useNavigate();
  return (
    <div className="modal-action">
      <button className="btn btn-ghost" onClick={() => closeModal()}>
        Cancel
      </button>
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
  );
}

export default ProductFormTop;
