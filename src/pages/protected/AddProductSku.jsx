import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddProductsSku from '../../features/addProductsSku/AddProductsSku';
import { setPageTitle } from '../../features/common/headerSlice';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Edit Product' }));
  }, []);

  return <AddProductsSku />;
}

export default InternalPage;
