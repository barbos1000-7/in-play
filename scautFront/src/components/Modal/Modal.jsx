import React, {useEffect} from "react";
import style from "./Modal.module.css";


const Modal = ({isOpen, onClose, children}) => {
//localStorage.getItem('id')
    const decrementMinute = () => {
        fetch(`http://localhost:3000/minutesDecrement/${localStorage.getItem('id')}`, {
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 'minutes null') {
                    location.reload()
                }
                console.log(data, 'data')
            })
            .catch((error) => console.error("Error deleting post:", error));
        setTimeout(() => {
            window.stops ? decrementMinute() :  window.stops = true

        }, 60000)
    }
    window.a = 0

    useEffect(() => {
        window.stops = true
        console.log(a)
        if (!window.a) {
            window.a = 1
            decrementMinute()
        }
        return () => {
            window.stops = false
        }
    }, [isOpen]);

    return (
        <div className={style.modalOverlay} onClick={onClose}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={style.btn} onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default Modal;
