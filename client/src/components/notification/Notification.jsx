import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Notification = ({ Notification, onNotificationClick, selectedNotification }) => {
    const [toggleMore, setToggleMore] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const sortedStatus = [...Notification].sort((a, b) => {
        return a.authorName.localeCompare(b.authorName);
    }); const deleteNotification = async (NotificationId) => {
        await axios.post(`${BASE_API_URL_HOST}/chat/clear-chat`, { userid: currentUser?._id, selectedid: NotificationId })
            .then(
                res => {
                    toast.success(res.data.data)
                    setToggleMore(false);
                })
            .catch(err => {
                toast.error(err.data.data)
                setToggleMore(false);

            })
    };
    // const deleteNotification = async (NotificationId) => {
    //     try {
    //         onNotificationClick(null)
    //         // console.log(NotificationId);
    //         const postRef = doc(db, "Notification", NotificationId);
    //         await deleteDoc(postRef);
    //         navigate('/Notification')
    //         setTogglestory(false)
    //         // window.location.reload()
    //     } catch (error) {
    //         console.log("Error deleting post:", error);
    //     }
    // };
    const formatRelativeTime = (timestamp) => {
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        if (timestamp < minute) {
            return "now";
        } else if (timestamp < hour) {
            const minutes = Math.floor(timestamp / minute);
            return `${minutes}m`;
        } else if (timestamp < day) {
            const hours = Math.floor(timestamp / hour);
            return `${hours}h`;
        }
        else if (timestamp >= day) {
            sortedStatus.map((Notification) => {
                if ((Date.now() - Notification.timestamp.toDate()) >= day) {
                    deleteNotification(Notification.NotificationId)
                }
            })
        }

    };
    return (
        <>

            <div>Notification</div>
        </>
    )
}

export default Notification