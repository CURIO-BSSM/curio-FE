import "./Header.css";
import Logo from "../../assets/lgo.svg";


function AdminHeader({ adminName, onLogout }) {
  return (
    <header className="app-header admin-header">
      <div className="header-inner">
        <div className="container">
         <img src={Logo} alt="Docs" className="logo"/>

         <nav className="nav">
           <a href="/" className="nav-link">문제 풀러가기</a>
           <a href="/about" className="nav-link">랭킹</a>
           <a href="/about" className="nav-link">기록</a>
           <a href="/about" className="nav-link">단원 보기</a>
           <a href="/about" className="nav-link">문제 추가</a>
         </nav>
       </div>

        <div className="actions">
          <div className="user-info" style={{ marginLeft: 8 }}>
            <div className="avatar">{adminName ? adminName.charAt(0).toUpperCase() : 'A'}</div>
            <span className="user-name">{adminName || '관리자'}</span>
          </div>
          <button className="btn btn-ghost" onClick={onLogout}>로그아웃</button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
