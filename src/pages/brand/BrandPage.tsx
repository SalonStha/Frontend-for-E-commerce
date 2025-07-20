import { EditFilled, FileAddFilled, DeleteFilled } from "@ant-design/icons";
import { Divider } from "@mui/material";
import { Button, Input, Table } from "antd";
import { NavLink } from "react-router";
import './../../assets/css/style.css';
import type { IBrandData } from "./Brandvalidator";
import { useEffect, useState } from "react";
import brandService from "../../services/brand.service";
import { toast } from "sonner";
import { PaginationDefault, Status, type IPagination, type IPaginationSearch } from "../../config/constant";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const BrandPage = () => {

    const [open, setOpen] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState<IBrandData | null>(null);

    const [loading, setLoading] = useState(false);

    const handleDelete = async (brandId: string) => {
        setLoading(true);
        try {
            await brandService.deleteRequest('brands/' + brandId);
            toast.success('Brand deleted successfully!', {
                description: 'The selected brand has been successfully deleted.',
            });
            await getBrands({ page: PaginationDefault.page, limit: PaginationDefault.limit })
        } catch {
            toast.error('Failed to delete brand:', {
                description: 'An error occurred while deleting the brand. Please try again.',
            });
        }
        setOpen(false);
        setSelectedBrand(null);
        setLoading(false);
    };
    const columns = [
        { title: 'Logo', dataIndex: 'logo', key: 'logo', render: (logo: string) => <img src={logo} alt="Brand" style={{ width: '50px', height: '50px' }} /> },
        { title: 'Name', dataIndex: 'name', key: 'name', },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => (status === Status.ACTIVE) ? <span className="bg-green-700 text-white rounded-md p-1.5 text-xs! font-light">Active</span> : <span className="bg-red-500 text-white rounded-md p-1.5">Inactive</span> },
        {
            title: 'Actions', dataIndex: '_id', key: 'actions', render: (id: string, data: IBrandData) => {
                return (
                    <>
                        <NavLink to={'/admin/brands/' + id}>
                            <Button type="primary" className="!bg-indigo-500 hover:!bg-indigo-600 items-center p-3! h-9! mr-2"><EditFilled/></Button>
                        </NavLink>
                        <Button type="primary" danger className="items-center p-3! h-9!" onClick={() => { setOpen(true); setSelectedBrand(data); }}><DeleteFilled /></Button>
                    </>
                )
            }
        }

    ];
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<IBrandData[]>([]);
    const [pagination, setPagination] = useState<IPagination>({
        current: PaginationDefault.page,
        pageSize: PaginationDefault.limit,
        total: PaginationDefault.total,
    });

    const getBrands = async (
        {
            page = PaginationDefault.page,
            limit = PaginationDefault.limit,
            search = null,
        }: IPaginationSearch) => {
        setLoading(true);
        try {
            const response = await brandService.getRequest('/brands', {
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
            console.error('Error fetching brands:', error);
            toast.error('Failed to fetch brands.', {
                description: 'An error occurred while fetching brands. Please try again.',
            });
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     getBrands({
    //         page: PaginationDefault.page,
    //         limit: PaginationDefault.limit,
    //         search: null,
    //     });
    // }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            getBrands({
                page: PaginationDefault.page,
                limit: PaginationDefault.limit,
                search: search,
            });
        }, 1000);
        return () => clearTimeout(timer);
    }, [search]); //Timeout search


    const onPaginationChange = async (page: number, pageSize: number) => {
        await getBrands({
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
                        <span style={{ fontSize: 20, color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>Loading brands...</span>
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
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-poppins! font-semibold mb-2">Brands</h2>
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
                        <NavLink to='/admin/brands/create'>
                            <Button icon={<FileAddFilled />} type="primary" className="!bg-indigo-500 hover:!bg-indigo-600 items-center p-3! h-9.5!">
                                Add brand
                            </Button>
                        </NavLink>
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
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px' }}
                        rowKey="_id"
                    />
                    <Dialog open={open} onClose={() => { setOpen(false); setSelectedBrand(null); }} className="relative z-10">
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
                                                    Delete Brand
                                                </DialogTitle>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to delete this brand? This action cannot be undone.
                                                    </p>
                                                    {selectedBrand && (
                                                        <div className="mt-2 text-sm text-gray-700">
                                                            <strong>Name:</strong> {selectedBrand.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            onClick={() => selectedBrand && handleDelete(selectedBrand._id)}
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
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default BrandPage;