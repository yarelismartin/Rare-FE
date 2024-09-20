import React from 'react';
import TagTable from '../components/tables/TagTable';

export default function TagManager() {
  return (
    <div className="mt-5 mb-5">
      <h2 className="display-1 mb-4 font-thin text-5xl">Tag Manager</h2>
      <TagTable />
    </div>
  );
}
