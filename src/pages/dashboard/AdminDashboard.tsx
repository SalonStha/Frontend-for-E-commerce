/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import userService from "../../services/user.service";
import '../../assets/css/style.css';
import productService from "../../services/product.service";
import brandService from "../../services/brand.service";
import categoryService from "../../services/category.service";
import orderService from "../../services/order.service";
import { OrderStatus, Status } from "../../config/constant";

import { BarChart } from '@mui/x-charts/BarChart';
import { NavLink } from "react-router";
import { Spinner } from "../../components/loading/Spinnner";
import { Table } from "antd";
import { PieChart } from '@mui/x-charts/PieChart';



const AdminDashboard = () => {
    const size = {
        width: 200,
        height: 200,
    };
    

    const [userCount, setUserCount] = useState<number>(0);
    const [activeUserCount, setActiveUserCount] = useState<number>(0);
    const [inactiveUserCount, setInactiveUserCount] = useState<number>(0);
    const [previousUserCount, setPreviousUserCount] = useState<number>(0);
    const [productCount, setProductCount] = useState<number>(0);

    const [brandCount, setBrandCount] = useState<number>(0);
    const [brands, setBrands] = useState<any[]>([]); // Assuming brands is an array of objects
    const [activeBrandCount, setActiveBrandCount] = useState<number>(0);
    const [inactiveBrandCount, setInactiveBrandCount] = useState<number>(0);

    const [categoryCount, setCategoryCount] = useState<number>(0);
    const [activeCategoryCount, setActiveCategoryCount] = useState<number>(0);
    const [inactiveCategoryCount, setInactiveCategoryCount] = useState<number>(0);

    const [orderCount, setOrderCount] = useState<number>(0);
    const [pendingOrderCount, setPendingOrderCount] = useState<number>(0);
    const [completedOrderCount, setCompletedOrderCount] = useState<number>(0);
    const [orders, setOrders] = useState<any[]>([]); // Assuming orders is an array of objects
    const [loading, setLoading] = useState<boolean>(true);

    const renderCount = useRef(0); // Track renders for debugging

    const [userLoading, setUserLoading] = useState<boolean>(false);

    const [percentage, setPercentage] = useState<number>(0);
    const [isIncrease, setIsIncrease] = useState<boolean>(false);

    const columns = [
        { title: 'Logo', dataIndex: 'logo', key: 'logo', render: (logo: string) => <img src={logo} alt="Brand" style={{ width: '50px', height: '50px' }} /> },
        { title: 'Name', dataIndex: 'name', key: 'name', },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => (status === Status.ACTIVE) ? <span className="bg-green-500/10 text-green-500/90 rounded-md p-1.5">Active</span> : <span className="bg-red-500/10 text-red-500/90 rounded-md p-1.5">Inactive</span> },

    ];

    const formatNpr = (value: string | number) => {
        const amount = Number(value) / 100;
        // Using en-IN locale for comma separation style (lakh, crore) common in Nepal.
        return `Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

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
            return <span className="bg-yellow-600/10 text-yellow-600 rounded-md p-1.5 font-light">Pending</span>;
        }
        return <span className="bg-gray-300 text-black rounded-md p-1.5 font-light">{orderStatus}</span>;
    };

    const calculatePercentageIncrease = (
        current: number,
        previous: number
    ): { percentage: number; isIncrease: boolean } => {
        if (previous === 0) {
            return { percentage: 0, isIncrease: current > 0 }; // Handle zero previous count
        }
        const percentage = ((current - previous) / previous) * 100;
        return { percentage: Number(percentage.toFixed(2)), isIncrease: percentage >= 0 };
    };

    useEffect(() => {
        const fetchUserCount = async () => {
            setUserLoading(true);
            try {
                // Current total users
                const currentResponse = await userService.getRequest("user");
                const totalUsers = currentResponse.options?.pagination?.total || 0;
                setUserCount(totalUsers);

                // Active users (assuming active status is available)
                const activeResponse = await userService.getRequest("user", {
                    params: { status: "Active" },
                });
                setActiveUserCount(activeResponse.options?.pagination?.total || 0);

                // Inactive users
                const inactiveResponse = await userService.getRequest("user", {
                    params: { status: "Inactive" },
                });
                setInactiveUserCount(inactiveResponse.options?.pagination?.total || 0);

                // Users from last 7 days
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Get the date 7 days ago
                const previousSevenDaysAgo = new Date();
                previousSevenDaysAgo.setDate(previousSevenDaysAgo.getDate() - 14);

                const recentResponse = await userService.getRequest("user", {
                    params: {
                        createdAt_gte: sevenDaysAgo.toISOString(),
                        createdAt_lt: new Date().toISOString(),
                    },
                });
                const recentCount = recentResponse.options?.pagination?.total || 0;

                const previousResponse = await userService.getRequest("user", {
                    params: {
                        createdAt_gte: previousSevenDaysAgo.toISOString(),
                        createdAt_lt: sevenDaysAgo.toISOString(),
                    },
                });
                const previousCount = previousResponse.options?.pagination?.total || 0;

                setPreviousUserCount(previousCount);

                // Calculate and set percentage
                const { percentage, isIncrease } = calculatePercentageIncrease(
                    recentCount,
                    previousCount
                );
                setPercentage(percentage);
                setIsIncrease(isIncrease);
                console.log("User Stats:", {
                    totalUsers,
                    recentCount,
                    previousCount,
                    percentage,
                    isIncrease,
                });
            } catch (error) {
                console.error("Error fetching user stats:", error);
            } finally {
                setUserLoading(false);
            }
        };
        fetchUserCount();
    }, []);

    useEffect(() => {
        const { percentage, isIncrease } = calculatePercentageIncrease(userCount, previousUserCount);
        setPercentage(percentage);
        setIsIncrease(isIncrease);
        console.log("Percentage Update:", { userCount, previousUserCount, percentage, isIncrease });
    }, [userCount, previousUserCount]);

    useEffect(() => {
        renderCount.current += 1;
        console.log(`Render #${renderCount.current}:`, {
            userCount,
            previousUserCount,
            percentage,
            isIncrease,
            userLoading,
        });
    });

    useEffect(() => {
        const fetchProductCount = async () => {
            setLoading(true);
            try {
                const response = await productService.getRequest('product');
                setProductCount(response.options.total || 0); // Use total from pagination
            } catch (error) {
                console.error('Error fetching product count:', error);
                setProductCount(0); // Default to 0 on error
            } finally {
                setLoading(false);
            }
        };
        fetchProductCount();
    }, []);

    useEffect(() => {
        const fetchBrandCount = async () => {
            setLoading(true);
            try {
                const response = await brandService.getRequest('brands');
                setBrandCount(response.options.total || 0); // Use total from pagination
                setBrands(response.data); // Assuming response.data is an array of brands
                // Active brands
                const activeBrandResponse = await brandService.getRequest('brands', {
                    params: { status: "Active" },
                });
                setActiveBrandCount(activeBrandResponse.options.total || 0);
                // Inactive brands
                const inactiveBrandResponse = await brandService.getRequest('brands', {
                    params: { status: "Inactive" },
                });
                setInactiveBrandCount(inactiveBrandResponse.options.total || 0);
            } catch (error) {
                console.error('Error fetching brand count:', error);
                setBrandCount(0); // Default to 0 on error
            } finally {
                setLoading(false);
            }
        };
        fetchBrandCount();
    }, []);

    useEffect(() => {
        const fetchCategoryCount = async () => {
            setLoading(true);
            try {
                const response = await categoryService.getRequest('category');
                setCategoryCount(response.options.total || 0); // Use total from pagination

                // Active categories
                const activeCategoryResponse = await categoryService.getRequest('category', {
                    params: { status: "Active" },
                });
                setActiveCategoryCount(activeCategoryResponse.options.total || 0);
                // Inactive categories
                const inactiveCategoryResponse = await categoryService.getRequest('category', {
                    params: { status: "Inactive" },
                });
                setInactiveCategoryCount(inactiveCategoryResponse.options.total || 0);
            } catch (error) {
                console.error('Error fetching category count:', error);
                setCategoryCount(0); // Default to 0 on error
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryCount();
    }, []);

    useEffect(() => {
        const fetchOrderCount = async () => {
            setLoading(true);
            try {
                const response = await orderService.getRequest('order');
                setOrderCount(response.options.totalRevenue || 0); // Use total from pagination
                setOrders(response.data);
                // Pending orders
                const pendingResponse = await orderService.getRequest('order', {
                    params: { status: OrderStatus.PENDING },
                });
                setPendingOrderCount(pendingResponse.options.total || 0);
                // Completed orders
                const completedResponse = await orderService.getRequest('order', {
                    params: { status: OrderStatus.COMPLETED },
                });
                setCompletedOrderCount(completedResponse.options.total || 0);
            } catch (error) {
                console.error('Error fetching order count:', error);
                setOrderCount(0); // Default to 0 on error
            } finally {
                setLoading(false);
            }
        };
        fetchOrderCount();
    }, []);

    return (
        <>
            <div className="p-7 flex flex-col" style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#333',
            }}>
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
                    <p className="mb-2" style={{
                        fontSize: '16px',
                    }}>Review your overall statistics of you business</p>
                </div>
                <Divider />
                <div className="mt-5 lg:grid lg:grid-cols-5 lg:gap-x-5">
                    <NavLink to="/admin/users" className="bg-white! text-gray-600! p-8 rounded-lg shadow-md flex justify-between">
                        <div className="flex flex-col">
                            <h3 className="mb-4">Total Users</h3>
                            <p className="text-3xl font-medium">{loading ? <Spinner /> : userCount}</p>
                            {!userLoading && (
                                <p className="mt-2 text-sm font-extralight text-gray-600!">
                                    <span
                                        className={`${isIncrease ? "text-green-600" : "text-red-600"} font-medium`}
                                    >
                                        {isIncrease ? "+" : ""}
                                        {percentage}% (Last 7 days)
                                    </span>
                                </p>
                            )}
                        </div>
                        <img src="https://cdn-icons-png.flaticon.com/128/476/476761.png" alt="User Icon" className="w-8 h-8" />
                    </NavLink>
                    <div className="bg-white p-8 rounded-lg shadow-md flex justify-between">
                        <div className="flex flex-col">
                            <h3 className="mb-4">Total Products</h3>
                            <p className="text-3xl font-medium">{productCount}</p>
                        </div>
                        <img src="https://cdn-icons-png.flaticon.com/128/8787/8787090.png" alt="Product Icon" className="w-8 h-8" />
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md flex justify-between">
                        <div className="flex flex-col">
                            <h3 className="mb-4">Total Brands</h3>
                            <p className="text-3xl font-medium">{brandCount}</p>
                        </div>
                        <img src="https://cdn-icons-png.flaticon.com/128/5486/5486254.png" alt="Brand Icon" className="w-8 h-8" />
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md flex justify-between">
                        <div className="flex flex-col">
                            <h3 className="mb-4">Total Categories</h3>
                            <p className="text-3xl font-medium">{categoryCount}</p>
                        </div>
                        <img src="https://cdn-icons-png.flaticon.com/128/9304/9304546.png" alt="Category Icon" className="w-8 h-8" />
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md flex justify-between">
                        <div className="flex flex-col">
                            <h3 className="mb-4">Total Revenue</h3>
                            <p className="text-3xl font-medium">{formatNpr(orderCount)}</p>
                        </div>
                        <img src="https://cdn-icons-png.flaticon.com/128/16901/16901349.png" alt="Revenue Icon" className="w-8 h-8" />
                    </div>
                </div>
                <div className="mt-5 flex flex-col items-start justify-between lg:flex-row lg:gap-x-5">
                    <div className="bg-white p-8 rounded-lg shadow-md sm:w-[80%] lg:w-[70%] h-[50vh]">
                        <BarChart
                            xAxis={[{
                                data: ['Users', 'Brands', 'Categories'],
                            }]}
                            yAxis={[{ label: 'Count' }]}
                            series={[
                                { data: [activeUserCount, activeBrandCount, activeCategoryCount], label: 'Active' },
                                { data: [inactiveUserCount, inactiveBrandCount, inactiveCategoryCount], label: 'Inactive' }
                            ]}
                            height={400}
                            sx={{
                                '& .MuiChartsAxis-label': { fontFamily: 'Poppins, sans-serif' },
                                '& .MuiChartsLegend-series text': { fontFamily: 'Poppins, sans-serif' },
                            }}
                        />
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md sm:w-[80%] lg:w-[30%] overflow-y-scroll h-[50vh]">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col justify-between mb-4">
                                <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
                                <p className="text-sm text-gray-600">View your recent orders here</p>
                            </div>
                            <NavLink to="/admin/orders" className="text-indigo-900 hover:underline">View All</NavLink>
                        </div>
                        <ul role="list" className="divide-y divide-gray-100">
                            {orders.slice(0, 3).map((order) => (
                                <li key={order.buyer.email} className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm/6 font-semibold text-gray-900">{order.buyer.firstName} {order.buyer.lastName}</p>
                                            <p className="mt-1 truncate text-md text-gray-700">{order.buyer.phoneNumber}</p>
                                            <p className="mt-1 truncate text-xs/5 text-gray-500">Shipping Address: {order.buyer.address.shippingAddress}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <div className="text-sm/6 font-medium text-gray-900">
                                            {order.orderDetails[0].name || 'Unknown Product'}
                                        </div>
                                        <div className="mt-1 text-md text-gray-500">
                                            {formatNpr(order.total)}
                                        </div>
                                        <p className="mt-3 text-xs/4 text-gray-500 rounded-md">Status:  {renderOrderStatusTag(order.status)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-5 flex flex-col items-start justify-between lg:flex-row lg:gap-x-5">
                    <div className="bg-white p-8 rounded-lg shadow-md sm:w-[80%] lg:w-[70%] overflow-y-scroll h-[50vh]">
                        <div className="flex justify-between items-center"  style={{position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 20}}>
                            <div className="flex flex-col justify-between mb-4">
                                <h3 className="text-lg font-semibold mb-2">Brands</h3>
                                <p className="text-sm text-gray-600">View your recent added brands </p>
                            </div>
                            <NavLink to="/admin/brands" className="text-indigo-900 hover:underline">View All</NavLink>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={brands.slice(0, 4)} // Display only the first 5 brands
                            loading={loading}
                            pagination={false}
                            className="poppins-table border-gray-300! rounded-lg! shadow-lg!"
                            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px' }}
                            rowKey="_id"
                        />
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md sm:w-[80%] lg:w-[30%] overflow-y-scroll h-[50vh]">
                        <div className="flex justify-between items-center mb-15">
                            <div className="flex flex-col justify-between mb-4">
                                <h3 className="text-lg font-semibold mb-2">Transaction Status</h3>
                                <p className="text-sm text-gray-600">View your transaction status</p>
                            </div>
                            <NavLink to="/admin/orders" className="text-indigo-900 hover:underline">View All</NavLink>
                        </div>
                        <PieChart
                            series={[{
                                data: [
                                    { value: pendingOrderCount, label: 'Pending' },
                                    { value: completedOrderCount, label: 'Completed' },
                                ],
                                innerRadius: 50,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                            }]}
                            sx={{
                                '& .MuiChartsArc-label': { fontFamily: 'Poppins, sans-serif' },
                                '& .MuiChartsLegend-series text': { fontFamily: 'Poppins, sans-serif' },
                            }}
                            {...size}
                        >
                        </PieChart>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;