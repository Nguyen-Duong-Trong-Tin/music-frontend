import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiFillLike } from "react-icons/ai";

import { Button } from "antd";

import IUser from "../../../interfaces/user";
import ISong from "../../../interfaces/song";

import userService from "../../../services/user";
import songService from "../../../services/song";

interface props {
  songId: string;
}

function ButtonLikeSong({ songId }: props) {
  const [me, setMe] = useState<IUser>();
  const [song, setSong] = useState<ISong>();

  useEffect(() => {
    const fetchApi = async () => {
      // get is like
      const song = (await songService.getById(songId)).data.data;
      setSong(song);

      // get me
      const me = (await userService.getMe()).data.data;
      setMe(me);
    }
    fetchApi();
  }, [songId]);

  const handleClick = async () => {
    try {
      if (!me) {
        toast.error("Bạn cần đăng nhập");
        return;
      }

      const response = await songService.updateLike(songId);
      setSong(response.data.data);
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  }

  return (
    <Button onClick={handleClick}>
      {song && (
        <h3 style={{
          display: "flex",
          alignItems: "center",
          marginRight: "5px",
          color: (me && song.like.includes(me._id)) ? "blue" : "black"
        }}>
          <AiFillLike
            style={{ marginRight: "5px", fontWeight: "bold" }}
          />
          {song.like.length}
        </h3>
      )}
    </Button>
  );
}

export default ButtonLikeSong;