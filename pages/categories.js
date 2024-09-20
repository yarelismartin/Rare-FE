import React from 'react';
import CategoryTable from '../components/tables/CategoryTable';

export default function CategoryManager() {
  return (
    <div className="mt-5 mb-5">
      <h2 className="display-1 mb-4 font-thin text-5xl">Category Manager</h2>
      <CategoryTable />
    </div>
  );
}
