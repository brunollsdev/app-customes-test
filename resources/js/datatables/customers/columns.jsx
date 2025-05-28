import React from "react";
import { DeleteCustomerAlert } from "@/components/delete_customer_alert";
import { UpdateCustomerModule } from "@/modules/update_customer";

export const columns = ({ onDelete, onUpdate }) => [
    {
        accessorKey: "name",
        header: "Cliente",
    },
    {
        accessorKey: "document",
        header: "CPF",
    },
    {
        accessorKey: "date_birth",
        header: "Data de nascimento",
    },
    {
        accessorKey: "state",
        header: "Estado",
    },
    {
        accessorKey: "city",
        header: "Cidade",
    },
    {
        accessorKey: "gender",
        header: "Sexo",
    },
    {
        accessorKey: "actions",
        header: "Ações",
        cell: ({ row }) => {
            return <>
                <div className="flex gap-2">
                    <DeleteCustomerAlert customerId={row.original.id} onDelete={onDelete} />
                    <UpdateCustomerModule customer={row.original} onUpdate={onUpdate} />
                </div >
            </>
        },
    },
]