import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TagTable({ tags }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {tags?.map((t) => (
          <tr key={t.id}>
            <td>{t.label}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

TagTable.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  })).isRequired,
};
