import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import "./graficoInscricoes.scss";

export default function GraficoInscricoes() {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [dadosApi, setDadosApi] = useState([]);


  useEffect(() => {
    async function carregarDados() {

      const resposta = await fetch(
        "https://api.vestibular-insf.com.br/api/enrollments/count-by-course-period?password=r%26p0rts"
      );
      const dados = await resposta.json();
      setDadosApi(dados);

    }

    carregarDados();
  }, []);


  useEffect(() => {
    if (dadosApi.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");


    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const cursos = [...new Set(dadosApi.map(item => item.courseName.trim()))];
    const periodos = [...new Set(dadosApi.map(item => item.periodName.trim()))];


    const datasets = periodos.map((periodo, i) => ({
      label: periodo,
      data: cursos.map(
        curso =>
          dadosApi.find(
            d =>
              d.courseName.trim() === curso &&
              d.periodName.trim() === periodo
          )?.totalInscritos || 0
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
  }, [dadosApi]);

  return (
    <div className="grafico-inscricoes-container">
      <h2>Inscrições por Curso e Período</h2>
      <canvas ref={canvasRef}></canvas>

      {/* Lista opcional abaixo do gráfico */}
      <div className="lista-cursos">
        <h3>📋 Lista de inscrições</h3>

          <div className="lista">
          {dadosApi.map((item, index) => (
            <div className="cursos" key={index}>
              <strong>{item.courseName}</strong> ({item.periodName}) —{" "}
              {item.totalInscritos} inscritos
            </div>
          ))}
          </div>

      </div>
    </div>
  );
}
