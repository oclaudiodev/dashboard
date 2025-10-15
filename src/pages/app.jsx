import React from "react";
import GraficoAgendamentos from "../components/graficoAgendamentos";
import GraficoInscricoes from "../components/graficoInscricoes";
import Cabecalho from "../components/cabecalho";
import "./app.scss";


export default function App() {

    const dadosAgendamentos = [
        { _id: '08/10/2025', totalAgendamentos: 1 },
        { _id: '09/10/2025', totalAgendamentos: 3 },
        { _id: '10/10/2025', totalAgendamentos: 7 },
        { _id: '13/10/2025', totalAgendamentos: 28 },
        { _id: '14/10/2025', totalAgendamentos: 55 },
        { _id: '15/10/2025', totalAgendamentos: 120 },
        { _id: '16/10/2025', totalAgendamentos: 54 },
        { _id: '17/10/2025', totalAgendamentos: 70 },
        { _id: '20/10/2025', totalAgendamentos: 53 },
        { _id: '21/10/2025', totalAgendamentos: 37 },
        { _id: '22/10/2025', totalAgendamentos: 28 },
        { _id: '23/10/2025', totalAgendamentos: 29 },
        { _id: '24/10/2025', totalAgendamentos: 43 }
    ];

    return (
        <div className="app">
            <Cabecalho />
            <h1>Dashboard de Agendamentos</h1>
            <div className="agendamento" style={{ textAlign: "center", padding: "30px" }}>
                <GraficoAgendamentos />

                <div className="lista-container">
                    <div className="lista-scroll">
                        {dadosAgendamentos.map((item) => (
                            <div className="item">
                                {item._id} — Agendamentos: {item.totalAgendamentos}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="barra"></div>
            <div style={{ padding: "20px" }}>
                <GraficoInscricoes />
            </div>
        </div>
    );
}
