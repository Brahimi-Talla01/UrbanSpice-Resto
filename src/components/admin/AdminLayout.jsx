import React from 'react'

const AdminLayout = ({ children }) => {
  return (
      <div className="min-h-screen w-full bg-white">
            {children}
      </div>
  )
}

export default AdminLayout;
