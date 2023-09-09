import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import CategoryDetail from '../../features/categoryDetail';

function CategoryDetailPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Category detail' }));
  }, []);

  return <CategoryDetail />;
}

export default CategoryDetailPage;
