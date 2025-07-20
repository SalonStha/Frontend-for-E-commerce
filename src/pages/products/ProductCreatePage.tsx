import React, { useState } from 'react';
import { Button, Divider, Steps, theme } from 'antd';
import './../../assets/css/style.css';
import { EmailTextInput } from '../../components/form/FormInput';
import { ProductValidatorDTO, type IProductForm } from './ProductValidator';
import { useForm } from 'react-hook-form';
import { BarsOutlined, FileTextFilled, GroupOutlined, ProductOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import productService from '../../services/product.service';

const steps = [
  {
    title: 'Basic Information',
    content: 'First-content',
  },
  {
    title: 'Pricing & Stock',
    content: 'Second-content',
  },
  {
    title: 'Miscellaneous',
    content: 'Last-content',
  },
];

const ProductCreatePage = () => {

  const { control, handleSubmit, setError } = useForm<IProductForm>({
    defaultValues: {
      name: '',
      description: '',
      category: [],
      brand: '',
      price: 0,
      stock: 0,
      images: null,
      tags: [],
      attributes: {},
      sku: '',
      status: '',
      homeFeatured: false,
    } as IProductForm,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(ProductValidatorDTO) as any
  });
  
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    marginTop: 20,
  };
  const submitForm = async (data: IProductForm) => {
    try{
      await productService.createProduct(data);
      toast.success('Product added successfully!', {
        description: 'Your product has been added to the inventory.',
      });
      //eslint-disable-next-line
    } catch (exception: any) {
      if (exception.error) {
        Object.keys(exception.error).map((field) => {
            setError(field as keyof IProductForm, {
                message: exception.error[field],
            });
        });
    }
    toast.warning('Failed to add product:', {
        description: exception.message || 'An error occurred while adding the product. Please try again.',
    });
    }

  }

  const handleStep0Next = (data1: IProductForm) => {
    next();
  };
  const handleStep1Next = (data2: IProductForm) => {
    next();
  };

  return (
    <>
      <div className='p-8' style={{ fontFamily: 'Poppins, sans-serif' }}>
        <h1 className='text-2xl font-semibold mb-4'>Add Product</h1>
        <Divider />
        <div className="steps-responsive">
          <Steps current={current} items={items} />
        </div>
        <div className='steps-responsive p-7' style={contentStyle}>
          <div className='text-center mb-4'>
          </div>
          {/* Here you can add the form content for each step */}
          {current === 0 &&
            <form className="space-y-10!" onSubmit={handleSubmit(handleStep0Next)} action="#" method="POST">
              <EmailTextInput
                name="name"
                control={control}
                label="Name"
                placeholder="Enter product name"
                startAdornmentIcon={<ProductOutlined />}
                type="text"
              />
              <EmailTextInput
                name="description"
                control={control}
                label="Desciription"
                placeholder="Give the product a description"
                startAdornmentIcon={<FileTextFilled />}
                type="text"
              />
              <EmailTextInput
                name="brand"
                control={control}
                label="Brand"
                placeholder="Enter brand name"
                startAdornmentIcon={<BarsOutlined/>}
                type="text"
              />
              <EmailTextInput
                name="category"
                control={control}
                label="Category"
                placeholder="Enter category name"
                startAdornmentIcon={<GroupOutlined />}
                type="text"
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                {current > 0 && (
                  <Button onClick={prev}>
                    Previous
                  </Button>
                )}
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </div>
            </form>
          }
          {current === 1 &&
            <form className="space-y-10!" onSubmit={handleSubmit(handleStep1Next)} action="#" method="POST">
              <EmailTextInput
                name="price"
                control={control}
                label="Price"
                placeholder="Enter product price"
                startAdornmentIcon={<ProductOutlined />}
              />
              <EmailTextInput
                name="stock"
                control={control}
                label="Stock"
                placeholder="Enter stock quantity"
                startAdornmentIcon={<ProductOutlined />}
              />
              {/* Add more fields as needed for this step */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                {current > 0 && (
                  <Button onClick={prev}>
                    Previous
                  </Button>
                )}
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </div>
            </form>
          }
          {current === 2 &&
            <form className="space-y-10!" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
              <EmailTextInput
                name="sku"
                control={control}
                label="SKU"
                placeholder="Enter SKU"
                startAdornmentIcon={<ProductOutlined />}
              />
              <EmailTextInput
                name="status"
                control={control}
                label="Status"
                placeholder="Enter status"
                startAdornmentIcon={<ProductOutlined />}
              />
              {/* Add more fields as needed for this step */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                {current > 0 && (
                  <Button onClick={prev}>
                    Previous
                  </Button>
                )}
                <Button type="primary" htmlType="submit">
                  Done
                </Button>
              </div>
            </form>
          }
        </div>

        {/* <div className='steps-responsive' style={{
          marginTop: 20,
          textAlign: 'end',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 12,
        }}>
          {current > 0 && (
            <Button onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType='submit' onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button htmlType='submit' type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
        </div> */}
      </div>
    </>
  );
};

export default ProductCreatePage;