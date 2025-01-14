import request from "../utils/request"

import IResponse from "../interfaces/response";
import ISong from "../interfaces/song";

const search = async (search: string | null) => {
  let params = "/songs/search?";
  if (search) {
    params += `search=${search}`;
  }

  const songs = await request.get<IResponse<ISong[]>>(params);
  return songs;
}

const getById = async (id: string) => {
  const song = await request.get<IResponse<ISong>>(`/songs/get/${id}`);
  return song;
}

const getByTopicSlug = async (topicSlug: string) => {
  const songs = await request.get<IResponse<ISong[]>>(`/songs/get/topic-slug/${topicSlug}`);
  return songs;
}

const getBySlug = async (slug: string) => {
  const song = await request.get<IResponse<ISong>>(`/songs/get/slug/${slug}`);
  return song;
}

const updateLike = async (id: string) => {
  const newSong = await request.patch<IResponse<ISong>>(`/songs/update/like/${id}`, {});
  return newSong;
}

const songService = {
  search,
  getById,
  getByTopicSlug,
  getBySlug,
  updateLike
};
export default songService;