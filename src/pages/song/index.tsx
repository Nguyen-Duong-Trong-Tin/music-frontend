import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Col, Row } from "antd";

import GoBack from "../../components/goBack";
import BoxHead from "../../components/boxHead";
import ItemSong from "./components/itemSong";

import ISong from "../../interfaces/song";
import IUser from "../../interfaces/user";
import ITopic from "../../interfaces/topic";

import songService from "../../services/song";
import userService from "../../services/user";
import topicService from "../../services/topic";

function Song() {
  const { topicSlug } = useParams();

  const [topic, setTopic] = useState<ITopic>();
  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        // get topic
        const topic = (await topicService.getBySlug(topicSlug as string)).data.data;

        // get songs
        const songs = (await songService.getByTopicSlug(topicSlug as string)).data.data;

        // get singers
        for (const song of songs) {
          const singer = (await userService.getById(song.singerId as string)).data.data;
          song.singerId = singer as IUser;
        }

        setTopic(topic);
        setSongs(songs);
      } catch {
        toast.error("Có lỗi xảy ra!");
      }
    }
    fetchApi();
  }, [topicSlug]);

  return (
    <>
      <GoBack />

      <BoxHead title="Danh Sách Bài Hát" />

      {topic && <BoxHead title={`Chủ Đề: ${topic.title}`} />}

      {songs.length && (
        <Row>
          {songs.map((song, index) => (
            <Col key={index} span={12}>
              <ItemSong song={song} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default Song;