export default function Hero() {
    return (
        <>
            <h1>Take Control of your Coffee <i className="fa-solid fa-mug-hot"></i> Consumption</h1>
            <h2>You <abbr title="read: coffee enjoyer">Freak</abbr></h2>
            <div className="benefits-list">
                <h3 className="font-bolder">Try <span className="text-gradient">CCC</span> and start ...</h3>
                <p>✔️ Tracking every coffee</p>
                <p>✔️ Measuring your caffeine levels</p>
                <p>✔️ Checking your spending</p>
            </div>
            <div className="card info-card">
                <div>
                    <i className="fa-solid fa-circle-info"></i>
                    <h2>Did you know...</h2>
                </div>
                <h3>That caffeine's half-life is about 5 hours?</h3>
                <p>This means that after 5 hours, half the caffeine you consumed is still in your system, keeping you alert longer! So if you drink a cup of coffee with 200mg of coffee, you will still have about 100mg of caffeine in you 5 hours later.</p>
            </div>

        </>
    )
}