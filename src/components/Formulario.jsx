import React, { useEffect, useState } from "react";

const Formulario = () => {
  const elementoInicial =
    JSON.parse(localStorage.getItem("elementosenviados")) || {};

  const [gasto, setGasto] = useState("");
  const [monto, setMonto] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [elementosEnviados, setElementosEnviados] = useState(elementoInicial);
  const [editandoIndex, setEditandoIndex] = useState(null);

  const opcionesFormaPago = ["Efectivo", "Tarjeta de crédito", "Mercado Pago"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoElemento = {
      gasto,
      monto,
      formaPago,
    };

    if (editandoIndex !== null) {
      const nuevosElementos = { ...elementosEnviados };
      nuevosElementos[editandoIndex] = nuevoElemento;
      setElementosEnviados(nuevosElementos);
      setEditandoIndex(null);
    } else {
      setElementosEnviados((prevElementos) => ({
        ...prevElementos,
        [Date.now()]: nuevoElemento,
      }));
    }

    setGasto("");
    setMonto("");
    setFormaPago("");
  };

  const handleEditar = (index) => {
    const elementoEditado = elementosEnviados[index];
    if (elementoEditado) {
      setGasto(elementoEditado.gasto || "");
      setMonto(elementoEditado.monto || "");
      setFormaPago(elementoEditado.formaPago || "");
      setEditandoIndex(index);
    }
  };

  const handleEliminar = (index) => {
    const nuevosElementos = { ...elementosEnviados };
    delete nuevosElementos[index];
    setElementosEnviados(nuevosElementos);
  };

  const totalMonto = Object.values(elementosEnviados).reduce(
    (total, elemento) => total + parseFloat(elemento.monto || 0),
    0
  );

  useEffect(() => {
    localStorage.setItem(
      "elementosenviados",
      JSON.stringify(elementosEnviados)
    );
  }, [elementosEnviados]);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Gasto"
          value={gasto}
          onChange={(e) => setGasto(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <label>
          <select
            className="input"
            value={formaPago}
            onChange={(e) => setFormaPago(e.target.value)}
          >
            <option value="">Seleccionar forma de pago</option>
            {opcionesFormaPago.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </label>
        <input
          className="submit-enviar"
          type="submit"
          value={editandoIndex !== null ? "Guardar cambios" : "Enviar"}
        />
      </form>

      {Object.keys(elementosEnviados).length > 0 && (
        <div>
          <h2>Gastos realizados:</h2>
          <ul>
            {Object.entries(elementosEnviados).map(([key, elemento], index) => (
              <div key={key} className="gasto">
                <ul className="gasto-lista">
                  <li>Gasto: {elemento.gasto}</li>
                  <li>Monto: $ {elemento.monto}</li>
                  <li>Forma de pago: {elemento.formaPago}</li>
                  <button className="submit" onClick={() => handleEditar(key)}>
                    Editar
                  </button>
                  <button
                    className="submit-eliminar"
                    onClick={() => handleEliminar(key)}
                  >
                    Eliminar
                  </button>
                </ul>
              </div>
            ))}
          </ul>

          {/* Mostrar la suma total de los montos */}
          <h3>Total gastado: $ {totalMonto.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Formulario;
