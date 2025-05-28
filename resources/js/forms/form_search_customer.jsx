import React, { useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Check, ChevronsUp, ChevronsUpDown } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, isValid } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from 'react-hook-form';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { DatePicker } from '@/components/date-picker';

export const FormSearchCustomer = () => {
    const [openCitys, setOpenCitys] = React.useState(false)
    const [openStates, setOpenStates] = React.useState(false)
    const [states, setStates] = React.useState([])
    const [citys, setCitys] = React.useState([])
    const form = useFormContext();

    function maskCPF(value) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    async function getCitysByState(state) {
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`);
            const data = await response.json();

            const sorted = data.sort((a, b) => a.nome.localeCompare(b.nome));

            const formatted = sorted.map((city) => ({
                label: city.nome,
                value: city.nome,
            }));
            setCitys(formatted);
        } catch (error) {
            console.error("Erro ao buscar estados do IBGE:", error);
        }
    }

    useEffect(() => {
        async function getStates() {
            try {
                const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
                const data = await response.json();

                const sorted = data.sort((a, b) => a.nome.localeCompare(b.nome));

                const formatted = sorted.map((state) => ({
                    label: state.sigla,
                    value: state.sigla,
                }));
                setStates(formatted);
            } catch (error) {
                console.error("Erro ao buscar estados do IBGE:", error);
            }
        }

        getStates()
    }, [])


    return (
        <div className='w-full h-full'>
            <form className='flex flex-col gap-5'>
                <div className='flex gap-4 items-stretch '>
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
                <div className='flex gap-4 items-stretch'>
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Popover open={openStates} onOpenChange={setOpenStates}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-[350px] justify-between"
                                            >
                                                {field.value
                                                    ? states.find((state) => state.value === field.value)?.label
                                                    : "Selecione um estado"}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[350px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Buscar estado" className="h-9"></CommandInput>
                                                <CommandList>
                                                    <CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
                                                    <CommandGroup>
                                                        {
                                                            states.map((state) => {
                                                                return (
                                                                    <CommandItem
                                                                        key={state.value}
                                                                        value={state.value}
                                                                        onSelect={(currentValue) => {
                                                                            field.onChange(currentValue === field.value ? "" : currentValue)
                                                                            getCitysByState(currentValue)
                                                                            setOpenStates(false)
                                                                        }}
                                                                    >
                                                                        {state.label}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                field.value === state.value ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                )
                                                            })
                                                        }
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
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
                                    <Popover open={openCitys} onOpenChange={setOpenCitys}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openCitys}
                                                className="w-[350px] justify-between"
                                            >
                                                {field.value
                                                    ? citys.find((city) => city.value === field.value)?.label
                                                    : "Selecione uma cidade"}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[350px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Buscar cidade" className="h-9"></CommandInput>
                                                <CommandList>
                                                    <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                                                    <CommandGroup>
                                                        {
                                                            citys.map((city) => {
                                                                return (<CommandItem
                                                                    key={city.value}
                                                                    value={city.value}
                                                                    onSelect={(currentValue) => {
                                                                        field.onChange(currentValue === field.value ? "" : currentValue)
                                                                        setOpenCitys(false)
                                                                    }}
                                                                >
                                                                    {city.label}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            field.value === city.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>)
                                                            })
                                                        }
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
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