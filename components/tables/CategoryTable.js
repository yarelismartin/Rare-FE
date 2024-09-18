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
          <th>Categories</th>
        </tr>
      </thead>
      <tbody>
        {category.map((cat) => (
          <tr>
            <td>{cat.label}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
