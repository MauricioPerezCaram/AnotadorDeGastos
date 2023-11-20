import React, { useState } from "react";

const Formulario = () => {
  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [monto, setMonto] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [elementosEnviados, setElementosEnviados] = useState([]);
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
      setElementosEnviados([...elementosEnviados, nuevoElemento]);
    }

    setCliente("");
    setServicio("");
    setMonto("");
    setFormaPago("");
  };

  const handleEditar = (index) => {
    const elementoEditado = elementosEnviados[index];
    setCliente(elementoEditado.cliente);
    setServicio(elementoEditado.servicio);
    setMonto(elementoEditado.monto);
    setFormaPago(elementoEditado.formaPago);
    setEditandoIndex(index);
  };

  const handleEliminar = (index) => {
    const nuevosElementos = [...elementosEnviados];
    nuevosElementos.splice(index, 1);
    setElementosEnviados(nuevosElementos);
  };

  // Calcular la suma total de los montos
  const totalMonto = elementosEnviados.reduce(
    (total, elemento) => total + parseFloat(elemento.monto),
    0
  );

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

      {elementosEnviados.length > 0 && (
        <div>
          <h2>Listado de clientes:</h2>
          <ul>
            {elementosEnviados.map((elemento, index) => (
              <li key={index}>
                Cliente: {elemento.cliente}, Servicio: {elemento.servicio},
                Monto: {elemento.monto}, Forma de pago: {elemento.formaPago}
                <button onClick={() => handleEditar(index)}>Editar</button>
                <button onClick={() => handleEliminar(index)}>Eliminar</button>
              </li>
            ))}
          </ul>

          {/* Mostrar la suma total de los montos */}
          <p>Total: {totalMonto.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Formulario;
