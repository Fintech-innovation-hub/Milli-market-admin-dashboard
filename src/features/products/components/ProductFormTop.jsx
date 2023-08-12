import React from 'react';

function ProductFormTop({ closeModal, saveNewProduct, disabledBtn }) {
  return (
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
  );
}

export default ProductFormTop;
