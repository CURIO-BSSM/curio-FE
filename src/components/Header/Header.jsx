import GuestHeader from './GuestHeader';
import AuthHeader from './AuthHeader';
import AdminHeader from './AdminHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header(props) {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogin = () => {
		if (props.onLogin) return props.onLogin();
		navigate('/login');
	};
	const handleSignup = () => {
		if (props.onSignup) return props.onSignup();
		navigate('/signup');
	};

	if (user && user.isAdmin) {
		return (
			<AdminHeader
				adminName={user.name}
				onLogout={logout}
				onManageUsers={props.onManageUsers}
				onSettings={props.onSettings}
			/>
		);
	}

	if (user) {
		return <AuthHeader userName={user.name} onLogout={logout} onProfile={props.onProfile} />;
	}

	return <GuestHeader onLogin={handleLogin} onSignup={handleSignup} />;
}

export default Header;
