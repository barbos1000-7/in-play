import { useState } from "react";
import style from "./AuthAdmin.module.css";

const AuthAdmin = ({ checkAdmin }) => {
  const [loginAdm, setLoginAdm] = useState("");
  const [passwordAdm, setPasswordAdm] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    checkAdmin(loginAdm, passwordAdm);
  };

  return (
    <div className={style.block}>
      <form className={style.form} onClick={handleLogin}>
        <h2 style={{ color: "red" }}>Admin Panel</h2>
        <div>
          <h3>Логин (админка):</h3>
          <input
            value={loginAdm}
            onChange={(e) => setLoginAdm(e.target.value)}
            className={style.login}
            type="text"
          />
        </div>
        <div>
          <h3>Пароль (админка):</h3>
          <input
            value={passwordAdm}
            onChange={(e) => setPasswordAdm(e.target.value)}
            className={style.password}
            type="text"
          />
        </div>
        <div>
          <button
            className={style.auth}
            onClick={() => {
              setLoginAdm("");
              setPasswordAdm("");
            }}
          >
            Войти в админку
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthAdmin;
