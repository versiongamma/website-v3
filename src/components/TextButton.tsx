type Props = {
  onClick?: () => void;
  disabled?: boolean;
  children?: string;
  href?: string;
};

const style =
  "bg-black/40 p-4 rounded-2xl hover:bg-black/60 hover:cursor-pointer transition-colors";

export const TextButton = ({ onClick, children, disabled, href }: Props) => {
  if (href) {
    return (
      <a href={href} className={style} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
