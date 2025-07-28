import { useAuth } from "../context/AuthContext";
import { calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getCaffeineAmount, timeSinceConsumption } from "../utils";

export default function History() {
    const { globalData } = useAuth()
    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-timeline" />
                <h2>History</h2>
            </div>
            <p><i>Hover for more information</i></p>
            <div className="coffee-history">
                {Object.keys(globalData).sort((a, b) => b - a).map
                ((utcTime, coffeeIndex) => {
                    const coffee = globalData[utcTime];
                    const timeSinceConsumed = timeSinceConsumption(utcTime);
                    const originalCaffeine = getCaffeineAmount(coffee.name);
                    const remainingCaffeine = calculateCurrentCaffeineLevel({
                        [utcTime]: coffee
                    });

                    const summary = `${coffee.name} | $${coffee.cost} | Consumed ${timeSinceConsumed} ago | ${originalCaffeine}mg originally | ${remainingCaffeine}mg remaining`

                    return (
                        <div title={summary} key={coffeeIndex}>
                            <i className="fa-solid fa-mug-hot" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}