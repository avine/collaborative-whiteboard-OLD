import React, { useEffect, useState } from 'react';

import { UserProfile } from '../../../../../../back/src/router/user/user.types';
import { getUserProfile } from '../../../services/user';

const UserProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    getUserProfile().then(({ data }) => setUserProfile(data));
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <pre style={{ margin: 'auto', textAlign: 'left' }}>
        {JSON.stringify(userProfile, undefined, 4)}
      </pre>
    </div>
  );
};

export default UserProfilePage;
