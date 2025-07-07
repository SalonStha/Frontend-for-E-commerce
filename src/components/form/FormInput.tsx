/* eslint-disable @typescript-eslint/no-explicit-any */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MuiTelInput } from 'mui-tel-input';
import { MuiFileInput } from 'mui-file-input';
import OutlinedInput from '@mui/material/OutlinedInput';


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
                            type="email"
                            placeholder={props.placeholder}
                            value={value}
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
    const [showPassword, setShowPassword] = useState(true); // Default to true to show password initially

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
                            labelId={`${props.name}-label`}
                            label={props.label}
                            {...field}
                            error={!!error}
                        >
                            {props.options.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
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

export const ImageInput = (props: any) => {
    return (
        <Controller
            name="file"
            control={props.control}
            render={({ field, fieldState }) => (
                <MuiFileInput
                    {...field}
                    helperText={fieldState.invalid ? "File is invalid" : ""}
                    fullWidth
                    size="small"
                    label={props.label}
                    error={fieldState.invalid}
                    sx={{
                        '.MuiInputBase-input': {
                            fontFamily: 'poppins', // Change to your desired font family
                        },
                        '.MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#4B0082',
                                borderWidth: '1.5px',
                                // Default border color
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#4B0082', // Border color when focused
                            },
                        },
                        '.MuiInputLabel-root': {
                            color: '#4B0082', // Label color
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