import { Link } from 'react-router-dom';
import "./Header.css";
import Logo from "../../assets/lgo.svg";

function AdminHeader({ adminName, onLogout }) {
  return (
    <header className="app-header admin-header">
      <div className="header-inner">
        <div className="container">
         
         <Link to="/">
            <img src={Logo} alt="Curio Logo" className="logo"/>
         </Link>

         <nav className="nav">
           { }
           <Link to="/units" className="nav-link">문제 풀러가기</Link>
           <Link to="/rankings" className="nav-link">랭킹</Link>
           <Link to="/history" className="nav-link">기록</Link>
           <Link to="/units" className="nav-link">단원 보기</Link>
           
           
           <Link to="/admin" className="nav-link" style={{ fontWeight: 'bold', color: '#FFC85C' }}>
             문제 추가
           </Link>
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