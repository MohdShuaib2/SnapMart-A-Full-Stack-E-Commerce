import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const formatJoinedDate = (userItem) => {
    const joinedDate = userItem.createdAt
      ? new Date(userItem.createdAt)
      : new Date(parseInt(userItem._id.substring(0, 8), 16) * 1000);

    return Number.isNaN(joinedDate.getTime()) ? 'N/A' : joinedDate.toLocaleDateString();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/auth/users', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    };
    fetchUsers();
  }, [user]);

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#ea580c', marginBottom: '20px' }}>User Directory</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>EMAIL</th>
              <th style={thStyle}>ROLE</th>
              <th style={thStyle}>JOINED</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={rowStyle}>
                <td style={tdStyle}>{u._id.substring(0, 8)}...</td>
                <td style={tdStyle}>{u.name}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    background: u.role === 'admin' ? '#fff7ed' : '#ecfdf5', 
                    color: u.role === 'admin' ? '#ea580c' : '#059669', 
                    border: `1px solid ${u.role === 'admin' ? '#fdba74' : '#a7f3d0'}`,
                    padding: '4px 10px', 
                    borderRadius: '6px', 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold' 
                  }}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td style={tdStyle}>{formatJoinedDate(u)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const containerStyle = { maxWidth: '1200px', margin: '40px auto', padding: '30px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)', color: '#0f172a' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const rowStyle = { borderBottom: '1px solid #e2e8f0' };
const thStyle = { padding: '15px', textAlign: 'left', color: '#64748b', fontSize: '0.9rem', fontWeight: '600', background: '#f8fafc' };
const tdStyle = { padding: '15px', textAlign: 'left', color: '#0f172a' };

export default AdminUsers;
