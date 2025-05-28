import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button';
import { DialogTitle, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { FormRegisterCustomer } from '@/forms/form_register_customer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { CreateCustomer } from '@/services/customer_service';

const formSchema = z.object({
    document: z.string({
        invalid_type_error: "CPF deve ser do tipo texto",
        required_error: "CPF é um campo obrigatório",
    }).min(11, "O valor deve ser um CPF válido"),
    name: z.string({
        invalid_type_error: "Nome deve ser do tipo texto",
        required_error: "Nome é um campo obrigatório"
    }).min(2, 'O campo deve ser um nome válido'),
    date_birth: z.coerce.date({
        required_error: "Data de nascimento obrigatória",
        invalid_type_error: "Data inválida",
    }),
    gender: z.enum(["M", "F"], {
        required_error: "Selecione o sexo",
    }),
    zip_code: z.string({
        invalid_type_error: "CEP deve ser do tipo texto",
        required_error: "CEP é um campo obrigatório"
    }).min(8, "Esse é um campo obrigatório").max(9, "O campo deve ser um CEP válido"),
    city: z.string({
        required_error: 'Esse é um campo obrigatório'
    }).min(1, 'Esse é um campo obrigatório'),
    state: z.string({
        required_error: 'Esse campo é obrigatório'
    }).min(2, "Esse é um campo obrigatório").max(2, "O campo deve ter ser um estado válido"),
    street: z.string({
        invalid_type_error: 'O campo deve ser do tipo texto',
        required_error: 'Esse é um campo obrigatório'
    }),
    complement: z.string({}).optional()
})

export const RegisterCustomer = ({ onCreate }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            document: '',
            name: '',
            gender: 'M',
            zip_code: '',
            city: '',
            state: '',
            street: '',
            complement: ''
        }
    })

    function unmask(value) {
        return value.replace(/\D/g, "")
    }

    async function onSubmit(values) {
        const formatted = {
            ...values,
            date_birth: values.date_birth.toISOString().split("T")[0],
            document: unmask(values.document),
            zip_code: unmask(values.zip_code)
        };

        await CreateCustomer({
            name: formatted.name,
            document: formatted.document,
            gender: formatted.gender,
            date_birth: formatted.date_birth,
            address: {
                zip_code: formatted.zip_code,
                street: formatted.street,
                city: formatted.city,
                state: formatted.state,
                complement: formatted.complement
            }
        })
        onCreate()
    }

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button>Cadastrar cliente</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cadastrar cliente</DialogTitle>
                    </DialogHeader>

                    <FormProvider {...form}>
                        <ScrollArea className="h-[450px] w-48 w-full">
                            <div className='p-2'>
                                <FormRegisterCustomer />
                            </div>
                        </ScrollArea>

                        <DialogFooter>
                            <Button onClick={form.handleSubmit(onSubmit)}>Cadastrar</Button>
                            <Button
                                variant="destructive"
                                onClick={() => form.reset()}
                            >Limpar</Button>

                            <DialogClose>
                                <Button variant="secondary">Cancelar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </>
    );
};