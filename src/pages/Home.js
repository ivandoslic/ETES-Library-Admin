import React, { useState, useEffect } from 'react'
import AchievementsOpenHome from '../components/AchievementsOpenHome';
import GlobalNotificationsCreate from '../components/GlobalNotificationsCreate';
import LatestReviewHome from '../components/LatestReviewHome';
import LibrariansChoicePreview from '../components/LibrariansChoicePreview';
import Modal from '../components/Modal';
import base from '../base';
import './Home.css'

function Home() {
    const [hour, setHour] = useState(null);
    const [todMessage, setTodMessage] = useState("Hello");
    const [date, setDate] = useState(null);
    const [notificationModalOpened, setNotificationModalOpened] = useState(false);
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationBody, setNotificationBody] = useState('');

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

    const openNotificationModal = () => {
        setNotificationModalOpened(prev => !prev);
    }

    const sendGlobalNotification = () => {
        if (notificationBody.length > 1 && notificationTitle.length > 1) {
            base.sendGlobalNotificationMessage(notificationTitle, notificationBody);
            setNotificationBody('');
            setNotificationTitle('');
            openNotificationModal();
        }
    }

    const abortNotificationCreation = () => {
        setNotificationBody('');
        setNotificationTitle('');
        openNotificationModal();
    }

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
                    <GlobalNotificationsCreate buttonAction={openNotificationModal} />
                </div>
                <div className="home-lower-body">
                    <AchievementsOpenHome />
                    <LatestReviewHome /> {/*TODO: Check browser type and add extra margin-left [only firefox is ok, as much as I checked]*/}
                </div>
            </div>
            <Modal show={notificationModalOpened} setShow={openNotificationModal}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ color: 'white' }}>Create a notification</h1>
                    <input type='text' value={notificationTitle} onChange={e => setNotificationTitle(e.target.value)} placeholder='Notification title' style={{ width: '50%', height: '10%', fontSize: '22px', background: 'white', color: '#202c39', border: 'none', outline: 'none', borderRadius: '25px', paddingLeft: '15px' }} />
                    <textarea value={notificationBody} onChange={e => setNotificationBody(e.target.value)} placeholder='Notification body' style={{ width: '50%', height: '45%', fontSize: '22px', background: 'white', color: '#202c39', border: 'none', outline: 'none', borderRadius: '25px', paddingLeft: '15px', paddingTop: '20px' }}></textarea>
                    <div className='assignments-edit-button-container'>
                        <div className='assignment-edit-button' onClick={abortNotificationCreation}>
                            Cancel
                        </div>
                        <div className='assignment-edit-button' onClick={sendGlobalNotification}>
                            Send
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Home
