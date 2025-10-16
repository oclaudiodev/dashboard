import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import "./graficoAgendamentos.scss";

export default function GraficoAgendamentos() {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
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

        if (Array.isArray(data)) {
          setDadosAgendamentos(data);
        } else {
          console.error("Formato de dados inesperado:", data);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchDados();
  }, []);

  useEffect(() => {
    if (dadosAgendamentos.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: dadosAgendamentos.map((item) => item.date), // ✅ Corrigido
        datasets: [
          {
            label: "Total de Agendamentos",
            data: dadosAgendamentos.map((item) => item.totalAgendamentos),
            borderColor: "#36a2eb",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: "#36a2eb",
            pointRadius: 4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: false },
        },
        scales: {
          x: {
            ticks: { color: "#555" },
          },
          y: {
            beginAtZero: true,
            ticks: { color: "#555" },
          },
        },
      },
    });
  }, [dadosAgendamentos]);

  return (
    <div className="grafico-container">
      <h2>Agendamentos por Data</h2>
      {dadosAgendamentos.length === 0 ? (
        <p>Carregando dados...</p>
      ) : (
        <canvas ref={canvasRef}></canvas>
      )}
    </div>
  );
}
