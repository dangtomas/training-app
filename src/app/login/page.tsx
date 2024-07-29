"use client";

import { FormEvent, useEffect, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status != 200) {
        throw new Error();
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);

      setMessage("Úspěšné přihlášení, počkej chvíli ✅🥳");
    } catch (err) {
      setMessage("Špatné údaje, zkus to znova ❌🙁");
    }
  };

  return (
    <>
      <form className="box mt-[25vh] w-[360px]" onSubmit={handleSubmit}>
        <h2 className="p-4 pt-6 text-center text-2xl font-bold">
          Přihlášení 👋
        </h2>

        <input
          className="login-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="jméno"
          required
        />

        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="heslo"
        />

        <button
          className="my-4 w-[90%] rounded-lg bg-black py-2 text-lg text-white"
          type="submit"
        >
          Přihlásit se
        </button>
        <p className={`pb-4 pt-2 ${message ? "" : "hidden"}`}>{message}</p>
      </form>
    </>
  );
}
