import React from 'react';
import { Link } from 'react-router-dom';
import clientService from '../../services/client.service';
import MaterialIcon from 'react-google-material-icons';
import './clients.page.css';
 
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

class Clients extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            clients: []
        }
    }

    componentDidMount() {
        this.loadClients()
    }

    async loadClients() {
        try {
            let search = this.props.router.location.search;
            let res = await clientService.list(search);
            this.setState({clients: res.data});
        }
        catch (error) {
            console.log(error);
            alert('Não foi possível listar os clientes');
        }
    }
    render() {
        return (
            <div className="container">
                <div className="page-top">
                    <div className="page-top__title">
                        <h1>Listagem dos clientes</h1>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-primary" onClick={() => this.props.router.navigate('/new')}>
                            Adicionar
                        </button>
                    </div>
                </div>

                {/* Percorrendo o array de clients do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do client específico */}
                {this.state.clients.map(client => (
                    <Link to={"/client/" + client.id} key={client.id}>
                        <div className="client-card">
                            <div className="client-card__text">
                                <h4>{client.name}</h4>
                                <p>{client.type} - {client.state}</p>
                            </div>
                            <div className="client-card__icon">
                                <MaterialIcon icon="edit" size={36}/>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        )
    }
}

export default withRouter(Clients);