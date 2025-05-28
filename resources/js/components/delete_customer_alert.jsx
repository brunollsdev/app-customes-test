import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DeleteCustomer } from "@/services/customer_service";

export const DeleteCustomerAlert = ({ customerId, onDelete }) => {

    async function deleteCustomer() {
        const res = await DeleteCustomer(customerId)
        if (res) {
            onDelete(customerId)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant='destructive'>Deletar</Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja realmente deletar esse cliente?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ao confirmar o cliente será deletado permanentemente da base.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteCustomer}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}