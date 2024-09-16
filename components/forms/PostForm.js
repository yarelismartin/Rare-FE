// import React, { useState } from 'react';
// import { Form } from 'react-bootstrap';

// const nullPost = {
//   title: '',
//   content: '',
//   imageURL: '',
// };

// export default function PostForm({ postObj }) {
//   const [formDate, setFormData] = useState(nullPost);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (postObj?.id) {
//       console.warn('update');
//     } else {

//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>

//       <Form.Group>
//         <Form.Label> Title of Post</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter a title..."
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group>
//         <Form.Label> Article Content</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="What do you have to share..."
//           name="content"
//           value={formData.content}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group>
//         <Form.Label> Image URL</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Image"
//           name="imageURL"
//           value={formData.imageURL}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <label htmlFor="tags">Tags</label>
//       <select id="tags" name="tags" multiple>
//         {tags.map((tag) => (
//           <option key={tag.id} value={tag.id}>
//             {tag.label}
//           </option>
//         ))}
//       </select>

//     </Form>
//   );
// }
import React from 'react';

export default function PostForm() {
  return (
    <div>
      <p>test</p>
    </div>
  );
}
