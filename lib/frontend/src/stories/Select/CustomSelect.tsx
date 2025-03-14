import React from 'react';
import { FormControl, Select, MenuItem, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colors } from '../../styles/theme';

interface CustomSelectProps {
    name: string;
    control: any;
    options: { label: string, value: string }[];
    label: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ name, control, options, label }) => {
    return (
        <FormControl sx={{ width: '100%' }}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        label={label}
                        onChange={(e) => field.onChange(e.target.value)}
                        sx={{
                            direction: "rtl",
                            backgroundColor: colors.brand.color_11,
                            border: 'none',
                            boxShadow: 'none', 
                            '.MuiOutlinedInput-notchedOutline': { border: 'none' }, 
                            '& .MuiSelect-icon': {
                                display: 'none',
                            },
                            color: colors.brand.color_9,
                            fontSize: 20,
                            fontFamily: "Heebo",
                            fontWeight: 400,
                            wordWrap: "break-word",
                            height: '49px',
                            padding: '0 10px',
                        }}
                        defaultValue={options.length > 0 ? options[0].value : ''}
                        startAdornment={ 
                            <InputAdornment position="start">
                                <ExpandMoreIcon
                                 sx={{
                                    position: 'absolute', 
                                    left: 10, 
                                    top: '50%',
                                    transform: 'translateY(-50%)', 
                                    color: colors.brand.color_8,
                                    fontSize: 24
                                }} />
                            </InputAdornment>
                        }
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value} sx={{
                                color: colors.brand.color_9,
                                fontSize: 20,
                                fontFamily: "Heebo",
                                fontWeight: 400,
                                wordWrap: "break-word",
                                direction: 'rtl'
                            }}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </FormControl>
    );
};

export default CustomSelect;
