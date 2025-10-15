import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import "./graficoInscricoes.scss";

export default function GraficoInscricoes() {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const dados = [
    { _id: { courseName: "Administração", periodName: "Manhã" }, totalInscritos: 32 },
    { _id: { courseName: "Administração", periodName: "Tarde" }, totalInscritos: 49 },
    { _id: { courseName: "Automação Residencial e Robótica", periodName: "Manhã" }, totalInscritos: 4 },
    { _id: { courseName: "Automação Residencial e Robótica", periodName: "Tarde" }, totalInscritos: 5 },
    { _id: { courseName: "Informática", periodName: "Manhã" }, totalInscritos: 31 },
    { _id: { courseName: "Informática", periodName: "Tarde" }, totalInscritos: 49 },
    { _id: { courseName: "Inglês Básico - Pré Intermediário (Diurno)", periodName: "Manhã 1" }, totalInscritos: 30 },
    { _id: { courseName: "Inglês Básico - Pré Intermediário (Diurno)", periodName: "Manhã 2" }, totalInscritos: 20 },
    { _id: { courseName: "Inglês Básico - Pré Intermediário (Diurno)", periodName: "Tarde 1" }, totalInscritos: 51 },
    { _id: { courseName: "Inglês Básico - Pré Intermediário (Diurno)", periodName: "Tarde 2" }, totalInscritos: 24 },
    { _id: { courseName: "Inglês Intermediário (Sábados)", periodName: "Manhã" }, totalInscritos: 93 },
    { _id: { courseName: "Inglês Pré Intermediário (Noturno)", periodName: "Noite" }, totalInscritos: 14 },
  ];

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Agrupar por curso
    const cursos = [...new Set(dados.map(item => item._id.courseName))];

    // Encontrar todos os períodos
    const periodos = [...new Set(dados.map(item => item._id.periodName.trim()))];

    // Criar datasets por período
    const datasets = periodos.map((periodo, i) => ({
      label: periodo,
      data: cursos.map(
        curso =>
          dados.find(d => d._id.courseName === curso && d._id.periodName.trim() === periodo)?.totalInscritos || 0
      ),
      backgroundColor: `hsl(${(i * 60) % 360}, 70%, 55%)`,
      borderRadius: 6,
    }));

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: cursos,
        datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Total de Inscrições por Curso e Período",
            color: "#333",
            font: { size: 18 },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#555",
              font: { size: 12 },
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
    <div className="grafico-inscricoes-container">
      <h2>Inscrições por Curso e Período</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
