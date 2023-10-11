import React from 'react'
import CategoryTableRow from './CategoryTableRow'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { openModal } from '../../common/modalSlice';
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../../utils/globalConstantUtil';
import { chooseCategoryId } from '../categorySlice';

function CategoryTable({ categories }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteCurrentCategory = (id) => {
        dispatch(
          openModal({
            title: "Confirmation",
            bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: {
              message: `Are you sure you want to delete this category?`,
              type: CONFIRMATION_MODAL_CLOSE_TYPES.CATEGORY_DELETE,
              id,
            },
          })
        );
      };
      const getCategoryDetailHandler = (id) => {
        dispatch(chooseCategoryId(id))
        navigate(`/app/categories/${id}`);
      };
      const editCurrentCategory = (id) => {
        alert(id);
      };
      if(categories?.data?.length===0){
        return <h1 className='text-xl  font-bold'>Bunday Categoriyalar mavjud emas.</h1>
      }
    return (
        <table className="product-table w-full">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Title uz</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories.data.map((category, index) =>
                    (
                        <CategoryTableRow
                        key={category.id}
                            index={index}
                            {...category}
                            getCategoryDetailHandler={getCategoryDetailHandler}
                            deleteCurrentCategory={deleteCurrentCategory}
                            editCurrentCategory={ editCurrentCategory}
                        />
                    )
                    )
                }
            </tbody>
        </table>
    )
}

export default CategoryTable


