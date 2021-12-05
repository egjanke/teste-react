import axios from 'axios';

// Armazenando o endereço da API
const apiUrl = "http://localhost:8002/api"

const clientService = {

    // Função para listar os clientes 
    async list(search = ''){
        const enpoint = apiUrl + "/clients" + search
        return axios.get(enpoint)
    },

    // Função para recuperar dados de um cliente específico
    async show(clientId){
        const enpoint = apiUrl + "/clients/" + clientId
        return axios.get(enpoint)
    },

    // Função para criar um novo cliente
    async create(data){
        const enpoint = apiUrl + "/clients"
        return axios.post(enpoint, data)
    },

    // Função para editar um cliente específico
    async edit(data, clientId){
        const enpoint = apiUrl + "/clients/" + clientId
        return axios.put(enpoint, data)
    },

    // Função para exluir um cliente específico
    async delete(clientId){
        const enpoint = apiUrl + "/clients/" + clientId
        return axios.delete(enpoint)
    },

    // Função para listar os clientes 
    async listStates(){
        const enpoint = apiUrl + "/states"
        return axios.get(enpoint)
    },

    // Função para listar os clientes 
    async listCategories(){
        const enpoint = apiUrl + "/categories"
        return axios.get(enpoint)
    },


}

export default clientService;