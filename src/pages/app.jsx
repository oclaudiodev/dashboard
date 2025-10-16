import React, { useEffect, useState } from "react";
import GraficoAgendamentos from "../components/graficoAgendamentos";
import GraficoInscricoes from "../components/graficoInscricoes";
import Cabecalho from "../components/cabecalho";
import "./app.scss";

export default function App() {
  const [dadosAgendamentos, setDadosAgendamentos] = useState([]);

  useEffect(() => {
    async function fetchDados() {
      try {
        const response = await fetch(
          "https://api.vestibular-insf.com.br/api/appointments/count-by-date?password=r%26p0rts"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();

        // Ordenar por data (opcional)
        data.sort(
          (a, b) =>
            new Date(a.date.split("/").reverse().join("-")) -
            new Date(b.date.split("/").reverse().join("-"))
        );

        setDadosAgendamentos(data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchDados();
  }, []);

  return (
    <div className="app">
      <Cabecalho />
      <h1>Dashboard de Agendamentos</h1>

      <div className="agendamento" style={{ textAlign: "center", padding: "30px" }}>
        {/* Passa os dados para o gráfico */}
        <GraficoAgendamentos dados={dadosAgendamentos} />

        {/* Lista dos agendamentos */}
        <div className="lista-container">
          <div className="lista-scroll">
            {dadosAgendamentos.length === 0 ? (
              <p>Carregando dados...</p>
            ) : (
              dadosAgendamentos.map((item, index) => (
                <div key={index} className="item">
                  {item.date} — Agendamentos: {item.totalAgendamentos}
                </div>
              ))
            )}
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
