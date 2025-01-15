import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { FaPerson } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { CiMusicNote1 } from "react-icons/ci";
import { FaAssistiveListeningSystems } from "react-icons/fa";

// "@ts-expect-error"
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";

import { Col, Image, Row } from "antd";

import BoxHead from "../../components/boxHead";

import ISong from "../../interfaces/song";
import IUser from "../../interfaces/user";
import ITopic from "../../interfaces/topic";

import songService from "../../services/song";
import userService from "../../services/user";
import topicService from "../../services/topic";

import formatDate from "../../helpers/formatDate";

import GoBack from "../../components/goBack";
import ButtonLikeSong from "./components/buttonLikeSong";
import IconTextSong from "./components/iconTextSong";
import BoxDescriptionSong from "./components/boxDescriptionSong";
import ButtonLoveSong from "./components/buttonLoveSong";

function SongDetail() {
  const { slug } = useParams();

  const [song, setSong] = useState<ISong>();
  const [singer, setSinger] = useState<IUser>();
  const [topic, setTopic] = useState<ITopic>();

  /*
    Must do:
      1. Do autoplay
      2. Image left spin
      3. Thống kê số lượt nghe bài hát
  */
  const initAplayer = (song: ISong, singer: IUser) => {
    const aplayer = document.querySelector("#aplayer");

    if (!aplayer) {
      return null;
    }

    return new APlayer({
      container: document.querySelector("#aplayer"),
      lrcType: 1,
      audio: [
        {
          name: song.title,
          artist: singer.fullName,
          url: song.audio,
          cover: song.avatar,
          lrc: song.lyrics
        },
      ],
    });
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        // get song
        const song = (await songService.getBySlug(slug as string)).data.data;

        // get singer
        const singer = (await userService.getById(song.singerId as string)).data.data;

        // get topic
        const topic = (await topicService.getById(song.topicId as string)).data.data;
        song.topicId = topic as ITopic;

        // init aplayer
        initAplayer(song, singer);

        setSong(song);
        setSinger(singer);
        setTopic(topic);
      } catch {
        toast.error("Có lỗi xảy ra!");
      }
    }
    fetchApi();
  }, [slug]);

  return (
    <>
      <GoBack />

      {(song && singer && topic) && (
        <>
          <BoxHead title={song.title} />

          <Row gutter={32} style={{ marginTop: "30px" }}>
            <Col span={4}>
              <IconTextSong Icon={IoMdTime} content={formatDate.getDayMonthYear(song.createdAt)} />
            </Col>
            <Col span={4}>
              <IconTextSong Icon={FaPerson} content={singer.fullName} />
            </Col>
            <Col span={4}>
              <IconTextSong Icon={CiMusicNote1} content={topic.title} />
            </Col>
            <Col span={4}>
              <IconTextSong Icon={FaAssistiveListeningSystems} content={song.listen} />
            </Col>
            <Col span={4}>
              <ButtonLikeSong songId={song._id} />
            </Col>
            <Col span={4}>
              <ButtonLoveSong songId={song._id} />
            </Col>
          </Row>

          <Row gutter={32} style={{ marginTop: "30px", display: "flex", alignItems: "center" }}>
            <Col span={4}>
              <Image
                src={song.avatar}
                style={{ borderRadius: "50%" }}
              />
            </Col>
            <Col span={20}>
              <div id="aplayer"></div>
            </Col>
          </Row>

          <BoxDescriptionSong title="Mô tả" description={song.description} />
          <BoxDescriptionSong title="Lời bài hát" description={song.lyrics} />
        </>
      )}
    </>
  );
}

export default SongDetail;