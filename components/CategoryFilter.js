import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import getAllCategories from '../api/categoryData';

export default function CategoryFilter({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Category');

  const handleCategorySelect = (categoryId, categoryLabel) => {
    setSelectedCategory(categoryLabel);
    onCategorySelect(categoryId);
  };

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories([{ id: null, label: 'All' }, ...data]);
    });
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {selectedCategory}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {categories.map((cat) => (
          <Dropdown.Item
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id, cat.label)}
          >
            {cat.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

CategoryFilter.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};
