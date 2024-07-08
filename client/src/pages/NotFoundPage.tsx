import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <>
            <h1>404: Stránka nebyla nalezena</h1>
            <h2>Zkus se <Link id="error-logout" to="/login">odhlásit</Link> a přihlásit</h2>
        </>
    )
}

export default NotFoundPage;