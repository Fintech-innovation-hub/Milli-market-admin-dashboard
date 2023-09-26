export default function ProductSelect({ products, setProductID }) {
  return (
    <select
      onChange={(e) =>setProductID(e.target.value)}
      className="w-full  border-2 border-inherit p-2 text-base outline-0 cursor-pointer"
      placeholder="Choose Product"
      data-te-select-init
      data-te-select-visible-options="3"
      name="product"
    >
        {products.map((item) => (
          <option key={item.id} label={item.title} value={item.id}>
            {item.title}
          </option>
        ))}
    </select>
  );
}
