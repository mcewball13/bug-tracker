import useAuth from '../hooks/useAuth';

import createAvatar from '../utils/createAvatar';

import Avatar, { Props as AvatarProps } from './Avatar';

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.photoURL}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
