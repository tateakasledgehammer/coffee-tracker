import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

export default function Layout(props) {
    const { children } = props;
    // children is whatever is containted within the open and closing tags below

    const [showModal, setShowModal] = useState(false);

    const { globalUser, logout } = useAuth()

    const header = (
        <header>
            <div>
                <h1>COFFEE TRACKING</h1>
                <p>For Coffee Insatiates</p>
            </div>
            {globalUser ? (
                <button onClick={logout}>
                    <p>Log Out</p>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </button>
            ) : (
                <button onClick={() => { setShowModal(true) }}>
                    <p>Sign up free</p>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </button>)}
        </header>
    )

    const footer = (
        <footer>
            <p>Coffee Tracking was made by <br></br>
            <a href="https://github.com/tateakasledgehammer">tateakasledgehammer</a> using React.js<br/>Check out the project on <a target="_blank" href="https://www.github.com/tateakasledgehammer/coffee-tracker">GitHub</a></p>
        </footer>
    )

    // cleaning up to not need handleCloseModal twice below
    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>)}
            {header}
            <main>
                {children}
            </main>

            {footer}
        </>
    )
}

// here the handleCloseModal function is defined and that gets passed as a prop in Modal