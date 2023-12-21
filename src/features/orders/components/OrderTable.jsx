
import OrdersTableRaw from './OrdersTableRaw';

function OrdersTable({ orders }) {



    return (
        <table className="bg-blue-400 w-full product-table">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Created </th>
                    <th>Client </th>
                    <th>Phone number </th>
                    <th>Status</th>

                </tr>
            </thead>
            <tbody>
                {orders?.map((order, index) => (
                    <OrdersTableRaw key={order.id} index={index}  {...order} />
                ))}
            </tbody>
        </table>
    );
}

export default OrdersTable;
