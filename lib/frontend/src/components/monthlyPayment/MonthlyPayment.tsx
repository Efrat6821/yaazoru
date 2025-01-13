import React, { useState, useEffect } from "react";
import { TransactionDetails } from "../../model/src";
import MonthlyPaymentList from "./MonthlyPaymentList";
import { getMonthlyPayment } from "../../api/monhlyPaymentApi";

const MonthlyPayment: React.FC = () => {
    const [MonthlyPayment, setMonthlyPayment] = useState<TransactionDetails.Model[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMonthlyPayment = async () => {
            try {
                setIsLoading(true);
                const data = await getMonthlyPayment();
                setMonthlyPayment(data);
            } catch (err) {
                setError("Failed to fetch monthly payment.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMonthlyPayment();
    }, []);

    if (isLoading) return <div>Loading monthly payment...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <MonthlyPaymentList
                monthlyPayment={MonthlyPayment.map(
                    (monthly) => monthly.monthlyAmount + " " + monthly.totalAmount
                )}
            />
        </div>
    );
};

export default MonthlyPayment;