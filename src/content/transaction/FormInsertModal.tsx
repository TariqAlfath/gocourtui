import { Modal } from '@mui/material';
import React, { useState } from 'react';

interface FormInsertModalProps {
  onClose: () => void;
  insertModal: boolean;
  setInsertModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormInsertModal: React.FC<FormInsertModalProps> = ({
  onClose,
  insertModal,
  setInsertModal
}) => {
  const [formData, setFormData] = useState({
    // Add your form fields here
    firstName: '',
    lastName: '',
    email: ''
    // ...
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    onClose();
  };

  return (
    <Modal open={insertModal} onClose={onClose}>
      <div>
        <h2>Insert Data</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  );
};

export default FormInsertModal;
