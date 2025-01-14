import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPerson } from "react-icons/fa6";

import { Card, Input } from "antd";
const { Search } = Input;

import IconTextInputSearchSong from "./iconTextInputSearchSong";

import ISong from "../../interfaces/song";

import songService from "../../services/song";

import "./inputSearchSong.css";
import userService from "../../services/user";
import IUser from "../../interfaces/user";

function InputSearchSong() {
  const navigate = useNavigate();

  const [songs, setSongs] = useState<ISong[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (search === "") {
          setSongs([]);
          return;
        }

        // get songs
        const songs = (await songService.search(search)).data.data;

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
  }, [search]);

  const handleSearch = (value: string) => {
    if (!value) {
      return;
    }

    navigate(`/search-songs?search=${value}`);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleClickItem = (slug: string) => {
    navigate(`/songs/detail/${slug}`);
  }

  return (
    <>
      <div className="box-search">
        <Search
          placeholder="Tìm bài hát"
          allowClear
          enterButton="Search"
          size="large"
          onChange={handleChange}
          onSearch={handleSearch}
        />

        <div className="box-suggest-songs show">
          {!songs.length ? <></> : (
            songs.map((song, index) => {
              const singer = song.singerId as IUser;

              return (
                <Card
                  key={index}
                  hoverable
                  style={{ display: "flex" }}
                  cover={<img alt={song.title} src={song.avatar} width={"100px"} height={"100px"} />}
                  onClick={() => handleClickItem(song.slug)}
                >
                  <h3>{song.title}</h3>
                  <IconTextInputSearchSong Icon={FaPerson} content={singer.fullName} />
                </Card>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default InputSearchSong;