import { useState, useEffect } from 'react';
import CategoriaContext from './EstadosContext';
import {
     getEstadosServicoPorCodigoAPI, cadastraEstadosServico, getEstadosServico, deleteEstadosServico
} from '../../../servicos/EstadosServico';
import Tabela from './Tabela';
import Form from './Form';
import WithAuth from '../../../seguranca/WithAuth';
import { useNavigate } from 'react-router-dom/dist';

function Estados() {

    let navigate = useNavigate(); 

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: ""
    })
    const [carregando, setCarregando] = useState(true);
    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: ""
        });
    }

    const editarObjeto = async codigo => {
        setObjeto(await getEstadosServicoPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraEstadosServico(objeto, metodo);
            setAlerta({ 
                status: retornoAPI.status, 
                message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaEstados();
    }

    const recuperaEstados = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getEstadosServico());
            setCarregando(false);

        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }

    }

    const remover = async codigo => {
        try {
            if (window.confirm('Deseja remover este objeto?')) {
                let retornoAPI = await deleteEstadosServico(codigo);
                setAlerta({ 
                    status: retornoAPI.status, 
                    message: retornoAPI.message })
                    recuperaEstados()
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });

        }
    }
   

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    
    useEffect(() => {
        recuperaEstados();
    }, []);

    return (
        <>
            <CategoriaContext.Provider value={
                {
                    alerta, setAlerta,
                    listaObjetos,
                    remover,
                    objeto,
                    editar,
                    acaoCadastrar,
                    handleChange, novoObjeto, editarObjeto
                }
            }>
                <Tabela />
                <Form />
            </CategoriaContext.Provider>
        </>
    );
}

export default WithAuth(Estados);