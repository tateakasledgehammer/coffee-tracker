import { coffeeOptions } from "../utils"
import { useState } from "react"
import Modal from "./Modal"
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase";

export default function CoffeeForm(props) {
    const { isAuthenticated } = props;
    const [showModal, setShowModal] = useState(false)
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [coffeeCost, setCoffeeCost] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);

    const { globalData, setGlobalData, globalUser } = useAuth()

    async function handleSubmitForm() {
        console.log("Authenticated: ", isAuthenticated)
        if (!isAuthenticated) {
            setShowModal(true)
            return
        }

        // define a guard clause that only submits the form if completed
        if (!selectedCoffee) {
            alert('Pick a coffee!')
            return
        }

        try {
            // then create a new object
            const newGlobalData = {
            ...(globalData || {}) // back up with empty in case null
             }

            const nowTime = Date.now()
            const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 1000)
            const timestamp = nowTime - timeToSubtract

            const newData = {
                name: selectedCoffee,
                cost: coffeeCost
            }

            newGlobalData[timestamp] = newData

            // update global state to add coffee
            setGlobalData(newGlobalData)

            // persist in firebase
            const userRef = doc(db, 'users', globalUser.uid)
            const res = await setDoc(userRef, {
                [timestamp]: newData
            }, {merge: true}) // need the merge otherwise would override

            setSelectedCoffee(null)
            setHour(0)
            setMin(0)
            setCoffeeCost(0)

        } catch (err) {
            console.log(err.message)
        }
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
        { showModal && (
            <Modal handleCloseModal={handleCloseModal}>
                <Authentication handleCloseModal={handleCloseModal} />
            </Modal>
        )} 
            <div className="section-header">
                <i className="fa-solid fa-pencil"></i>
                <h2>Start Tracking Today</h2>
            </div>
            <h4>Select your coffee</h4>
            <div className="coffee-grid">
                {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
                    return (
                        <button onClick={() => {
                            setSelectedCoffee(option.name);
                            setShowCoffeeTypes(false);
                        }} className={"button-card " + (option.name === selectedCoffee ? ' coffee-button-selected' : ' ')} key={optionIndex}>
                            <h4>{option.name}</h4>
                            <p>{option.caffeine}mg</p>
                        </button>
                    )
                })}
                <button onClick={() => {
                    setShowCoffeeTypes(true);
                    setSelectedCoffee(null);
                }} className={"button-card " + (showCoffeeTypes ? 'coffee-button-selected' : ' ')}>
                    <h4>Other</h4>
                    <p>n/a</p>
                </button>
            </div>

            { showCoffeeTypes && (
                <select onChange={(e) => {
                    setSelectedCoffee(e.target.value); // value below is option.name
                }} id="coffee-list" name="coffee-list">
                <option value={null}>Select Coffee</option>
                    {coffeeOptions.map((option, optionIndex) => {
                        return (
                            <option value={option.name} key={optionIndex}>{option.name} ({option.caffeine}mg)</option>
                        )
                    })}
                </select>
            )}

            <h4>What's the price?</h4>
            <input onChange={(e) => {
                setCoffeeCost(e.target.value);
            }} value={coffeeCost} className="w-full" type="number" placeholder="$4.50"></input>

            <h4>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select onChange={(e) => {
                        setHour(e.target.value);
                    }} value={hour} className="w-full" id="hours-select">
                        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((hour, hourIndex) => {
                            return (
                                <option key={hourIndex} value={hour}>{hour}</option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <h6>Minutes</h6>
                    <select onChange={(e) => {
                        setMin(e.target.value)
                    }} value={min} className="w-full" id="mins-select">
                        {[0,5,10,15,30,45].map((min, minIndex) => {
                            return (
                                <option key={minIndex} value={min}>{min}</option>
                            )
                        })}
                    </select>
                </div>

                <button onClick={handleSubmitForm}>
                    <p>Add Coffee</p>
                </button>
            </div>
        </>
    )
}