import TitleCard from "../../components/Cards/TitleCard";

import { Dna } from "react-loader-spinner";

import { useOrdersQuery } from "../../services/orderApi";
import OrdersTable from "./components/OrderTable";


function Orders() {
    const { data: orders, isLoading, isSuccess } = useOrdersQuery();

    return (
        <>
            <TitleCard
                title="Current Orders"
                topMargin="mt-2"
                name="order"
            >
                {isLoading && (
                    <div className="w-full flex pt-24 h-screen justify-center bg-slate-100 bg-opacity-30">
                        <Dna
                            visible={true}
                            height="200"
                            width="200"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                )}
                {isSuccess && (
                    <OrdersTable orders={orders?.results} />
                )}
            </TitleCard>
        </>
    );
}

export default Orders;
