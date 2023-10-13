import { useState, useEffect } from 'react';
import CategoriaContext from './PaisContext';
import {
     getPaisServicoPorCodigoAPI, cadastraPaisServico, getPaisServico, deletePaisServico
} from '../../../servicos/PaisServico';
import Tabela from './Tabela';
import Form from './Form';
import WithAuth from '../../../seguranca/WithAuth';
import { useNavigate } from 'react-router-dom/dist';

function Pais() {

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
        setObjeto(await getPaisServicoPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPaisServico(objeto, metodo);
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
        recuperaPais();
    }

    const recuperaPais = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getPaisServico());
            setCarregando(false);

        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }

    }

    const remover = async codigo => {
        try {
            if (window.confirm('Deseja remover este objeto?')) {
                let retornoAPI = await deletePaisServico(codigo);
                setAlerta({ 
                    status: retornoAPI.status, 
                    message: retornoAPI.message })
                    recuperaPais()
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
        recuperaPais();
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

export default WithAuth(Pais);