import { useNavigate } from "react-router-dom";

import { AiOutlineLike } from "react-icons/ai";
import { FaPerson } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";

import { Button, Card } from "antd";

import IconTextSearchSong from "./iconTextSearchSong";

import ISong from "../../../interfaces/song";
import IUser from "../../../interfaces/user";

import formatDate from "../../../helpers/formatDate";

interface props {
  song: ISong
};

function ItemSearchSong({ song }: props) {
  const singer = song.singerId as IUser;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/songs/detail/${song.slug}`);
  }

  return (
    <Card
      hoverable
      style={{ marginTop: "30px", marginLeft: "30px", display: "flex" }}
      cover={<img alt={song.title} src={song.avatar} />}
    >
      <h3>{song.title}</h3>
      <IconTextSearchSong Icon={FaPerson} content={singer.fullName} />
      <IconTextSearchSong Icon={AiOutlineLike} content={song.like.length} />
      <IconTextSearchSong Icon={IoMdTime} content={formatDate.getDayMonthYear(song.createdAt)} />

      <Button
        type="primary"
        style={{
          width: "100px",
          marginTop: "30px"
        }}
        onClick={handleNavigate}
      >
        Nghe
      </Button>
    </Card>
  );
}

export default ItemSearchSong;