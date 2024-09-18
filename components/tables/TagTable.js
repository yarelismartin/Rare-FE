import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import getAllTags from '../../api/tagData';

export default function TagTable() {
  const [tag, setTag] = useState([]);

  useEffect(() => {
    getAllTags().then(setTag);
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Label</th>
        </tr>
      </thead>
      <tbody>
        {tag.map((t) => (
          <tr>
            <td>{t.id}</td>
            <td>{t.label}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
