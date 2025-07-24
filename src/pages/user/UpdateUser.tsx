import { Button, Divider } from "antd";
import './../../assets/css/style.css';
import { DropDownInput, EmailTextInput} from "../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BarsOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { type IRegisterForm, UpdateRegisterFormDTO } from "../authentication/validator";


const UpdateUser = () => {
    const navigate = useNavigate();

    const params = useParams();
    console.log(params);

    const [loading, setLoading] = useState(false);


    const { control, setValue, handleSubmit, setError, formState: { isLoading, isSubmitting } } = useForm<IRegisterForm>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            address: {
                billingAddress: '',
                shippingAddress: '',
            },
            gender: '',
            dob: null,
            phoneNumber: '',
            image: '',
        } as unknown as IRegisterForm,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(UpdateRegisterFormDTO) as any // Using yup for validation schema
    });


    const role = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Seller', label: 'Seller' },
        { value: 'Customer', label: 'Customer' },
    ];


    const submitForm = async (data: IRegisterForm) => {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
        };
        try {
            await userService.patchRequest('auth/update/' + params.id, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success(`${data.firstName} ${data.lastName} updated successfully!`, {
                description: 'Your user has been successfully updated.',
            });
            navigate('/admin/users');
            //eslint-disable-next-line
        } catch (exception: any) {
            console.error('Update error:', exception);
            const err = exception as { error?: Record<string, string> };
            if (err.error) {
                Object.keys(err.error).map((field) => {
                    setError(field as keyof IRegisterForm, {
                        message: err.error![field],
                    });
                });
            }
            toast.warning("Failed to update user", {
                description: "An error occurred while updating the user. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    const getUser = async () => {
        try {
            const response = await userService.getRequest('user/' + params.id);
            console.log(response);
            setValue('firstName', response.data.firstName);
            setValue('lastName', response.data.lastName);
            setValue('role', response.data.role);
        } catch {
            toast.error('Failed to fetch user details');
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(30, 41, 59, 0.75)', // much darker
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
                        <span style={{ fontSize: 20, color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>Updating user...</span>
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
                <div className="flex flex-col">
                    <h2 className="text-2xl font-poppins! font-semibold">Update User</h2>
                    <Divider />
                </div>
                <div className="sm:mx-auto w-full rounded-md sm:max-w-lg bg-white p-8 shadfont-mediumded-lg mt-10">
                    <h2 className="mb-7 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Update user details</h2>
                    <form className="space-y-7!" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                        <EmailTextInput
                            name="firstName"
                            control={control}
                            label="First Name"
                            placeholder="Enter first name"
                            startAdornmentIcon={<BarsOutlined />}
                        />
                        <EmailTextInput
                            name="lastName"
                            control={control}
                            label="Last Name"
                            placeholder="Enter last name"
                            startAdornmentIcon={<BarsOutlined />}
                        />
                        <div>
                            <DropDownInput
                                name="role"
                                label="Role"
                                control={control}
                                options={role}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(event: any, field: any) => {
                                    event.preventDefault();
                                    event.nativeEvent?.stopImmediatePropagation();
                                    field.onChange(event);
                                }}
                            />
                        </div>
                        <div>
                            <Button type="primary"
                                icon={<CloudUploadOutlined />}
                                htmlType="submit"
                                disabled={isSubmitting}
                                loading={isLoading}
                                className="w-full bg-indigo-600! hover:bg-indigo-700! drop-shadow-lg text-white disabled:bg-gray-500! disabled:text-gray-300! cursor-progress"
                                style={{
                                    height: '40px',
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                UPDATE
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default UpdateUser;