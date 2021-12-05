 import React from 'react';
 import clientService from '../../services/client.service';
 import moment from 'moment';
 import './client.page.css';
 
 import {
    useLocation,
    useNavigate,
    useParams
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

 class Client extends React.Component {
     constructor(props) {
        super(props)
        this.state = {
            client: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        // Recuperando os id do cliente na url
        let clientId = this.props.router.params.id
        // Chamando a função que carrega os dados do client
        this.loadClient(clientId)
    }

    // Função que carrega os dados do cliente e salva no state
    async loadClient(clientId) {
        try {
            let res = await clientService.show(clientId)
            this.setState({ client: res.data[0] })
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar cliente.")
        }
    }

    // Função que exclui o cliente, chamada ao clicar no botão "Excluir"
    async deleteClient(clientId) {
        
        if (!window.confirm("Deseja realmente excluir este cliente?")) return;

        try {
            await clientService.delete(clientId)
            alert("Cliente excluído com sucesso")
            this.props.router.navigate('/clients')
        } catch (error) {
            console.log(error);
            alert("Não foi excluir o client.")
        }

    }

    render() {
        return (
            <div className="container">

                <div className="page-top">
                    <div className="page-top__title">
                        <h2>Cliente</h2>
                        <p>Detalhes do cliente</p>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-light" onClick={() => this.props.router.navigate('/clients')}>
                            Voltar
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="client-info">
                            <h4>ID</h4>
                            <p>{this.state.client?.id}</p>
                        </div>
                        <div className="client-info">
                            <div>Nome</div>
                            <div>{this.state.client?.name}</div>
                        </div>
                        <div className="client-info">
                            <div>Tipo de Pessoa</div>
                            <div>{this.state.client?.type}</div>
                        </div>
                        <div className="client-info">
                            <div>UF</div>
                            <div>{this.state.client?.state}</div>
                        </div>
                        <div className="client-info">
                            <div>Categoria</div>
                            <div>{this.state.client?.categories.name}</div>
                        </div>
                        <div className="client-info">
                            <div>{this.state.client?.type === 'Física' ? 'Data Nascimento' : 'Data Fundação'}</div>
                            <div>{moment(this.state.client?.start).format('DD/MM/YYYY')}</div>
                        </div>
                        <div className="client-info">
                            <div>Telephones</div>
                            <div>{this.state.client?.telephones}</div>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.deleteClient(this.state.client.id)}>
                                Excluir
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => this.props.router.navigate('/edit/' + this.state.client.id)}>
                                Editar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
 }

 export default withRouter(Client);