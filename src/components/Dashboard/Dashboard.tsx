import React from 'react';
import useAuth from '../../contexts/auth/useAuth/useAuth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <div>
      Hello {user.name}
      <button onClick={() => signOut()}> asd </button>
    </div>
  );
};

export default Dashboard;
