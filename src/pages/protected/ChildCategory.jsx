import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import ChildCategoryUi from '../../features/categories/components/ChildCategoryUi';

function ChildCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Child Category' }));
  }, []);

  return <ChildCategoryUi />;
}

export default ChildCategory;
