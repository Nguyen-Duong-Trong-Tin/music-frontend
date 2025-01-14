import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutDefault from "../layouts/default";

import Home from "../pages/home";

import Login from "../pages/auth/login";

import Topic from "../pages/topic";

import Song from "../pages/song";
import SongDetail from "../pages/song/detail";
import FavoriteSong from "../pages/favoriteSong";
import SearchSong from "../pages/searchSong";

function PageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />

          <Route path="auth">
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="topics" element={<Topic />} />

          <Route path="songs">
            <Route path=":topicSlug" element={<Song />} />
            <Route path="detail/:slug" element={<SongDetail />} />
          </Route>

          <Route path="favorite-songs" element={<FavoriteSong />} />

          <Route path="search-songs" element={<SearchSong />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;