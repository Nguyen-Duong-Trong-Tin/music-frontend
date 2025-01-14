import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { Col, Row } from "antd";

import GoBack from "../../components/goBack";
import BoxHead from "../../components/boxHead";
import ItemSearchSong from "./components/itemSearchSong";

import ISong from "../../interfaces/song";

import songService from "../../services/song";

function SearchSong() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");

  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (search === null) {
          toast.error("Nhập từ khóa tìm kiếm!");
          return;
        }

        const songs = (await songService.search(search)).data.data;
        setSongs(songs);
      } catch {
        toast.error("Có lỗi xảy ra!");
      }
    }
    fetchApi();
  }, [search]);

  console.log(songs);

  return (
    <>
      <GoBack />

      <BoxHead title="Kết Quả Tìm Kiếm" />

      {search && <BoxHead title={`Từ Khóa: ${search}`} />}

      {songs.length && (
        <Row>
          {songs.map((song, index) => (
            <Col key={index} span={12}>
              <ItemSearchSong song={song} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default SearchSong;