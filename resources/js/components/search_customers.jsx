import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { FormSearchCustomer } from "@/forms/form_search_customer";
import { Button } from "./ui/button";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GetCustomers } from "@/services/customer_service";

const formSchema = z.object({
    document: z.string({
        invalid_type_error: "CPF deve ser do tipo texto",
        required_error: "CPF é um campo obrigatório",
    }).optional(),
    name: z.string({
        invalid_type_error: "Nome deve ser do tipo texto",
        required_error: "Nome é um campo obrigatório"
    }).optional(),
    date_birth: z.date({
        required_error: "Data de nascimento obrigatória",
        invalid_type_error: "Data inválida",
    }).optional().nullable(),
    gender: z.enum(["M", "F"], {
        required_error: "Selecione o sexo",
    }).optional().default('M'),
    city: z.string({
        required_error: 'Esse é um campo obrigatório'
    }).optional(),
    state: z.string({
        required_error: 'Esse campo é obrigatório'
    }).optional()
})

export const SearchCustomer = ({ onSearch }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            document: '',
            name: '',
            gender: 'M',
            city: '',
            state: '',
            date_birth: '',
        }
    })

    function unmask(value) {
        return value.replace(/\D/g, "")
    }

    async function onSubmit(values) {
        const formatted = {
            ...values,
            gender: values.gender == undefined ? "" : values.gender,
            name: values.name == undefined ? "" : values.name,
            state: values.state == undefined ? "" : values.state,
            city: values.city == undefined ? "" : values.city,
            date_birth: values.date_birth ? values.date_birth.toISOString().split("T")[0] : "",
            document: values.document != undefined ? unmask(values.document) : "",
        };

        const customers = await GetCustomers(formatted)
        onSearch(customers)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Buscar cliente</CardTitle>
                </CardHeader>
                <FormProvider {...form}>
                    <CardContent>
                        <FormSearchCustomer />
                    </CardContent>
                    <CardFooter>
                        <div className="flex gap-2">
                            <Button onClick={form.handleSubmit(onSubmit)}>Buscar</Button>
                            <Button onClick={form.reset} variant='secondary'>Limpar</Button>
                        </div>
                    </CardFooter>
                </FormProvider>
            </Card >
        </>
    )
}