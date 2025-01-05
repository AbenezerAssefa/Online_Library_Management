import React from 'react';
import AdminSidebar from '../features/admin/AdminSidebar';
import AdminUserList from '../features/admin/AdminUserList';
import AdminHeader from '../features/admin/AdminHeader';

const AdminUserManagement: React.FC = () => {
  return (
    <div className="admin-page">
      <AdminHeader />
      <div className="admin-content">
        <AdminSidebar />
        <AdminUserList />
      </div>
    </div>
  );
};

export default AdminUserManagement;
