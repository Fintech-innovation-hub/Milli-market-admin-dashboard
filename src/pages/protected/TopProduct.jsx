import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import TopProduct from '../../features/topProduct'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Top Product"}))
      }, [])


    return(
        <TopProduct />
    )
}

export default InternalPage