import React from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, isValid } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from 'react-hook-form';
import { DatePicker } from "@/components/date-picker";

export const FormUpdateCustomer = () => {
    const form = useFormContext();

    function maskCPF(value) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    function maskCEP(value) {
        return value
            .replace(/\D/g, "")
            .replace(/^(\d{5})(\d{1,3})?/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
    }

    async function getAddressData(cep) {
        if (cep?.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    console.error("CEP não encontrado.");
                    return;
                }

                form.setValue("street", data.logradouro || "");
                form.setValue("city", data.localidade || "");
                form.setValue("state", data.uf || "");
            } catch (err) {
                console.error("Erro ao buscar o CEP:", err);
            }
        }
    }

    return (
        <div className='w-full h-full'>
            <form className='flex flex-col gap-5'>
                <div className='flex gap-4 items-stretch flex-wrap'>
                    <FormField
                        control={form.control}
                        name="document"
                        render={({ field }) => (
                            <FormItem className='w-full flex flex-col gap-2'>
                                <FormLabel>CPF</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="000.000.000-00"
                                        value={field.value}
                                        onChange={(e) => {
                                            const masked = maskCPF(e.target.value)
                                            field.onChange(masked)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="truncate" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='w-full flex flex-col gap-2'>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Insira aqui o nome" {...field} />
                                </FormControl>
                                <FormMessage className='truncate' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date_birth"
                        render={({ field }) => {
                            const date = field.value instanceof Date ? field.value : new Date(field.value);
                            const isValidDate = isValid(date);
                            return (
                                <FormItem className='w-full flex flex-col gap-2'>
                                    <FormLabel>Data de nascimento</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage className='truncate' />
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className='w-full flex flex-col gap-2'>
                                <FormLabel>Sexo</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        className='flex'
                                        defaultValue="M">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="M" id="m" />
                                            <Label htmlFor="m">Masculino</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="F" id="f" />
                                            <Label htmlFor="f">Feminino</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage className='truncate' />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex gap-4 items-stretch flex-wrap'>
                    <FormField
                        control={form.control}
                        name="zip_code"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="00000-000"
                                        value={field.value}
                                        onChange={(e) => {
                                            const masked = maskCEP(e.target.value)
                                            field.onChange(masked)
                                        }}
                                        onBlur={() => {
                                            const rawCep = field.value?.replace(/\D/g, "");
                                            getAddressData(rawCep)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="truncate" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                    <Input disabled placeholder="Cidade" {...field} />
                                </FormControl>
                                <FormMessage className="truncate" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Input disabled placeholder="Estado" {...field} />
                                </FormControl>
                                <FormMessage className="truncate" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Rua</FormLabel>
                                <FormControl>
                                    <Input placeholder="Insira aqui sua rua" {...field} />
                                </FormControl>
                                <FormMessage className="truncate" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Complemento</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex.: Ap.102" {...field} />
                                </FormControl>
                                <FormMessage className="truncate" />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </div >
    );
};