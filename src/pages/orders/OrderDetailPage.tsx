import orderService from '../../services/order.service';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { OrderStatus } from '../../config/constant';

export default function OrderDetailPage() {

    const formatNpr = (value: string | number) => {
        const amount = Number(value) / 100;
        // Using en-IN locale for comma separation style (lakh, crore) common in Nepal.
        return `Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };
    const params = useParams();

    const [data, setData] = useState();

    const getOrdersDetails = async () => {
        try {
            const response = await orderService.getRequest('order/' + params.id);
            setData(response.data);
            console.log(response);
        } catch {
            toast.error('Failed to fetch order details');
        }
    }

    useEffect(() => {
        getOrdersDetails();
    }, []);

    //eslint-disable-next-line
    const renderOrderStatusTag = (orderStatus: any) => {
        if (orderStatus === OrderStatus.PROCESSING) {
            return <span className="bg-green-600/10 text-green-600/90 rounded-md p-1.5 font-light">Processing</span>;
        }
        if (orderStatus === OrderStatus.COMPLETED) {
            return <span className="bg-indigo-600/15 text-indigo-600/90 rounded-md p-1.5">Completed</span>;
        }
        if (orderStatus === OrderStatus.CANCELLED) {
            return <span className="bg-indigo-600/10 text-white rounded-md p-1.5 font-light">Cancelled</span>;
        }
        if (orderStatus === OrderStatus.DELIVERED) {
            return <span className="bg-indigo-600/35 text-white rounded-md p-1.5 font-light">Delivered</span>;
        }
        if (orderStatus === OrderStatus.PENDING) {
            return <span className="bg-yellow-600/10 text-yellow-600/90 rounded-md p-1.5 font-light">Pending</span>;
        }
        return <span className="bg-gray-300 text-black rounded-md p-1.5 font-light">{orderStatus}</span>;
    };
    return (
        <div className="sm:mx-auto w-full rounded-md sm:max-w-[150vh] bg-white p-8 shadfont-mediumded-lg mt-10" style={{
            fontFamily: 'Poppins, sans-serif',
            color: '#333'
        }}>
            <div className="sm:max-auto">
                <h2 className="text-2xl mb-3 font-semibold text-gray-900">Order Details</h2>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Summary of the order details</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Product Name</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            { /* eslint-disable @typescript-eslint/no-explicit-any */}
                            {data && Array.isArray((data as any)?.cart) && (data as any).cart.length > 0 && (data as any).cart[0]?.product?.name
                                ? (data as any).cart[0].product.name
                                : '-'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Customer Name</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            { /* eslint-disable @typescript-eslint/no-explicit-any */}
                            {data && (data as any).buyer.firstName && (data as any).buyer.lastName
                                ? `${(data as any).buyer.firstName} ${(data as any).buyer.lastName}`
                                : '-'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Customer Number</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            { /* eslint-disable @typescript-eslint/no-explicit-any */}
                            {data && (data as any).buyer.phoneNumber
                                ? `${(data as any).buyer.phoneNumber} `
                                : '-'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Ordered quantity</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            { /* eslint-disable @typescript-eslint/no-explicit-any */}
                            {data && Array.isArray((data as any)?.cart) && (data as any).cart.length > 0 && (data as any).cart[0]?.quantity
                                ? (data as any).cart[0].quantity
                                : '-'}

                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Total Price</dt>
                        <dd className="mt-1 text-gray-700 sm:col-span-2 sm:mt-0" style={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#333',
                            fontWeight: '700',
                        }}>
                            { /* eslint-disable @typescript-eslint/no-explicit-any */}
                            {data && Array.isArray((data as any)?.cart) && (data as any).cart.length > 0 && (data as any).cart[0]?.order?.total
                                ? formatNpr((data as any).cart[0].order.total)
                                : '-'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Order Status</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            { /* eslint-disable @typescript-eslint/no-explicit-any */}
                            {data && Array.isArray((data as any)?.cart) && (data as any).cart.length > 0 && (data as any).cart[0]?.order?.status
                                ? renderOrderStatusTag((data as any).cart[0].order.status)
                                : '-'}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
