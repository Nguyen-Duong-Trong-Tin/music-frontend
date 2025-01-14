import IBase from "./base";

interface IFavoriteSong extends IBase {
  userId: string;
  songId: string;
};

export default IFavoriteSong;