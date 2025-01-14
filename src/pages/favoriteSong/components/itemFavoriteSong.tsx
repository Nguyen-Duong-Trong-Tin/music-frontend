import { useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";

import { Button, Card } from "antd";

import IconTextFavoriteSong from "./iconTextFavoriteSong";

import ISong from "../../../interfaces/song";
import IUser from "../../../interfaces/user";

import formatDate from "../../../helpers/formatDate";

interface props {
  song: ISong
};

function ItemFavoriteSong({ song }: props) {
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
      <IconTextFavoriteSong Icon={FaPerson} content={singer.fullName} />
      <IconTextFavoriteSong Icon={FaHeart} content={"Yêu thích"} />
      <IconTextFavoriteSong Icon={IoMdTime} content={formatDate.getDayMonthYear(song.createdAt)} />

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

export default ItemFavoriteSong;