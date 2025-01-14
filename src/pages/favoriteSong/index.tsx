import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Col, Row } from "antd";

import GoBack from "../../components/goBack";
import BoxHead from "../../components/boxHead";
import ItemFavoriteSong from "./components/itemFavoriteSong";

import ISong from "../../interfaces/song";

import userService from "../../services/user";
import favoriteSongService from "../../services/favoriteSong";
import songService from "../../services/song";

function FavoriteSong() {
  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        // get me
        await userService.getMe();

        // favorite songs
        const favoriteSongs = (await favoriteSongService.getByMe()).data.data;

        // get songs
        const songs: ISong[] = [];
        for (const favoriteSong of favoriteSongs) {
          const song = (await songService.getById(favoriteSong.songId)).data.data;
          songs.push(song);
        }

        // get singers
        for (const song of songs) {
          const singer = (await userService.getById(song.singerId as string)).data.data;
          song.singerId = singer;
        }

        setSongs(songs);
      } catch {
        toast.error("Có lỗi xảy ra!");
      }
    }
    fetchApi();
  }, []);

  return (
    <>
      <GoBack />

      <BoxHead title="Danh Sách Bài Hát" />

      {songs.length && (
        <Row>
          {songs.map((song, index) => (
            <Col key={index} span={12}>
              <ItemFavoriteSong song={song} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default FavoriteSong;