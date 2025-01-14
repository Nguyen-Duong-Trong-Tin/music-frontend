import { IconType } from "react-icons";

function IconTextSong({ Icon, content, iconColor }: {
  Icon: IconType;
  content: string | number;
  iconColor?: string;
}) {
  return (
    <h4 style={{ display: "flex", alignItems: "center", marginRight: "5px" }}>
      <Icon style={{ marginRight: "5px", color: iconColor }} />
      {content}
    </h4>
  );
}

export default IconTextSong;