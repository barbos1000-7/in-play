import {useEffect, useState} from "react";
import style from "./AdminPanel.module.css";

const AdminPanel = () => {
    const [log, setLog] = useState("");
    const [pass, setPass] = useState("");
    const [minutes, setMinutes] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("http://localhost:3000")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setData(data)
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    const addPost = (newPost) => {
        const postWithId = {title: newPost.log, description: newPost.pass, minutes: newPost.minutes};
        fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postWithId),
        })
            .then(() => {
                fetchData();
                reset();
            })
            .catch((error) => console.error("Error adding post:", error));
    };

    const deletePost = (id) => {
        if (id !== undefined) {
            fetch(`http://localhost:3000?id=${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    fetchData();
                })
                .catch((error) => console.error("Error deleting post:", error));
        }
    };

    const handleCreateUser = () => {
        addPost({log, pass, minutes});
    };

    return (
        <>
            <form className={style.form}>
                <h2 style={{color: "red"}}>Admin Panel</h2>
                <div>
                    <h3>Создать новый логин:</h3>
                    <input
                        value={log}
                        onChange={(e) => setLog(e.target.value)}
                        className={style.login}
                        type="text"
                    />
                </div>
                <div>
                    <h3>Создать новый пароль:</h3>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className={style.password}
                        type="text"
                    />
                </div>
                <div>
                    <h3>Введите количество минут:</h3>
                    <input
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        className={style.login}
                        type="text"
                    />
                </div>
                <div>
                    <button className={style.auth} onClick={handleCreateUser}>
                        Создать пользователя
                    </button>
                </div>
            </form>

            <div className={style.list}>
                <ul className={style.ullist}>
                    {data.map((item) => (
                        <li className={style.items} key={item.id}>
                            <div style={{margin: "20px", height: "220px"}}>
                                <h3>Логин пользователя:</h3>
                                <h3 style={{color: "black"}}>{item.title}</h3>
                                <h3>Пароль пользователя:</h3>
                                <h3 style={{color: "black"}}>{item.description}</h3>
                                <h3>Минуты пользователя:</h3>
                                <h3 style={{color: "black"}}>{item.minutes
                                }</h3>
                            </div>
                            <button
                                className={style.deletebtn}
                                onClick={() => deletePost(item.id)}
                            >
                                Удалить пользователя
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default AdminPanel;
