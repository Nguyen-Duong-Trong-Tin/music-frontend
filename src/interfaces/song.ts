import IBase from "./base";

import { ESongStatus } from "../enums/song";

import ITopicFull from "./topic";
import IUserFull from "./user";

interface ISong extends IBase {
  title: string;
  slug: string;
  description: string;
  avatar: string;
  audio: string;
  like: string[];
  listen: number;
  lyrics: string;
  stautus: ESongStatus;
  topicId: string | ITopicFull;
  singerId: string | IUserFull;
};

export default ISong;