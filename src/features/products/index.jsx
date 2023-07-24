import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import { useCategoriesQuery } from "../../services/categoryApi";
import { useNavigate } from "react-router-dom";

const TopSideButtons = () => {
  const dispatch = useDispatch();

 
  const navigate = useNavigate()
  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => navigate('/app/products/add')}
      >
        Add New Product
      </button>
    </div>
  );
};

function Products() {
  // const { leads } = useSelector(state => state.lead)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
  } = useCategoriesQuery();

  // useEffect(() => {
  //     // dispatch(getLeadsContent())
  // }, [])

  const getDummyStatus = (index) => {
    if (index % 5 === 0) return <div className="badge">Not Interested</div>;
    else if (index % 5 === 1)
      return <div className="badge badge-primary">In Progress</div>;
    else if (index % 5 === 2)
      return <div className="badge badge-secondary">Sold</div>;
    else if (index % 5 === 3)
      return <div className="badge badge-accent">Need Followup</div>;
    else return <div className="badge badge-ghost">Open</div>;
  };

  const deleteCurrentCategory = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this product?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          id,
        },
      })
    );
  };
  const getCategoryDetailHandler = (id) => {
    navigate(`/app/categories/${id}`);
  };

  return (
    <>
      <TitleCard
        title="Current Products"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Categories List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          {/* <table className="table w-full">
            <thead>
              <tr>
                <th>№</th>
                <th>Title uz</th>
                <th>Title kr </th>
                <th>Title ru</th>
                <th>Title en</th>
               
              </tr>
            </thead>
            <tbody>
              {isSuccess &&
                categories.status &&
                categories.data.map((category, index) => {
                  return (
                    <tr
                      className="hover:bg-slate-400 duration-500 cursor-pointer"
                      key={category.id}
                    >
                      <td>
                        {index + 1}
                       
                      </td>
                      <td onClick={() => getCategoryDetailHandler(category.id)}>
                        {category.title.title_ln}
                      </td>
                     
                      <td>{category.title.title_kr}</td>
                      <td>{category.title.title_ru}</td>
                      <td>{category.title.title_en}</td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentCategory(category.id)}
                        >
                          <TrashIcon className="w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table> */}
        </div>
      </TitleCard>
    </>
  );
}

export default Products;
