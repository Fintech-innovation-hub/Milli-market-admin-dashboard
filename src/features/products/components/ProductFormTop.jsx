import React from 'react';

function ProductFormTop({ closeModal, saveNewProduct, disabledBtn }) {
  return (
    <div className="modal-action">
      <button className="btn btn-ghost" onClick={() => closeModal()}>
        Cancel
      </button>
      <button
        disabled={disabledBtn}
        className="btn btn-primary px-6 cursor-pointer"
        onClick={() => saveNewProduct()}
      >
        Save
      </button>
      <button
        disabled={disabledBtn}
        className="btn btn-primary px-6 cursor-pointer"
        onClick={() => saveNewProduct()}
      >
        Next
      </button>
    </div>
  );
}

export default ProductFormTop;
