import React from 'react';
import clientService from '../../services/client.service';
import './post.page.css'
import Options from './Options';
 
import {
useLocation,
useNavigate,
useParams,
} from "react-router-dom";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
        <Component
            {...props}
            router={{ location, navigate, params }}
        />
        );
    }

    return ComponentWithRouterProp;
}

class Post extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: null,
            name: '',
            type: '',
            state: null,
            category_id: null,
            start: '',
            telephones: '',
            categories: [],
            states: []
        }
        this.loadCategories();
        this.loadStates();
        // Recuperando os id do cliente na url
        let clientId = this.props.router.params.id
        if (clientId){
            this.loadClient(clientId);
        }
    }
    
    // Função que recupera os dados do client caso seja uma edição
    loadClient(clienteId){
        try {
                clientService.show(clienteId)
                .then((res) => {
                    let client = res.data[0]
                    this.setState({
                        id: client.id,
                        name: client.name,
                        type: client.type,
                        state: client.state,
                        category_id: client.category_id,
                        start: client.start,
                        telephones: client.telephones,
                    });
                }
            )
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar os dados do cliente.")
        }
    }

    loadCategories(){
        clientService.listCategories()
        .then((res) => {
            this.setState({categories: res.data});
        });
    }

    loadStates(){
        clientService.listStates()
        .then((res) => {
            this.setState({states: res.data});
        });
    }

    // Função responsável por salvar o client
    sendPost(){
        
        // Reunindo dados
        let data = {
            name : this.state.name,
            type : this.state.type,
            state : this.state.state,
            category_id: this.state.category_id,
            start: this.state.start,
            telephones: this.state.telephones
        }

        // Realizando verificações
        if(!data.name || data.name === ''){
            alert("O nome é obrigatório!")
            return;
        }
        if(!data.state || data.state === ''){
            alert("Favor informar a UF")
            return;
        }
        
        // Caso seja uma edição, chamar o "edit" do serviço
        if(this.state.id){
            clientService.edit(data, this.state.id)
            .then((data) => {
                alert("Cliente editado com sucesso!")
            })
            .catch((error) => {
                var errors = '';
                for(let i in error.response.data){
                    for(let ii in error.response.data[i]){
                        errors += error.response.data[i][ii];
                    }
                }
                alert("Erro ao editar cliente.\n" + errors)
            })
        }
        // Caso seja uma adição, chamar o "create" do serviço
        else{
            clientService.create(data)
            .then((data) => {
                alert("Cliente criado com sucesso!")
            })
            .catch((error) => {
                var errors = '';
                for(let i in error.response.data){
                    for(let ii in error.response.data[i]){
                        errors += error.response.data[i][ii];
                    }
                }
                alert("Erro ao criar cliente.\n" + errors)
            })
        }
        this.props.router.navigate('/clients')
    }

    changeVisibility()
    {
        this.setState({
            visibilidade:'block'
        })
    }
    
    render() {
        let title = this.state.id ? 'Editar Cliente' : 'Novo Cliente';
        let desc = this.state.id ? 'Editar informações de um cliente' : 'Formulário de criação de clientes';
        
        return (
            <div className="container">
                <div className="page-top">
                    <div className="page-top__title">
                        <h2>{title}</h2>
                        <p>{desc}</p>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-light" onClick={() => this.props.router.navigate('/clients')}>
                            Cancelar
                        </button>
                        <button className="btn btn-primary" onClick={() => this.sendPost()}>
                            Salvar
                        </button>
                    </div>
                </div>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })} />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Tipo de Pessoa</label>
                        <select 
                            className="form-control" 
                            id="type"
                            value={this.state.type}
                            onChange={e => this.setState({ type: e.target.value })}
                        >
                            <option value="">Selecione</option>
                            <option value="Física">Física</option>
                            <option value="Jurídica">Jurídica</option>
                        </select>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">UF</label>
                        <select 
                            className="form-control" 
                            id="state"
                            value={this.state.state}
                            onChange={e => this.setState({ state: e.target.value })}
                        >
                        <option value="">Selecione</option>
                        <Options 
                            func={this.loadStates.bind(this)} 
                            data={this.state.states} 
                        />
                        </select>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_id">Categoria</label>
                        <select 
                            className="form-control" 
                            id="category_id"
                            value={this.state.category_id}
                            onChange={e => this.setState({ category_id: e.target.value })}
                        >
                            <option value="">Selecione</option>
                        <Options 
                            func={this.loadCategories.bind(this)} 
                            data={this.state.categories} 
                        />
                        </select>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="start">{this.state.type === 'Física' ? 'Data de Nascimento' : 'Data de Fundação'}</label>
                        <input
                            type="date" 
                            className="form-control" 
                            id="start"
                            value={this.state.start}
                            onChange={e => this.setState({ start: e.target.value })}
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephones">Telefones (Separar por ponto-e-vírgula)</label>
                        <input
                            type="text" 
                            className="form-control" 
                            id="telephones"
                            value={this.state.telephones}
                            onChange={e => this.setState({ telephones: e.target.value })}
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Post);