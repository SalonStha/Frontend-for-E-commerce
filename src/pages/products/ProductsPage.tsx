import { EditFilled, FileAddFilled, DeleteFilled } from "@ant-design/icons";
import { Divider } from "@mui/material";
import { Button, Table } from "antd";
import { NavLink } from "react-router";
import './../../assets/css/style.css';
import type { IProductForm } from "./ProductValidator";

const ProductsPage = () => {
    const handleDelete = (record: IProductForm) => {
        // Implement your delete logic here
        console.log('Delete product:', record);
    };
    const columns = [
        { title: 'Product Image', dataIndex: 'image', key: 'image', render: (image: string) => <img src={image} alt="Product" style={{ width: 100, height: 100, objectFit: 'cover' }} /> },
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Brand', dataIndex: 'brand', key: 'brand' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
        { title: 'Actions', key: 'actions', render: (_: unknown, record: IProductForm) => (
            <>
                <Button type="primary" className="!bg-indigo-500 hover:!bg-indigo-600 items-center p-3! h-9! mr-2"><EditFilled/></Button>
                <Button type="primary" danger className="items-center p-3! h-9!" onClick={() => handleDelete(record)}><DeleteFilled /></Button>
            </>
        )}
        
    ];

    const data: IProductForm[] = [
        {
        images: 'https://res.cloudinary.com/dqau0tlvo/image/upload/q_auto/f_auto/c_fill,h_500,w_500/v1/api-42/product_images/fgb4plklgbyqajvmizjy?_a=BAMAJaP/0',
        name: 'Sample Product',
        description: 'This is a sample product description.',
        category: 'Sample Category',
        brand: 'Sample Brand',
        price: '$101',
        stock: 50,
        actions: <Button type="link">Edit</Button>
    },
    {
        image: 'https://res.cloudinary.com/dqau0tlvo/image/upload/q_auto/f_auto/c_fill,h_500,w_500/v1/api-42/product_images/fgb4plklgbyqajvmizjy?_a=BAMAJaP/0',
        name: 'Sample Product',
        description: 'This is a sample product description.',
        category: 'Sample Category',
        brand: 'Sample Brand',
        price: '$520',
        stock: 50,
        actions: <Button type="link">Edit</Button>
    },
    {
        image: 'https://res.cloudinary.com/dqau0tlvo/image/upload/q_auto/f_auto/c_fill,h_500,w_500/v1/api-42/product_images/fgb4plklgbyqajvmizjy?_a=BAMAJaP/0',
        name: 'Sample Product',
        description: 'This is a sample product description.',
        category: 'Sample Category',
        brand: 'Sample Brand',
        price: '$2045',
        stock: 50,
        actions: <Button type="link">Edit</Button>
    },
    {
        image: 'https://res.cloudinary.com/dqau0tlvo/image/upload/q_auto/f_auto/c_fill,h_500,w_500/v1/api-42/product_images/fgb4plklgbyqajvmizjy?_a=BAMAJaP/0',
        name: 'Sample Product',
        description: 'This is a sample product description.',
        category: 'Sample Category',
        brand: 'Sample Brand',
        price: '$4757',
        stock: 50,
        actions: <Button type="link">Edit</Button>
    },
    {
        image: 'https://res.cloudinary.com/dqau0tlvo/image/upload/q_auto/f_auto/c_fill,h_500,w_500/v1/api-42/product_images/fgb4plklgbyqajvmizjy?_a=BAMAJaP/0',
        name: 'Sample Product',
        description: 'This is a sample product description.',
        category: 'Sample Category',
        brand: 'Sample Brand',
        price: '$578',
        stock: 50,
        actions: <Button type="link">Edit</Button>
    },
    {
        image: 'https://res.cloudinary.com/dqau0tlvo/image/upload/q_auto/f_auto/c_fill,h_500,w_500/v1/api-42/product_images/fgb4plklgbyqajvmizjy?_a=BAMAJaP/0',
        name: 'Sample Product',
        description: 'This is a sample product description.',
        category: 'Sample Category',
        brand: 'Sample Brand',
        price: '$1078570',
        stock: 50,
        actions: <Button type="link">Edit</Button>
    },
    {
        image: 'https://res.cloudinary.com/dqau0tlvo/image/upload/q_auto/f_auto/c_fill,h_500,w_500/v1/api-42/product_images/fgb4plklgbyqajvmizjy?_a=BAMAJaP/0',
        name: 'Sample Product',
        description: 'This is a sample product description.',
        category: 'Sample Category',
        brand: 'Sample Brand',
        price: '$10',
        stock: 50,
        actions: <Button type="link">Edit</Button>
    }
]
    return ( 
        <> 
            <div className="p-7 flex flex-col" style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#333',
            }}>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-poppins! font-semibold mb-2">Products</h2>
                    <NavLink to='/admin/products/create' className="text-blue-500 hover:underline mb-4 inline-block">
                        <Button icon={<FileAddFilled/>} type="primary" className="!bg-indigo-500 hover:!bg-indigo-600 items-center p-3! h-9!" 
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                        }}>
                            Create Product
                        </Button>
                    </NavLink>
                </div>
                <Divider className="mb-4" />
                <div className="mt-7">
                    <Table 
                        columns={columns}
                        dataSource={data} // Replace with your actual data source
                        pagination={{ pageSize: 2}}
                        scroll={{ x: 1200, y: 600}}
                        className="poppins-table border-1! border-gray-300! rounded-lg! shadow-lg!"
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px' }}
                    />
                </div>
            </div>
        </>
    )
}

export default ProductsPage;