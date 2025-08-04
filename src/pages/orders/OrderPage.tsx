/* eslint-disable @typescript-eslint/no-explicit-any */
import {  HomeFilled, OrderedListOutlined,ArrowRightOutlined } from "@ant-design/icons";
import { Divider } from "@mui/material";
import { Breadcrumb, Button, Input, Table, } from "antd";
import { NavLink } from "react-router";
import './../../assets/css/style.css';

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { OrderStatus, PaginationDefault, type IPagination, type IPaginationSearch , PaymentMethod } from "../../config/constant";

import orderService from "../../services/order.service";


const OrderPage = () => {

    const formatNpr = (value: string | number) => {
        const amount = Number(value) / 100;
        // Using en-IN locale for comma separation style (lakh, crore) common in Nepal.
        return `Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const [loading, setLoading] = useState(false);
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
    const renderPaymentMethodTag = (orderStatus: any) => {
        if (orderStatus === PaymentMethod.CASH_ON_DELIVERY) {
            return <span className="bg-green-600/10 text-green-600/90 rounded-md p-1.5 font-light">COD</span>;
        }
        if (orderStatus === PaymentMethod.KHALTI) {
            return <span className="bg-red-500/10 text-red-500/90 rounded-md p-1.5">Khalti</span>;
        }
        if (orderStatus === PaymentMethod.ESEWA) {
            return <span className="bg-indigo-600/10 text-white rounded-md p-1.5 font-light">Esewa</span>;
        }
        if (orderStatus === PaymentMethod.BANK) {
            return <span className="bg-indigo-600/35 text-white rounded-md p-1.5 font-light">Bank Transfer</span>;
        }
        if (orderStatus === PaymentMethod.FONEPAY) {
            return <span className="bg-yellow-600/10 text-yellow-600 rounded-md p-1.5 font-light">FonePay</span>;
        }
        return <span className="bg-gray-300 text-black rounded-md p-1.5 font-light">{orderStatus}</span>;
    };

    const columns = [
        {
            title: 'Order',
            dataIndex: 'code',
            key: 'code',
            render: (
                code: string,
                record: {
                    orderDetails?: { name?: string }[]
                }
            ) => {
                const productNames = record.orderDetails
                    ?.map((item) => item.name)
                    .filter(Boolean)
                    .join(', ');
                return (
                    <div className="flex flex-col">
                              {productNames && (
                            <span className="text-gray-900 text-l mb-1 font-semibold">
                                {productNames}
                            </span>
                        )}
                        <span className="text-slate-950/60 text-sm">
                            #{code}
                        </span>
                  
                    </div>
                )
            }
        },
        {
            title: 'Customer Name',
            dataIndex: 'buyer',
            key: 'buyer',
            render: (buyer: { firstName?: string, lastName?: string }) => (
                <span>
                    {(buyer?.firstName || '') + ' ' + (buyer?.lastName || '')}
                </span>
            ),
        },
        // {
        //     title: 'Gross Total', dataIndex: 'grossTotal', key: 'grossTotal', render: (grossTotal: string) => {
        //         return (
        //             <span className="text-amber-600 font-semibold">
        //                 {formatNpr(grossTotal)}
        //             </span>
        //         )
        //     }
        // },
        // {
        //     title: 'Sub Total', dataIndex: 'subTotal', key: 'subTotal', render: (subTotal: string) => {
        //         return (
        //             <span className="text-fuchsia-600 font-semibold">
        //                 {formatNpr(subTotal)}
        //             </span>
        //         )
        //     }
        // },
        // {
        //     title: 'Tax (13%)', dataIndex: 'tax', key: 'tax', render: (tax: string) => {
        //         return (
        //             <span className="text-slate-950 font-medium">
        //                 {formatNpr(tax)}
        //             </span>
        //         )
        //     }
        // },
        {
            title: 'Total', dataIndex: 'total', key: 'total', render: (total: string) => {
                return (
                    <span className="text-pink-600/80 font-semibold">
                        {formatNpr(total)}
                    </span>
                )
            }
        },
        {
            title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: (createdAt: string) => {
                return new Date(createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        },
        { title: 'Order Status', dataIndex: 'status', key: 'status', render: renderOrderStatusTag },
        { title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod', render: renderPaymentMethodTag },
        { title: 'Transaction Status', dataIndex: 'isPaid', key: 'isPaid', render: (isPaid: boolean) => isPaid ? <span className="bg-green-700/10 text-green-700/90 rounded-md p-1.5">Paid</span> : <span className="bg-red-500/10 text-red-500/90 rounded-md p-1.5">Not Paid</span> },
        {
            title: 'Order Details', dataIndex: 'code', key: 'actions', render: (code: string) => {
                return (
                    <>
                        <NavLink to={'/admin/orders/' + code}>
                            <Button type="primary" className="!bg-indigo-500 hover:!bg-indigo-600 items-center p-2 h-9! mr-2"><ArrowRightOutlined/></Button>
                        </NavLink>
                    </>
                )
            }
        }
    ];
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState();
    const [pagination, setPagination] = useState<IPagination>({
        current: PaginationDefault.page,
        pageSize: PaginationDefault.limit,
        total: PaginationDefault.total,
    });

    const getOrders = async (
        {
            page = PaginationDefault.page,
            limit = PaginationDefault.limit,
            search = null,
        }: IPaginationSearch) => {
        setLoading(true);
        try {
            const response = await orderService.getRequest('order', {
                params: {
                    page: page,
                    limit: limit,
                    search: search,
                }
            });
            setData(response.data);
            console.log(response);
            setPagination({
                current: response.options.page,
                pageSize: response.options.limit,
                total: response.options.total,
            })
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories.', {
                description: 'An error occurred while fetching categories. Please try again.',
            });
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     getOrders({
    //         page: PaginationDefault.page,
    //         limit: PaginationDefault.limit,
    //         search: null,
    //     });
    // }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            getOrders({
                page: PaginationDefault.page,
                limit: PaginationDefault.limit,
                search: search,
            });
        }, 1000);
        return () => clearTimeout(timer);
    }, [search]); //Timeout search


    const onPaginationChange = async (page: number, pageSize: number) => {
        await getOrders({
            page: page,
            limit: pageSize,
        });
    };
    return (
        <>
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(30, 41, 59, 0.75)',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}>
                        <div className="dual-ring-spinner" style={{ width: 64, height: 64 }} />
                        <span style={{ fontSize: 20, color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>Loading orders...</span>
                    </div>
                    <style>{`
                        .dual-ring-spinner {
                            display: inline-block;
                            width: 64px;
                            height: 64px;
                        }
                        .dual-ring-spinner:after {
                            content: " ";
                            display: block;
                            width: 48px;
                            height: 48px;
                            margin: 8px;
                            border-radius: 50%;
                            border: 6px solid #6366f1;
                            border-color: #6366f1 transparent #22d3ee transparent;
                            animation: dual-ring-spin 1.2s linear infinite;
                        }
                        @keyframes dual-ring-spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}
            <div className="p-7 flex flex-col" style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#333',
            }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-poppins! font-semibold mb-2">Orders</h2>
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                                fontFamily: 'Poppins, sans-serif',
                                color: '#fffff',
                                fontSize: '15px',
                                fontWeight: '500',
                            }}
                            items={[
                                {
                                    href: '/admin',
                                    title: (
                                        <>
                                            <HomeFilled />
                                            <span>Dashboard</span>
                                        </>
                                    ),
                                },
                                {
                                    title: (
                                        <>
                                            <OrderedListOutlined />
                                            <span>Orders</span>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <div className="flex justify-center! items-center! gap-5">
                        <Input.Search
                            placeholder="Type to search..."
                            className="ant-search"
                            size="large"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            allowClear
                            style={{
                                fontFamily: 'Poppins!, sans-serif',
                                fontSize: '15px',
                                margin: '10px',
                                width: '300px'
                            }}
                            enterButton
                        />
                        {/* <NavLink to='/admin/category/create'>
                            <Button icon={<FileAddFilled />} type="primary" className="!bg-indigo-500 hover:!bg-indigo-600 items-center p-3! h-9.5!">
                                Add category
                            </Button>
                        </NavLink> */}
                    </div>

                </div>
                <Divider className="mb-4" />
                <div className="mt-7">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            ...pagination,
                            onChange: onPaginationChange,
                        }}
                        scroll={{ x: 1200, y: 600 }}
                        className="poppins-table border-1! border-gray-300! rounded-lg! shadow-lg!"
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: '30px' }}
                        rowKey="_id"
                    />
                    {/* <Dialog open={open} onClose={() => { setOpen(false); setselectedCategory(null); }} className="relative z-10">
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                        />
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <DialogPanel
                                    transition
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                                >
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                                <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                    Delete Category
                                                </DialogTitle>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to delete this category? This action cannot be undone.
                                                    </p>
                                                    {selectedCategory && (
                                                        <div className="mt-2 text-sm text-gray-700">
                                                            <strong>Name:</strong> {selectedCategory.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            onClick={() => selectedCategory && handleDelete(selectedCategory._id)}
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            data-autofocus
                                            onClick={() => { setOpen(false) }}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog> */}
                </div>
            </div>
        </>
    )
}

export default OrderPage;