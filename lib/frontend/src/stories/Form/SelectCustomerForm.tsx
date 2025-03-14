import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomTextField } from "../../components/designComponent/Input";
import { Customer } from "../../model/src";
import CustomTypography from "../../components/designComponent/Typography";
import { colors } from "../../styles/theme";

interface SelectCustomerFormInputs {
    full_name: string;
    email?: string;
    phone_number?: string;
}

interface SelectCustomerFormProps {
    customer?: Customer.Model | null;
    onNameClick?: (event: React.MouseEvent<HTMLElement>) => void; // נוסיף את האירוע
}

const SelectCustomerForm: React.FC<SelectCustomerFormProps> = ({ customer, onNameClick }) => {
    const { control, setValue } = useForm<SelectCustomerFormInputs>();
    useEffect(() => {
        if (customer) {
            setValue("full_name", customer.first_name + " " + customer.last_name);
            setValue("email", customer.email);
            setValue("phone_number", customer.phone_number);
        } else {
            setValue("full_name", "הקלד שם לקוח");
            setValue("email", "");
            setValue("phone_number", "");
        }
    }, [customer, setValue]);

    return (
        <Box
            sx={{
                width: '100%',
                height: "100%",
                padding: 3.5,
                backgroundColor: colors.neutral.white,
                borderRadius: 1,
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                gap: 3.5,
            }}
        >
            <CustomTypography
                text='פרטי לקוח'
                variant='h2'
                weight='medium'
                color={colors.brand.color_8}
            />
            <Box
                sx={{
                    alignSelf: "stretch",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    gap: 3.5,
                    display: "inline-flex",
                }}
            >
                {customer && (
                    <>
                        <Box
                            sx={{
                                width: 393.33,
                                height: 90,
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-end",
                                gap: 1,
                                display: "inline-flex",
                            }}
                        >
                            <CustomTextField
                                control={control}
                                name="customerEmail"
                                label="אימייל"
                                placeholder={customer.email || "אימייל"}
                                disabled
                            />
                        </Box>
                        <Box
                            sx={{
                                width: 393.33,
                                height: 90,
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-end",
                                gap: 1,
                                display: "inline-flex",
                            }}
                        >
                            <CustomTextField
                                control={control}
                                name="customerPhone"
                                label="טלפון"
                                placeholder={customer.phone_number || "טלפון"}
                                disabled
                            />
                        </Box>
                    </>
                )
                }
                <Box
                    sx={{
                        width: 393.33,
                        height: 90,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        gap: 1,
                        display: "inline-flex",
                    }}
                >
                    <CustomTextField
                        control={control}
                        name="customerName"
                        label="בחר לקוח"
                        placeholder={
                            customer
                                ? `${customer.first_name} ${customer.last_name}`
                                : "הקלד שם לקוח"
                        }
                        onClick={onNameClick}
                    />
                </Box>

            </Box>
        </Box>
    );
};

export default SelectCustomerForm;
