import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TitleCard from '../../components/Cards/TitleCard';
import { openModal } from '../common/modalSlice';
// import { deleteLead, getLeadsContent } from './leadSlice';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { showNotification } from '../common/headerSlice';
import {
  useCategoriesQuery,
  useCategoryItemDetailsQuery,
  useDeleteCategoryMutation,
} from '../../services/categoryApi';

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: 'Add New Category Child',
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New Category 
      </button>
    </div>
  );
};

function CategoryDetail() {
  // const { leads } = useSelector(state => state.lead)
  const dispatch = useDispatch();
  // const { data: category, isLoading, isSuccess, isError } = useCategoriesQuery()
  // console.log(category)

  // useEffect(() => {
  //     // dispatch(getLeadsContent())
  // }, [])
  const { categoryId } = useParams();
  const { data: category, isSuccess } = useCategoryItemDetailsQuery(categoryId);
  console.log(category);

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

  // const deleteCurrentCategory = (id) => {
  //   // dispatch(openModal({
  //   //     title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
  //   //     extraObject: { message: `Are you sure you want to delete this lead?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, id },
  //   // }))
  //   deleteCategory(id);
  // };

  return (
    <>
      <TitleCard
        title={
          (isSuccess && category.status && category?.parent?.title_ln) ||
          ''
        }
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* CategoryDetail List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Title uz</th>
                                <th>Title kr </th>
                                <th>Title ru</th>
                                <th>Title en</th>
                                {/* <th>Assigned To</th>
                                <th></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isSuccess && category.status && category.data.map((category, index) => {
                                    return (
                                        <tr  className="hover:bg-slate-400 duration-500 cursor-pointer" key={category.id}>
                                            <td  >
                                                {index + 1}
                                                {/* <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={l.avatar} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.first_name}</div>
                                                        <div className="text-sm opacity-50">{l.last_name}</div>
                                                    </div>
                                                </div> */}
                                            </td>
                                            <td>{category.title.title_ln}</td>
                                            {/* <td>{moment(new Date()).add(-5 * (index + 2), 'days').format("DD MMM YY")}</td> */}
                                            {/* <td>{getDummyStatus(k)}</td> */}
                                            <td>{category.title.title_kr}</td>
                                            <td>{category.title.title_ru}</td>
                                            <td>{category.title.title_en}</td>
                                            <td><button className="btn btn-square btn-ghost" ><TrashIcon className="w-5" /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
      </TitleCard>
    </>
  );
}

export default CategoryDetail;
