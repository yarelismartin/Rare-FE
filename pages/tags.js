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
    <>
      <h1 className="display-1 mb-4">Tag Manager</h1>
      <TagTable tags={tags || []} />
      <TagForm onUpdate={updateTags} />
    </>
  );
}
