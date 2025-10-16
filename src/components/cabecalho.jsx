import React from "react";
import "./cabecalho.scss";
import { Link } from "react-router";

function handleDateChange(event) {
  console.log("Data selecionada:", event.target.value);
}

export default function Cabecalho() {

  return (
    <header className="cabecalho">
      <div className="cabecalho__logo">
        <Link to="/">
          <img src="public/image.png" alt="Logo" />
        </Link>
      </div>
    </header>
  );
}
