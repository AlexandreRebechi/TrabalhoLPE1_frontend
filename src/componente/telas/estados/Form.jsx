import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import EstadosContext from "./EstadosContext";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(EstadosContext);

    return (
        <Dialogo id="modalEdicao" titulo="Estados" idformulario="formEdicao"
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

            <CampoEntrada id="txtUF" label="UF" tipo="text"
                name="uf" value={objeto.uf}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="uf OK" textoinvalido="Informe o uf"
                maximocaracteres={2} />

            <CampoEntrada id="txtPais" label="Pais" tipo="number"
                name="pais" value={objeto.pais}
                handlechange={handleChange}
                requerido={true} readonly={false}
                maximocaracteres={5} />

        </Dialogo>
    )
}

export default Form;