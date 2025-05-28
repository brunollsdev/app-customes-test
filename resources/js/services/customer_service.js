import axios from "axios";
import { toast } from "sonner";

export async function GetCustomers(formatted, page = 0) {
    try {
        const params = new URLSearchParams({
            name: formatted.name,
            state: formatted.state,
            city: formatted.city,
            gender: formatted.gender,
            document: formatted.document,
            date_birth: formatted.date_birth,
            page: page
        });

        const response = await axios.get(`http://localhost/api/v1/customer/search?${params.toString()}`);

        if (response.data?.status && response.data?.data?.response?.customers) {
            toast.success("Busca realizada com sucesso.");
            return response.data.data.response.customers
        }

        toast.warning("Nenhum cliente encontrado.");
        return []
    } catch (error) {
        toast.error("Erro na busca de clientes.");
    }
}

export async function CreateCustomer(customer) {
    try {
        const response = await axios.post(`http://localhost/api/v1/customer/create`, customer);

        if (response.data?.status) {
            toast.success("Cliente cadastrado com sucesso");
            return true
        }

        toast.warning("Não foi possível cadastrar o cliente. Tente novamente mais tarde.");
    } catch (error) {
        toast.error(error.response.data.data.message);
    }
}

export async function UpdateCustomer(customer) {
    try {
        const response = await axios.put(`http://localhost/api/v1/customer/${customer.id}/update`, customer);

        if (response.data?.status) {
            toast.success("Cliente atualizado com sucesso");
            return true
        }

        toast.warning("Não foi possível atualizar o cliente. Tente novamente mais tarde.");
        return false
    } catch (error) {
        toast.error(error.response.data.data.message);
        return false
    }
}

export async function DeleteCustomer(id) {
    try {
        const response = await axios.delete(`http://localhost/api/v1/customer/${id}/delete`);

        if (response.data?.status) {
            toast.success("Cliente deletado com sucesso");
            return true
        }

        toast.warning("Não foi possível deletar o cliente. Tente novamente mais tarde.");
        return false
    } catch (error) {
        toast.error(error.response.data.data.message);
        return false
    }
}