import { Avatar } from './Avatar';

interface Props {
  name: string;
  avatarSize?: number;
}

export function IdentityTag({ name, avatarSize = 28 }: Props) {
  return (
    <div className="ed-identity-tag">
      <Avatar name={name} size={avatarSize} />
      <div className="ed-identity-tag__text">
        <span className="ed-identity-tag__label">You are</span>
        <span className="ed-identity-tag__name">{name}</span>
      </div>
    </div>
  );
}
