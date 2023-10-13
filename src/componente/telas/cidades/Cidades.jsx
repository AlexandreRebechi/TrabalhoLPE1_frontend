import { useState, useEffect } from 'react';
import CategoriaContext from './CidadesContext';
import {
     getCidadesServicoPorCodigoAPI, cadastraCidadesServico, getCidadesServico, deleteCidadesServico
} from '../../../servicos/CidadesServico';
import Tabela from './Tabela';
import Form from './Form';
import WithAuth from '../../../seguranca/WithAuth';
import { useNavigate } from 'react-router-dom/dist';

function Cidades() {

    let navigate = useNavigate(); 

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
    })
    const [carregando, setCarregando] = useState(true);
    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            estado: "",
        });
    }

    const editarObjeto = async codigo => {
        setObjeto(await getCidadesServicoPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCidadesServico(objeto, metodo);
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
        recuperaCidades();
    }

    const recuperaCidades = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getCidadesServico());
            setCarregando(false);

        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }

    }

    const remover = async codigo => {
        try {
            if (window.confirm('Deseja remover este objeto?')) {
                let retornoAPI = await deleteCidadesServico(codigo);
                setAlerta({ 
                    status: retornoAPI.status, 
                    message: retornoAPI.message })
                    recuperaCidades()
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
        recuperaCidades();
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

export default WithAuth(Cidades);