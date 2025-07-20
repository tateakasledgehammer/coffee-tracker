export default function Layout(props) {
    const { children } = props;
    // children is whatever is containted within the open and closing tags below

    const header = (
        <header>
            <div>
                <h1>COFFEE TRACKING</h1>
                <p>For Coffee Insatiates</p>
            </div>
            <button>
                <p>Sign up free</p>
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
        </header>
    )

    const footer = (
        <footer>
            <p>Coffee Tracking was made by <a href="https://github.com/tateakasledgehammer">tateakasledgehammer</a> using React.js</p>
        </footer>
    )
gi
    return (
        <>
            {header}

            <main>
                {children}
            </main>

            {footer}
        </>
    )
}