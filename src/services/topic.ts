import request from "../utils/request";

import IResponse from "../interfaces/response";
import ITopic from "../interfaces/topic";

const get = async () => {
  const topics = await request.get<IResponse<ITopic[]>>("/topics/get");
  return topics;  
}

const getById = async (id: string) => {
  const topic = await request.get<IResponse<ITopic>>(`/topics/get/${id}`);
  return topic;
}

const getBySlug = async (slug: string) => {
  const topic = await request.get<IResponse<ITopic>>(`/topics/get/slug/${slug}`);
  return topic;
}

const topicService = {
  get,
  getById,
  getBySlug
};
export default topicService;