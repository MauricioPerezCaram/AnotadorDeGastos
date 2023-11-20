import React, { useEffect, useState } from "react";

const Formulario = () => {
  const elementoInicial =
    JSON.parse(localStorage.getItem("elementosenviados")) || {};

  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [monto, setMonto] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [elementosEnviados, setElementosEnviados] = useState(elementoInicial);
  const [editandoIndex, setEditandoIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoElemento = {
      cliente,
      servicio,
      monto,
      formaPago,
    };

    if (editandoIndex !== null) {
      const nuevosElementos = [...elementosEnviados];
      nuevosElementos[editandoIndex] = nuevoElemento;
      setElementosEnviados(nuevosElementos);
      setEditandoIndex(null);
    } else {
      setElementosEnviados({
        ...elementosEnviados,
        [Date.now()]: nuevoElemento,
      });
    }

    setCliente("");
    setServicio("");
    setMonto("");
    setFormaPago("");
  };

  const handleEditar = (index) => {
    const elementosArray = Object.values(elementosEnviados);
    const elementoEditado = elementosArray[index];
    setCliente(elementoEditado.cliente);
    setServicio(elementoEditado.servicio);
    setMonto(elementoEditado.monto);
    setFormaPago(elementoEditado.formaPago);
    setEditandoIndex(index);
  };

  const handleEliminar = (index) => {
    const nuevosElementos = { ...elementosEnviados };
    delete nuevosElementos[index];
    setElementosEnviados(nuevosElementos);
  };

  // Calcular la suma total de los montos
  const totalMonto = Object.values(elementosEnviados).reduce(
    (total, elemento) => total + parseFloat(elemento.monto),
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
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Servicio"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Forma de pago"
          value={formaPago}
          onChange={(e) => setFormaPago(e.target.value)}
        />
        <input
          className="submit"
          type="submit"
          value={editandoIndex !== null ? "Guardar cambios" : "Enviar"}
        />
      </form>

      {Object.keys(elementosEnviados).length > 0 && (
        <div>
          <h2>Trabajos realizados:</h2>
          <ul>
            {Object.entries(elementosEnviados).map(([key, elemento], index) => (
              <div key={key}>
                <li>Cliente: {elemento.cliente}</li>
                <li>Servicio: {elemento.servicio}</li>
                <li>Monto: $ {elemento.monto}</li>
                <li>Forma de pago: {elemento.formaPago}</li>
                <button className="submit" onClick={() => handleEditar(key)}>
                  Editar
                </button>
                <button className="submit" onClick={() => handleEliminar(key)}>
                  Eliminar
                </button>
              </div>
            ))}
          </ul>

          {/* Mostrar la suma total de los montos */}
          <h3>Total: $ {totalMonto.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Formulario;
