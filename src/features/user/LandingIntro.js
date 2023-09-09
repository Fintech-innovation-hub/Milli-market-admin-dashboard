import Logo from "../../assets/images/logomarket.jpg"


function LandingIntro() {

  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">

          <div className='text-3xl text-center font-bold '>
            <img src={Logo} className="w-24  inline-block mr-2 mask mask-circle" alt="dashwind-logo" />
            Milliy market
          </div>

          <div className="text-center mt-12"><img src="./intro.png" alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>

        </div>

      </div>
    </div>
  )

}

export default LandingIntro