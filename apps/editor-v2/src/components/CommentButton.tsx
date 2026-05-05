interface Props {
  commentCount: number;
  active: boolean;
  onClick: () => void;
}

export function CommentButton({ commentCount, active, onClick }: Props) {
  const disabled = commentCount === 0;
  const title = disabled
    ? 'No comments yet'
    : active
      ? 'Hide comments'
      : 'Show comments';

  return (
    <button
      className={`ed-btn ed-btn--icon ed-btn--comment${active ? ' ed-btn--icon-active' : ''}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span
        data-testid="comment-badge"
        className={`ed-comment-badge${commentCount === 0 ? ' ed-comment-badge--grey' : ' ed-comment-badge--yellow'}`}
        aria-hidden="true"
      >
        {commentCount}
      </span>
    </button>
  );
}
