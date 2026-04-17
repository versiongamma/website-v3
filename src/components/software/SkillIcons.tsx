type Props = {
  icons: string;
};

export const SkillIcons = ({ icons }: Props) => {
  return (
    <img
      className="h-10"
      src={`https://skillicons.dev/icons?i=${icons}`}
      alt={icons}
    />
  );
};
