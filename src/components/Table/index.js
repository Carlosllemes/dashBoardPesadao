import React from "react";
import { Table } from "react-bootstrap";

export default function TableTask(props) {
  const thead = () => {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th>Analista</th>
          <th>Cliente</th>
          <th>Tipo</th>
        </tr>
      </thead>
    );
  };

  const tbody = (data) => {
    const line = data.map((value, key) => {
      return (
          <tr id={key}>
            <td>{value.id}</td>
            <td>{value.responsible_name}</td>
            <td>{value.project_name}</td>
            <td>{value.type_name}</td>
          </tr>
      );
    });
    return line;
  };

  return (
    <Table striped bordered hover>
      {thead()}
      <tbody>
        {tbody(props.tasks)}
      </tbody>
    </Table>
  );
}
