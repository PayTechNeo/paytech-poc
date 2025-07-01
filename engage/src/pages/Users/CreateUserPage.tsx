import React from 'react';
import { useParams } from 'react-router-dom';

const CreateUserPage: React.FC = () => {
  const { id } = useParams();
  const isEditing = !!id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? 'Edit User' : 'Create New User'}
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          {isEditing ? 'Edit user form will go here.' : 'Create user form will go here.'}
        </p>
      </div>
    </div>
  );
};

export default CreateUserPage; 