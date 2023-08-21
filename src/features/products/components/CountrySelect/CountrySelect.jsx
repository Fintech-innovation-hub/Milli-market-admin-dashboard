function CountrySelect({
  country,
  setCountry,
  countries,
  disabledCountry,
  setDisabledCountry,
  currentProduct

}) {
  return (
    <div className="flex flex-col my-4 items-start gap-2">
      <h2 className="text-base my-1 font-semibold uppercase">
        Country
        {currentProduct && (
          <span className="text-lg ml-3 lowercase">
            ({currentProduct?.seller?.first_name}-
            {currentProduct?.seller?.phone_number})
          </span>
        )}
        </h2>
      <select
        disabled={disabledCountry}
        value={country}
        className={`w-full ${
          disabledCountry && 'bg-slate-300'
        } border-2 border-inherit p-2 text-base  outline-0 cursor-pointer`}
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
      <label className="flex items-center  gap-3">
        <input
          onChange={(e) => setDisabledCountry(e.target.checked)}
          className="h-5 w-5 cursor-pointer"
          type="checkbox"
        />
        <span className="text-cyan-600">Tanlovni bekor qilish</span>
      </label>
    </div>
  );
}

export default CountrySelect;
