import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import getAllCategories from '../api/categoryData';

export default function CategoryFilter({ onCategorySelect }) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategories().then(setCategory);
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Category
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {category.map((cat) => (
          <Dropdown.Item
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
          >
            {cat.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

CategoryFilter.propTypes = {
  onCategorySelect: PropTypes.isRequired,
};
