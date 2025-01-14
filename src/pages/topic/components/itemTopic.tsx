import { useNavigate } from "react-router-dom";

import { Button, Card } from "antd";

import ITopic from "../../../interfaces/topic";

interface props {
  topic: ITopic
};

function ItemTopic({ topic }: props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/songs/${topic.slug}`);
  }

  return (
    <Card
      hoverable
      style={{ marginTop: "30px", marginLeft: "30px", display: "flex" }}
      cover={<img alt={topic.title} src={topic.avatar} />}
    >
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
      <Button
        type="primary"
        style={{
          width: "200px",
          marginTop: "30px"
        }}
        onClick={handleClick}
      >
        Chi tiết
      </Button>
    </Card>
  );
}

export default ItemTopic;