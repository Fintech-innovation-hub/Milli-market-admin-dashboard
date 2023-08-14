import React from 'react';

function BrandSelect({
  brand,
  setShowModel,
  setBrand,
  brands,
  disabledBrand,
  setDisabledBrand,
}) {
  return (
    <div className="flex flex-col my-4 items-start gap-2">
      <h2 className="text-base  font-semibold uppercase">Бранд</h2>
      <select
        disabled={disabledBrand}
        name="brand"
        value={brand}
        className={`w-full ${
          disabledBrand && 'bg-slate-300'
        } border-2 border-inherit p-2 text-base  outline-0 cursor-pointer`}
        onChange={(e) => {
          setBrand(e.target.value);
          setShowModel(true);
        }}
      >
        <option value="" disabled>
          Choose brand
        </option>
        {brands.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
      <label className="flex items-center  gap-3">
        <input
          onChange={(e) => setDisabledBrand(e.target.checked)}
          className="h-5 w-5 cursor-pointer"
          type="checkbox"
        />
        <span className="text-cyan-600">Tanlovni bekor qilish</span>
      </label>
    </div>
  );
}

export default BrandSelect;
