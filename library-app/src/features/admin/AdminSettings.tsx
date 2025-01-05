import React, { useState } from 'react';

interface Settings {
  name: string;
}

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({ name: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit settings data to API
    console.log('Settings submitted', settings);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Admin Name:
        <input
          type="text"
          name="name"
          value={settings.name}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Settings</button>
    </form>
  );
};

export default AdminSettings;
