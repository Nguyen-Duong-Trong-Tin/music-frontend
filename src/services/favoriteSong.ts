import IFavoriteSong from "../interfaces/favoriteSong";
import IResponse from "../interfaces/response";

import request from "../utils/request";

const getByMe = async () => {
  const favoriteSongs = await request.get<IResponse<IFavoriteSong[]>>(`/favorite-songs/get/me`);
  return favoriteSongs;
}

const getBySongId = async (songId: string) => {
  const favoriteSong = await request.get<IResponse<IFavoriteSong>>(`/favorite-songs/get/song-id/${songId}`);
  return favoriteSong;
}

const update = async (songId: string) => {
  const newFavoriteSong = await request.patch<IResponse<IFavoriteSong>>(`/favorite-songs/update/song-id/${songId}`, {});
  return newFavoriteSong;
}

const favoriteSongService = {
  getByMe,
  getBySongId,
  update
};
export default favoriteSongService;