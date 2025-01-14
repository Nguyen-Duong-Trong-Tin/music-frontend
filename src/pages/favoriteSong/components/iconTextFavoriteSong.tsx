import { IconType } from "react-icons";

interface props {
  Icon: IconType;
  content: string | number;
}

function IconTextFavoriteSong({
  Icon,
  content
}: props) {
  return (
    <h4 style={{ display: "flex", alignItems: "center" }}>
      <Icon style={{ marginRight: "5px" }} />
      {content}
    </h4>
  );
}

export default IconTextFavoriteSong;