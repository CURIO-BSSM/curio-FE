import "./Header.css";
import Logo from "../../assets/lgo.svg";
import { Link } from "react-router-dom";

function AuthHeader({ userName, onProfile, onLogout }) {
  return (
    <header className="app-header auth-header">
      <div className="header-inner">
        <div className="container">
          <a href="/main">
            <img src={Logo} alt="Docs" className="logo"/>
          </a>

          <nav className="nav">
            <a href="/main" className="nav-link">문제 풀러가기</a>
            <a href="/rankings" className="nav-link">랭킹</a>
            <a href="/history" className="nav-link">기록</a>
            <a href="/units" className="nav-link">단원 보기</a>
          </nav>
        </div>
        <div className="actions">
          <div className="user-info" onClick={onProfile} role="button" tabIndex={0}>
            <div className="avatar" aria-hidden> {userName ? userName.charAt(0).toUpperCase() : "U"} </div>
            <span className="user-name">{userName || "사용자"}</span>
          </div>
          <button className="btn btn-ghost" onClick={onLogout}>로그아웃</button>
        </div>
      </div>
    </header>
  );
}

export default AuthHeader;
