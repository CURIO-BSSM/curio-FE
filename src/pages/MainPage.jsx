import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { getUnits } from '../api';
import { useNavigate } from 'react-router-dom';
import '../pages/MainPage.css';
import Arrow from "../assets/quiz.svg";
import Book from "../assets/units.svg";
import Crown from "../assets/rank1.svg";
import Dock from "../assets/history.svg";

export default function MainPage() {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getUnits().then((data) => setUnits(data || [])).catch(() => setUnits([])).finally(() => setLoading(false));
    }, []);

    return (
        <div className="page main-page">
            <Header />
            <div className="main-container">
                <div className="main-containButton">
                    <div
                        className="main-quiz"
                        onClick={() => navigate('/units')}
                    >
                        <img src={Arrow} alt="Arrow" className="main-arrow"/>
                        <span className="main-quizText">문제풀러가기</span>
                    </div>
                    <div className='main-containButton2'>
                        <div
                            className="main-rank"
                            onClick={() => navigate('/rankings')}
                        >
                            <img src={Crown} alt="Crown" className="main-crown"/>
                            <span className="main-rankText">랭킹</span>
                        </div>
                        <div
                            className="main-unit"
                            onClick={() => navigate('/units')}
                        >
                            <img src={Book} alt="Book" className="main-book"/>
                            <span className="main-unitText">단원</span>
                        </div>
                        <div
                            className="main-history"
                            onClick={() => navigate('/history')}
                        >
                            <img src={Dock} alt="Dock" className="main-dock"/>
                            <span className="main-historyText">기록</span>
                        </div>
                    </div>
                    {}
                </div>
            </div>
        </div>
    );
}
