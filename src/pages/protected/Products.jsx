import Products from "../../features/products";
import { useNavigate } from "react-router-dom";
import { useProductsQuery } from "../../services/productApi";
import { Dna } from "react-loader-spinner";
import TitleCard from "../../components/Cards/TitleCard";

const TopSideButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => navigate("/app/products/add/new")}
      >
        Add New Product
      </button>
    </div>
  );
};
function InternalPage() {
  const { data: products, isLoading, isSuccess } = useProductsQuery();

  return (
    <TitleCard
      title="Current Products"
      topMargin="mt-2"
      TopSideButtons={<TopSideButtons />}
    >
      <div className="overflow-x-auto w-full">
        {isLoading && (
          <div className="w-full flex pt-24 h-screen justify-center bg-slate-100 bg-opacity-30">
            <Dna
              visible={true}
              height="200"
              width="200"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
        {isSuccess && <Products products={products?.data} />}
      </div>
    </TitleCard>
  );
}

export default InternalPage;
