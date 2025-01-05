import React from 'react';
import AdminHeader from '../features/admin/AdminHeader';
import AdminSidebar from '../features/admin/AdminSidebar';
import AdminSettings from '../features/admin/AdminSettings';

const AdminSettingsPage: React.FC = () => {
  return (
    <div className="admin-page">
      <AdminHeader />
      <div className="admin-content">
        <AdminSidebar />
        <div className="admin-main-content">
          <AdminSettings />
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
