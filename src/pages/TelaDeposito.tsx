import { /*Link,*/ useNavigate } from "react-router-dom";
import Card from '../components/Card'
import { useContext, useEffect } from "react";
import axios from "axios";
import { ValoresDaConta } from "../contexts/assessment-context";
import "../styles/TelaDeposito.css"
 
export function TelaDeposito() {
    
  const  { setName, setAgency, setConta, setSaldo, setTotal, valor2, valor5, valor10, valor20, valor50, valor100, valor200, total, api, name, agency, account, current_balance} = useContext(ValoresDaConta)

  const requestApi = async () => {
     const response = await axios.get( api )
     setName(response.data.name)
     setAgency(response.data.agency) 
     setConta(response.data.account)
     setSaldo(response.data.current_balance)
  }
  const navigate = useNavigate()

  const voltar = () => {
    navigate("/home")
  }

  const depositar = () => {
    setTotal (valor2 + valor5 + valor10  + valor20 + valor50 + valor100 + valor200)
    setSaldo(current_balance + total)
  }

   useEffect(() => {
      requestApi()
   }, [])

    return (
        <div className="TelaInicial">
      <header className="Header">
        <div>
          <img src="src/img/image.webp" className='centro-imagem'/>
        </div>
        <div className="box-dados-conta">
          <h2 className="dados-conta">
            Nome: {name}<br/>
            Agência: {agency}<br/>
            Conta: {account}
          </h2>
        </div>
      </header>
    
      <div className="janela-acoes">
        <div className="container-botoes-saldo">

          <div className="box-saldo">
            <div className="oq-fazer">
              <h2>O que deseja fazer?</h2>
            </div>
            <div className="saldo-box">
              <h2 className="saldo">Saldo atual: R$ {current_balance}</h2>
            </div>
          </div>
            <div className="Texto-Cedulas">
                <div className="TextoGuia">
                    Selecione as cédulas e a quantidade que você deseja.
                </div>
                <div className="box-cedulas">
                    <div className="box-cedulas-cima">
                        <Card nota={2}/>
                        <Card nota={5}/>
                        <Card nota={10}/>
                        <Card nota={20}/>
                    </div>
                    <br/>
                    <div className="box-cedulas-baixo">
                        <Card nota={50}/>
                        <Card nota={100}/>
                        <Card nota={200}/>
                    </div>
            </div>
            </div>
            <div className="bottom">
              <button className="botao-voltar" onClick={voltar}>Voltar</button>
              <button className="botao-voltar" onClick={depositar}>Depositar</button>
            </div>
          </div>
        </div>
      </div>
    )
}

