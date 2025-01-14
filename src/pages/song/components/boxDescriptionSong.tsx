import { Card } from "antd";

function BoxDescriptionSong({ title, description }: {
  title: string;
  description: string;
}) {
  return (
    <Card title={title} style={{ marginTop: "30px" }}>
      <p>{description}</p>
    </Card>
  );
}

export default BoxDescriptionSong;