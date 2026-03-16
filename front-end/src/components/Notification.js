import React, { useEffect, useState } from 'react';
import '../styles/Wireframe.css';
import { useUser, authFetch } from "./UserContext";

function Notification({ open, onClose }) {
    const [items, setItems] = useState([]);
    const { user } = useUser();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        if (!open || !user?.user_id) return;

        // const fetchNotifications = async () => {
        //     try {
        //         const res = await authFetch(`${BASE_URL}/notifications?recipient=${user.user_id}`);
        //         const data = await res.json();
        //         setItems(data);
        //     } catch (err) {
        //         console.error("Failed to load notifications:", err);
        //     }
        // };

        const fetchNotifications = async () => {
    setItems([
        { id: 1, title: "Kudos Approved", message: "Your kudos for Bob Smith was approved.", time: "Mar 15, 2026", read: false },
        { id: 2, title: "Kudos Approved", message: "Your kudos for Alice Johnson was approved.", time: "Mar 14, 2026", read: false },
        { id: 3, title: "New Kudos Submitted", message: "A new kudos card is pending your review.", time: "Mar 13, 2026", read: true },
    ]);
};

        fetchNotifications();

        const onKey = (e) => e.key === 'Escape' && onClose?.();
        document.addEventListener('keydown', onKey);

        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [open, onClose, user, BASE_URL]);

    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="notif-title">
            <div className="notif-modal" onClick={(e) => e.stopPropagation()}>
                <div className="notif-header">
                    <h4 id="notif-title">Notifications</h4>
                    <button className="close-btn" onClick={onClose} aria-label="Close">✖</button>
                </div>

                {items.length === 0 ? (
                    <p className="notif-empty">No new notifications.</p>
                ) : (
                    <ul className="notif-list">
                        {items.map((n) => (
                            <li key={n.id} className={`notif-item ${n.read ? 'read' : 'unread'}`}>
                                <div className="notif-title">{n.title}</div>
                                {n.message && <div className="notif-message">{n.message}</div>}
                                {n.time && <div className="notif-time">{n.time}</div>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Notification;