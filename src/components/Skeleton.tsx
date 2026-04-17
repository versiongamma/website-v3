// https://github.com/themesberg/flowbite/blob/main/content/components/skeleton.md

type Props = {
  className?: string;
  children?: React.ReactNode;
  size?: {
    width: number;
    height: number;
  };
};

export const Skeleton = ({ className, children, size }: Props) => {
  return (
    <div
      role="status"
      style={size}
      className={`flex items-center justify-center bg-gray-300 rounded-lg
      animate-pulse dark:bg-gray-700 ${className}`}
    >
      {children ?? null}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
