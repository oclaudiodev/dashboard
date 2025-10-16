import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import "./graficoAgendamentos.scss";


export default function GraficoAgendamentos() {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

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

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: dadosAgendamentos.map(item => item._id),
        datasets: [
          {
            label: "Total de Agendamentos",
            data: dadosAgendamentos.map(item => item.totalAgendamentos),
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
          legend: {
            position: "top",
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#555",
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "#555",
            },
          },
        },
      },
    });
  }, []);

  return (
    <div className="grafico-container">
      <h2>Agendamentos por Data</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
