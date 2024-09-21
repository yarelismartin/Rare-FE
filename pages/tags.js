import React, { useEffect, useState } from 'react';
import TagTable from '../components/tables/TagTable';
import { getAllTags } from '../api/tagData';
import TagForm from '../components/forms/TagForm';

export default function TagManager() {
  const [tags, setTags] = useState([]);

  const updateTags = () => {
    getAllTags().then(setTags);
  };

  useEffect(() => {
    updateTags();
  }, []);

  return (
    <div className="mt-5 mb-5">
      <h2 className="display-1 mb-4 font-thin text-5xl">Tag Manager</h2>
      <TagTable tags={tags || []} />
      <TagForm onUpdate={updateTags} />
    </div>
  );
}
