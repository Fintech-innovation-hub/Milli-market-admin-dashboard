function ModelSelect({
  model,
  setModel,
  models,
  disabledModel,
  setDisabledModel,
}) {
  return (
    <div className="flex flex-col my-4 items-start gap-2">
      <h2 className="text-base my-1 font-semibold uppercase">Model</h2>
      <select
        disabled={disabledModel}
        value={model}
        className={`w-full ${
          disabledModel && 'bg-slate-300'
        } border-2 border-inherit p-2 text-base  outline-0 cursor-pointer`}
        onChange={(e) => {
          setModel(Number(e.target.value));
        }}
        name="model"
      >
        <option disabled value="">
          Choose model
        </option>
        {models?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
      <label className="flex items-center  gap-3">
        <input
          onChange={(e) => setDisabledModel(e.target.checked)}
          className="h-5 w-5 cursor-pointer"
          type="checkbox"
        />
        <span className="text-cyan-600">Tanlovni bekor qilish</span>
      </label>
    </div>
  );
}

export default ModelSelect;
