import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-tables";

export default function CustomersTable({ customers, onDeleted, onUpdate }) {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Clientes</h2>
            <DataTable columns={columns({ onDelete: onDeleted, onUpdate: onUpdate })} data={customers} />
        </div>
    );
}
