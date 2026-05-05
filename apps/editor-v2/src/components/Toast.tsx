interface Props {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: Props) {
  return (
    <div className={`ed-toast${visible ? ' ed-toast--visible' : ''}`}>
      {message}
    </div>
  );
}
