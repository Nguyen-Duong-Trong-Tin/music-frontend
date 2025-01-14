import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Col, Row } from "antd";

import BoxHead from "../../components/boxHead";

import ItemTopic from "./components/itemTopic";

import ITopic from "../../interfaces/topic";

import topicService from "../../services/topic";

function Topic() {
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const topics = (await topicService.get()).data.data;

        setTopics(topics);
      } catch {
        toast.error("Có lỗi xảy ra!");
      }
    }
    fetchApi();
  }, []);

  return (
    <>
      <BoxHead title="Danh Sách Chủ Đề" />

      {topics.length && (
        <Row>
          {topics.map((topic, index) => (
            <Col key={index} span={12} >
              <ItemTopic topic={topic} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default Topic;