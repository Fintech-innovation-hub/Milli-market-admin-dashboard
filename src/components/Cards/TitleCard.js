import Subtitle from "../Typography/Subtitle"
import SearchInput from "../Input/SearchInput"
import FilterSelect from "../Selects/FilterSelect"



function TitleCard({ title, children, topMargin, TopSideButtons, name }) {


  return (
    <div className={"card w-full p-4 bg-base-100 shadow-xl " + (topMargin || "mt-6")}>
      <div className="w-full flex justify-between  items-center">

        <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
          {title}

          {/* Top side button, show only if present */}
        </Subtitle>
        {
          TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
        }
        {name === "proposal" && <SearchInput />
        }
        {name === "proposal" && <FilterSelect />}
      </div>

      <div className="divider mt-2"></div>

      <div className='h-full w-full pb-6 bg-base-100'>
        {children}
      </div>
    </div >

  )
}


export default TitleCard