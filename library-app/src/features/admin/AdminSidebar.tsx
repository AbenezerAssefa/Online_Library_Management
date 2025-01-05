import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">User Management</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
