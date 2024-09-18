import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import getAllCategories from '../../api/categoryData';

export default function CategoryTable() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategories().then(setCategory);
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
        {category.map((cat) => (
          <tr>
            <td>{cat.id}</td>
            <td>{cat.label}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
