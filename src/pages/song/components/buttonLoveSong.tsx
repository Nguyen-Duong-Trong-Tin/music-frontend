import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

import { Button } from "antd";

import IUser from "../../../interfaces/user";

import userService from "../../../services/user";
import favoriteSongService from "../../../services/favoriteSong";
import IFavoriteSong from "../../../interfaces/favoriteSong";

interface props {
  songId: string
};

function ButtonLoveSong({ songId }: props) {
  const [me, setMe] = useState<IUser>();
  const [favoriteSong, setFavoriteSong] = useState<IFavoriteSong>();

  useEffect(() => {
    const fetchApi = async () => {
      // get favorite song
      const favoriteSong = (await favoriteSongService.getBySongId(songId)).data.data;
      setFavoriteSong(favoriteSong);

      // get me
      const me = (await userService.getMe()).data.data;
      setMe(me);
    }
    fetchApi();
  }, [songId]);

  const handleClick = async () => {
    try {
      if (!me) {
        toast.error("Bạn cần đăng nhập!");
        return;
      }

      const newFavoriteSong = (await favoriteSongService.update(songId)).data.data;
      setFavoriteSong(newFavoriteSong);
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  }

  return (
    <Button onClick={handleClick}>
      <h3 style={{
        display: "flex",
        alignItems: "center",
        color: favoriteSong ? "red" : "black"
      }}>
        <FaHeart
          style={{ fontWeight: "bold" }}
        />
      </h3>
    </Button>
  );
}

export default ButtonLoveSong;