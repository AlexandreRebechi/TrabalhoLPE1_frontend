import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import CidadesContext from "./CidadesContext";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(CidadesContext);

    return (
        <Dialogo id="modalEdicao" titulo="Cidades" idformulario="formEdicao"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.codigo}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
                
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome" value={objeto.nome}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Nome OK" textoinvalido="Informe o nome"
                maximocaracteres={40} />

            <CampoEntrada id="txtEstados" label="Estados" tipo="number"
                name="estado" value={objeto.estado}
                handlechange={handleChange}
                requerido={true} readonly={false}
                maximocaracteres={5} />

        </Dialogo>
    )
}

export default Form;