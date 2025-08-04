/* eslint-disable @typescript-eslint/no-explicit-any */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { Controller, type ControllerRenderProps } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MuiTelInput } from 'mui-tel-input';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Upload, type UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './../../assets/css/style.css';
import { Autocomplete, TextField } from '@mui/material';


export const EmailTextInput = (props: any) => { 
    const { startAdornmentIcon, ...rest } = props;
    const propsObj = { ...rest };
    delete propsObj.setValue;
    return (
        <>
            <Controller
                name={props.name}
                control={props.control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel
                            htmlFor={`${props.name}`}
                            sx={{
                                color: '#4B0082',
                                fontFamily: 'poppins',
                                fontSize: '14px',
                                '&.Mui-focused': {
                                    color: '#4B0082',
                                },
                            }}
                            error={!!error}
                        >
                            {props.label}
                        </InputLabel>
                        <OutlinedInput
                            id={`${props.name}`}
                            type={props.type || 'text'}
                            placeholder={props.placeholder}
                            value={value}
                            rows={props.rows}
                            multiline={props.multiline}
                            onChange={({ target: { value } }) => {
                                onChange(value)
                                if (props?.setValue) props.setValue(props.name, value)
                            }}
                            startAdornment={
                                startAdornmentIcon ? (
                                    <InputAdornment position="start">
                                        {startAdornmentIcon}
                                    </InputAdornment>
                                ) : undefined
                            }
                            label={props.label}
                            error={!!error}
                            sx={{
                                fontFamily: 'poppins',
                                fontSize: '14px',
                                backgroundColor: '#fff',
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4B0082',
                                    borderWidth: '1.5px',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4B0082',
                                },
                                '.MuiInputBase-input': {
                                    fontFamily: 'poppins',
                                    backgroundColor: '#fff',
                                },
                            }}
                            {...propsObj}
                        />
                        {error && (
                            <p style={{ color: '#d32f2f', fontFamily: 'poppins', fontSize: '0.75rem', margin: '3px 14px 0' }}>{error.message}</p>
                        )}
                    </FormControl>
                )}
            />
        </>
    )
}

export const PasswordInput = (props: any) => {
    const { startAdornmentIcon } = props;
    const propsObj = { ...props }
    delete propsObj.setValue
    const [showPassword, setShowPassword] = useState(false); 

    const handleClickShowPassword = () => setShowPassword((show) => !show); 
    return ( 
        <>
            <Controller
                name={props.name}
                control={props.control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel
                            htmlFor={`password-input-${props.name}`}
                            sx={{
                                color: '#4B0082',
                                fontFamily: 'poppins',
                                fontSize: '14px',
                                '&.Mui-focused': {
                                    color: '#4B0082',
                                },
                            }}
                            error={!!error}
                        >
                            {props.label}
                        </InputLabel>
                        <OutlinedInput
                            id={`password-input-${props.name}`}
                            type={showPassword ? 'text' : 'password'}
                            value={value}
                            onChange={({ target: { value } }) => {
                                onChange(value)
                                if (props?.setValue) props.setValue(props.name, value)
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword} 
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>} 
                                    </IconButton>
                                </InputAdornment>
                            }
                            startAdornment={
                                startAdornmentIcon ? (
                                    <InputAdornment position="start">
                                        {startAdornmentIcon}
                                    </InputAdornment>
                                ) : undefined
                            }
                            label={props.label}
                            error={!!error}
                            sx={{
                                fontFamily: 'poppins',
                                fontSize: '14px',
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4B0082',
                                    borderWidth: '1.5px',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4B0082',
                                },
                            }}
                            {...propsObj}
                        />
                        {error && (
                            <p style={{ color: '#d32f2f', fontFamily: 'poppins', fontSize: '0.75rem', margin: '3px 14px 0' }}>{error.message}</p>
                        )}
                    </FormControl>
                )}
            />
        </>
    )
}
export const DropDownInput = (props: any) => {
    return (
        <FormControl fullWidth size="small" sx={{
            '.MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#4B0082',
                    borderWidth: '1.5px',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#4B0082',
                },
            },
            '.MuiInputLabel-root': {
                color: '#4B0082',
                fontFamily: 'poppins',
                fontSize: '14px',
            },
            '.MuiSelect-select': {
                fontFamily: 'poppins',
                fontSize: '14px',
            },
            '.MuiInputLabel-root.Mui-focused': {
                color: '#4B0082',
            },
        }}>
            <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
            <Controller
                name={props.name}
                control={props.control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                             onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                }
                              }}
                              labelId={`${props.name}-label`}
                              label={props.label}
                              {...field}
                              error={!!error}
                              native={false} 
                            >
                                {props.options.map((option: any) => (
                                    <MenuItem key={option.value} value={option.value}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault();
                                        }
                                      }}
                                    >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {error && <p style={{ color: '#d32f2f', fontFamily: 'poppins', fontSize: '0.75rem', margin: '3px 14px 0' }}>{error.message}</p>}
                    </>
                )}
            />
        </FormControl>
    )
}

export const DateInput = (props: any) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={props.name}
                control={props.control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <DatePicker
                        label={props.label}
                        value={value}
                        onChange={onChange}
                        slotProps={{
                            textField: {
                                size: 'small',
                                fullWidth: true,
                                error: !!error,
                                helperText: error?.message,
                                sx: {
                                    '.MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#4B0082',
                                            borderWidth: '1.5px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#4B0082',
                                        },
                                    },
                                    '.MuiInputLabel-root': {
                                        color: '#4B0082',
                                        fontFamily: 'poppins',
                                        fontSize: '14px',
                                    },
                                    '.MuiSelect-select': {
                                        fontFamily: 'poppins',
                                        fontSize: '14px',
                                    },
                                    '.MuiInputLabel-root.Mui-focused': {
                                        color: '#4B0082',
                                    },
                                }
                            }
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    )
}

export const PhoneNumberInput = (props: any) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field, fieldState: { error } }) => (
                <MuiTelInput
                    {...field}
                    label={props.label}
                    defaultCountry="NP"
                    helperText={error ? error.message : null}
                    error={!!error}
                    fullWidth
                    size="small"
                    sx={{
                        '.MuiInputBase-input': {
                            fontFamily: 'poppins',
                        },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#4B0082',
                                borderWidth: '1.5px',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#4B0082',
                            },
                        },
                        '.MuiInputLabel-root': {
                            color: '#4B0082',
                            fontFamily: 'poppins',
                            fontSize: '14px',
                        },
                        '.MuiInputLabel-root.Mui-focused': {
                            color: '#4B0082',
                        },
                    }}
                />
            )}
        />
    );
};

export const ImageUploadInput = (props: any) => {
    const { name, control, setValue, defaultUrl, defaultName = 'logo.png', setLogoMode } = props;
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (defaultUrl) {
            setFileList([{
                uid: '-1',
                name: defaultName,
                status: 'done',
                url: defaultUrl,
            }]);
            if (setLogoMode) setLogoMode('existing');
        } else {
            setFileList([]);
            if (setLogoMode) setLogoMode('removed');
        }
    }, [defaultUrl, defaultName, setLogoMode]);
    return (
        <Controller
            name={name}
            control={control}
            render={() => (
                <Upload
                    name="image"
                    listType="picture"
                    fileList={fileList}
                    maxCount={1}
                    onChange={({ fileList: newFileList }) => {
                        // Only keep the latest file
                        const latestFileList = newFileList.slice(-1);
                        setFileList(latestFileList);
                        if (latestFileList.length > 0 && latestFileList[0].originFileObj) {
                            setValue(name, latestFileList[0].originFileObj);
                            if (setLogoMode) setLogoMode('new');
                        } else {
                            setValue(name, '');
                            if (setLogoMode) setLogoMode('removed');
                        }
                    }}
                    beforeUpload={() => false}
                >
                    <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        className="bg-indigo-600! hover:bg-indigo-500! text-white"
                        style={{
                            width: '200px',
                            height: '42px',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        {props.name === 'image' ? 'Upload Image' : 'Upload Icon'}
                    </Button>
                </Upload>
            )}
        />
    );
};

export const CheckboxInput = (props: any) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }: { field: ControllerRenderProps<any, any> }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            {...field}
                            checked={!!field.value}
                            sx={{
                                color: '#6366f1',
                                '&.Mui-checked': {
                                    color: '#6366f1',
                                },
                            }}
                        />
                    }
                    label={<span style={{ pointerEvents: 'none' }}>{props.label}</span>}
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        '.MuiFormControlLabel-label': {
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '15px',
                            color: '#333',
                        },
                    }}
                    labelPlacement="end"
                />
            )}
        />
    );
};

export const MultipleDropdownInput = (props: any) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    multiple
                    options={props.options}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    value={props.options.filter((opt: any) => field.value?.includes(opt.value))}
                    onChange={(_, newValue) => {
                        field.onChange(newValue.map((opt: any) => opt.value));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={props.label}
                            error={!!error}
                            helperText={error?.message}
                            variant="outlined"
                            size="small"
                            sx={{
                                fontFamily: 'poppins!',
                                fontSize: '14px',
                                backgroundColor: '#fff',
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4B0082',
                                    borderWidth: '1.5px',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4B0082',
                                },
                                '.MuiInputBase-input': {
                                    fontFamily: 'poppins',
                                    backgroundColor: '#fff',
                                },
                                '.MuiInputLabel-root': {
                                    color: '#4B0082',
                                    fontFamily: 'poppins',
                                    fontSize: '14px',
                                },
                                '.MuiInputLabel-root.Mui-focused': {
                                    color: '#4B0082',
                                },
                                '.MuiFormHelperText-root': {
                                    fontFamily: 'poppins',
                                },
                            }}
                        />
                    )}
                    sx={{
                        '.MuiAutocomplete-tag': {
                            fontFamily: 'poppins',
                            fontSize: '14px',
                        },
                    }}
                />
            )}
        />
    );
}
export const TagInput = (props: any) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Autocomplete
                        multiple
                        freeSolo
                        options={[]}
                        value={field.value || []}
                        onChange={(_, newValue) => {
                            field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={props.label}
                                placeholder={props.placeholder}
                                error={!!error}
                                variant="outlined"
                                size="small"
                                helperText={props.helperText}
                                sx={{
                                    fontFamily: 'poppins',
                                    fontSize: '14px',
                                    backgroundColor: '#fff',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#4B0082',
                                        borderWidth: '1.5px',
                                    },
                                    '.Mui-focused' : {
                                        borderColor: '#4B0082',
                                    },
                                    '.MuiInputBase-input': {
                                        fontFamily: 'poppins',
                                        backgroundColor: '#fff',
                                    },
                                    '.MuiInputLabel-root': {
                                        color: '#4B0082',
                                        fontFamily: 'poppins',
                                        fontSize: '14px',
                                    },
                                    '.MuiHelperText-root': {
                                        color: '#4B0082',
                                        fontFamily: 'poppins',
                                        fontSize: '14px',
                                    },
                                    '.MuiInputLabel-root.Mui-focused': {
                                        color: '#4B0082',
                                    },
                                }}
                            />
                        )}
                        sx={{
                            '.MuiAutocomplete-tag': {
                                fontFamily: 'poppins!',
                                fontSize: '13px',
                            },
                        }}
                    />
                    {error && <p style={{ color: '#d32f2f', fontFamily: 'poppins', fontSize: '0.75rem', margin: '3px 14px 0' }}>{error.message}</p>}
                </>
            )}
        />
    );
}
