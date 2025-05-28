import { SearchCustomer } from "@/components/search_customers";
import CustomersTable from "@/datatables/customers/page";
import { RegisterCustomer } from "@/modules/register_customer";
import { GetCustomers } from "@/services/customer_service";
import React, { useEffect, useState } from "react";


export const Home = () => {
    const [customers, setCustomers] = useState([]);
    async function getCustomers() {
        try {
            const params = {
                name: "",
                state: "",
                city: "",
                date_birth: "",
                gender: "",
                document: ""
            }
            const customers = await GetCustomers(params)
            console.log(customers)
            handleSearch(customers);
        } catch (error) {
            console.error("Erro ao buscar estados do IBGE:", error);
        }
    }

    useEffect(() => {
        getCustomers()
    }, [])

    const handleSearch = (data) => {
        setCustomers(data);
    };

    const handleDelete = (deletedCustomerId) => {
        setCustomers((prev) => prev.filter((c) => c.id !== deletedCustomerId));
    }

    return (
        <>
            <div className="w-screen h-screen">
                <div className="w-full h-full flex flex-col gap-4 justify-center">
                    <div className="flex justify-center w-full">
                        <div className="flex flex-col items-start gap-4">
                            <RegisterCustomer onCreate={getCustomers} />
                            <SearchCustomer onSearch={handleSearch} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-1/2">
                            <CustomersTable customers={customers} onDeleted={handleDelete} onUpdate={getCustomers} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}