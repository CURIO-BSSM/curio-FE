import "./Header.css";
import Logo from "../../assets/lgo.svg";

function GuestHeader({ onLogin, onSignup }) {
  return (
    <header className="app-header guest-header">
      <div className="header-inner">
        <div className="container">
          <img src={Logo} alt="Docs" className="logo"/>

          <nav className="nav">
            <a href="/" className="nav-link">홈</a>
            <a href="/about" className="nav-link">소개</a>
          </nav>
        </div>

        <div className="actions">
          <button className="btn btn-outline" onClick={onLogin}>로그인</button>
          <button className="btn btn-primary" onClick={onSignup}>회원가입</button>
        </div>
      </div>
    </header>
  );
}

export default GuestHeader;