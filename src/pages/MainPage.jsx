import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { getUnits } from '../api';
import { Link } from 'react-router-dom';
import '../pages/MainPage.css';

export default function MainPage() {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUnits().then((data) => setUnits(data || [])).catch(() => setUnits([])).finally(() => setLoading(false));
    }, []);

    return (
        <div className="page main-page">
            <Header />
            <div className="container">
                <h1>Curio</h1>
                <p>단원을 선택해 퀴즈를 풀어보세요.</p>
                {loading ? <div>로딩...</div> : (
                    <ul className="units-list">
                        {units.map(u => (
                            <li key={u.id}>
                                <Link to={`/quiz?unit=${u.id}`}>{u.name}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}