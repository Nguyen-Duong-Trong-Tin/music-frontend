import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "antd";

import InputSearchSong from "../../components/inputSearchSong";

import cookieHelper from "../../helpers/cookie";

import "./header.css";

function Header() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = cookieHelper.get("accessToken");
    setAccessToken(accessToken);
  }, []);


  const handleNavigateAuthen = () => {
    navigate("/auth/login");
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to={"/"}>Logo</Link>
        </div>
        <ul className="menu">
          <li className="menu-item">
            <InputSearchSong />
          </li>
          <li className="menu-item">
            <Link to={"/topics"}>Chủ Đề</Link>
          </li>
          {accessToken && (
            <li className="menu-item">
              <Link to={"/favorite-songs"}>Yêu thích</Link>
            </li>
          )}
        </ul>
        <div className="auth">
          <Button type="default" onClick={handleNavigateAuthen}>Đăng nhập</Button>
        </div>
      </header>
    </>
  );
}

export default Header;