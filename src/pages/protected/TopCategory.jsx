import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import TopCategory from '../../features/topCategory'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Top Categories"}))
      }, [])


    return(
        <TopCategory />
    )
}

export default InternalPage