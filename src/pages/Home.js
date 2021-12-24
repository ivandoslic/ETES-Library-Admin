import React, { useState, useEffect } from 'react'
import AchievementsOpenHome from '../components/AchievementsOpenHome';
import GlobalNotificationsCreate from '../components/GlobalNotificationsCreate';
import LatestReviewHome from '../components/LatestReviewHome';
import LibrariansChoicePreview from '../components/LibrariansChoicePreview';
import './Home.css'

function Home() {
    const [hour, setHour] = useState(null);
    const [todMessage, setTodMessage] = useState("Hello");
    const [date, setDate] = useState(null);

    var getHour = () => {
        const date = new Date();
        const hour = date.getHours()
        return hour;
    }

    var getDate = () => {
        const date = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = days[date.getDay()];
        const oth = date.getDate() + '. ' + months[date.getMonth()] + " " + date.getFullYear() + '.';
        const fullDate = day + ', ' + oth;
        return fullDate;
    }

    useEffect(() => {
        setHour(getHour);
        if (hour > 3 && hour < 10) {
            setTodMessage("Good morning")
        } else if (hour >= 10 && hour < 18) {
            setTodMessage("Good day")
        } else if (hour >= 18) {
            setTodMessage("Good evening")
        } else {
            setTodMessage("Hello")
        }
    }, [hour]);

    useEffect(() => {
        setDate(getDate);
    }, [date]);

    return (
        <div>
            <div className="home-header">
                <div className="home-header-greetings">
                    <h1 className="home-title">{todMessage} librarian</h1>
                    <p>Have a nice day</p>
                </div>
                <div className="home-header-date">
                    <h2>{date}</h2>
                </div>
            </div>
            <div className="home-body">
                <div className="home-upper-body">
                    <LibrariansChoicePreview />
                    <GlobalNotificationsCreate />
                </div>
                <div className="home-lower-body">
                    <AchievementsOpenHome />
                    <LatestReviewHome />
                </div>
            </div>
        </div>
    )
}

export default Home
