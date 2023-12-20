import { RotatingLines } from "react-loader-spinner";


export default function LoadingModal() {
    return (
        <>

            <div>

                <div
                    className="justify-center  bg-black bg-opacity-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="100"
                        visible={true}
                    />
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    );
}

