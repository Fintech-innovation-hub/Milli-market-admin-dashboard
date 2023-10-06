import React from 'react'

function Titles({titleLn,setTitleLn,titleRu,setTitleRu}) {
 
  return (
   <div className='w-1/2'>
     <div className={`form-control w-full mt-2`}>
            <label className="label">
              <span className={'label-text text-base-content  '}>
                Title_uz  
              </span>
            </label>
            <input
              value={titleLn}
              required
              type="text"
              onChange={(e) => setTitleLn(e.target.value)}
              placeholder="title ln"
              name="titleUz"
              className=" rounded p-2 outline-none  product-input "
            />
          </div>
          <div className={`form-control w-full mt-2`}>
            <label className="label">
              <span className={'label-text text-base-content  '}>
                Title_ru  
              </span>
            </label>
            <input
              required
              type="text"
              value={titleRu}
              onChange={(e) => setTitleRu(e.target.value)}
              placeholder="title ru"
              name="titleRu"
              className=" product-input rounded p-2 outline-none  input-bordered w-full  "
            />
          </div>
   </div>
  )
}

export default Titles