import React from 'react';
import AdminSidebar from '../features/admin/AdminSidebar';
import AdminDashboard from '../features/admin/AdminDashboard';
import AdminHeader from '../features/admin/AdminHeader';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="admin-page">
      <AdminHeader />
      <div className="admin-content">
        <AdminSidebar />
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
