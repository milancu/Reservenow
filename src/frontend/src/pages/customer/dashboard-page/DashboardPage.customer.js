import styles from './DashboardPage.module.scss'
import photo from './photo.jpg'
import star from './img.png'
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../../../config/const";
import authHeader from "../../../services/auth-header";
import {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";
import AuthService from "../../../services/auth.service";

const DashboardNavigation = () => {
    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("app/");

    return (
        <nav className={styles.servicesNavigation}>
            <Link to={'/app/dashboard/pubs'}
                  className={splitLocation[1] === "pubs" ? styles.active : ""}>Pubs</Link>
            <Link to={'/app/dashboard/theatre'}
                  className={splitLocation[1] === "theatre" ? styles.active : ""}>Theatre</Link>
            <Link to={'/app/dashboard/restaurants'}
                  className={splitLocation[1] === "restaurants" ? styles.active : ""}>Restaurants</Link>
            <Link to={'/app/dashboard/sport'}
                  className={splitLocation[1] === "sport" ? styles.active : ""}>Sport</Link>
            <Link to={'/app/dashboard/other'}
                  className={splitLocation[1] === "other" ? styles.active : ""}>Other</Link>
        </nav>
    )
}

export const DashboardPageCustomer = () => {
    let [systems, setSystems] = useState([]);
    const user = AuthService.getCurrentUser();
    let [reservations, setReservations] = useState([]);
    let [addresses, setAdresses] = useState([]);
    let [feedbacks, setFeedbacks] = useState([]);
    let [addressesUpComing, setAddressesUpComing] = useState([]);

    const [event, setEvents] = useState([]);
    const [slots, setSlots] = useState([]);
    const [system, setSystem] = useState([]);

    // const date = new Date().toISOString().split("T")[0]

    useEffect(async () => {
        await sendGetRequest()
    }, [])

    const sendGetRequest = async () => {

        //Get system addresses
        //--------------------------------------------------------
        const fetchAddress = async (id) => {
            return new Promise((resolve, reject) => {
                axios.get(`${baseUrl}/systems/${id}/sources`,
                    {headers: authHeader()}
                ).then(response => {
                    resolve(response.data)
                }).catch(reject);
            })
        }
        // console.log(fetchAddress())

        //--------------------------------------------------------
        const fetchSlot = (e) => {
            return new Promise((resolve, reject) => {
                axios.get(
                    `${baseUrl}/slots/${e}`,
                    {headers: authHeader()}
                ).then(response => {
                    resolve(response.data)
                }).catch(reject);
            })
        }

        const fetchSlots = async (data) => {

            let response = []
            await Promise.all(data.map(async (e) => {
                try {
                    let insertResponse = await fetchSlot(e.reservationId)
                    response.push(insertResponse)
                } catch (error) {
                    console.log('error' + error);
                }
            }))
            return response
        }

        const fetchEvent = (id) => {
            return new Promise((resolve, reject) => {
                axios.get(
                    `${baseUrl}/events/${id}`,
                    {headers: authHeader()}
                ).then(response => {
                    resolve(response.data)
                }).catch(reject);
            })
        }

        const fetchEvents = async (data) => {

            let response = []
            await Promise.all(data.map(async (e) => {
                try {
                    let insertResponse = await fetchEvent(e.seatIdentifier)
                    response.push(insertResponse)
                } catch (error) {
                    console.log('error' + error);
                }
            }))
            return response
        }

        const fetchId = (id) => {
            return new Promise((resolve, reject) => {
                axios.get(
                    `${baseUrl}/category/${id}`,
                    {headers: authHeader()}
                ).then(response => {
                    resolve(response.data)
                }).catch(reject);
            })
        }

        const fetchIds = async (data) => {
            let response = []
            await Promise.all(data.map(async (e) => {
                try {
                    let insertResponse = await fetchId(e.categoryId)
                    response.push(insertResponse)
                } catch (error) {
                    console.log('error' + error);
                }
            }))
            return response
        }

        const fetchAddressUp = async (data) => {
            let response = []
            await Promise.all(data.map(async (e) => {
                try {
                    let insertResponse = await fetchAddress(e)
                    response.push(insertResponse)
                } catch (error) {
                    console.log('error' + error);
                }
            }))
            return response
        }

        const reservations = await Promise.any([
            axios.get(`${baseUrl}/users/${user.username}/reservations`,
                {params: {fromDate: "2022-05-01", toDate: "2022-05-30"}, headers: authHeader()})
        ])

        const slots = await Promise.all([fetchSlots(reservations.data)])
        setSlots(slots[0])
        const events = await Promise.all([fetchEvents(slots[0])])
        setEvents(events[0]);
        const ids = await Promise.all([fetchIds(events[0])])
        setSystem(ids[0])
        const fetchAddressUpComing = await Promise.any([
            fetchAddressUp(ids[0])
        ])
        console.log(fetchAddressUpComing)
        setAddressesUpComing(fetchAddressUpComing.map(r => {
            return r[0].address
        }))


        const fetchAddresses = async (data) => {
            let response = []
            await Promise.all(data.map(async (e) => {
                try {
                    let insertResponse = await fetchAddress(e.id)
                    response.push(insertResponse)
                } catch (error) {
                    console.log('error' + error);
                }
            }))
            return response
        }

        const system = await Promise.any([
            axios.get(`${baseUrl}/systems`, {headers: authHeader()})
        ])

        const address = await Promise.any([fetchAddresses(system.data)])
        setAdresses(address.map(r => {
            // console.log(r[0].address)
            return (r[0].address)
        }));

        //Get system feedbacks
        //--------------------------------------------------------

        const fetchFeedback = async (id) => {
            return new Promise((resolve, reject) => {
                axios.get(`${baseUrl}/systems/${id}/feedback`,
                    {headers: authHeader()}
                ).then(response => {
                    resolve(response.data)
                }).catch(reject);
            })
        }
        // console.log(fetchAddress())

        const fetchFeedbacks = async (data) => {
            let response = []
            await Promise.all(data.map(async (e) => {
                try {
                    let insertResponse = await fetchFeedback(e.id)
                    response.push(insertResponse)
                } catch (error) {
                    console.log('error' + error);
                }
            }))
            return response
        }

        const feedback = await Promise.any([fetchFeedbacks(system.data)]);
        setFeedbacks(feedback);

        //Get all systems and users reservations
        //--------------------------------------------------------

        await axios.get(`${baseUrl}/systems`,
            {headers: authHeader()})
            .then(resp => setSystems(resp.data))

        await axios.get(`${baseUrl}/users/${user.username}/reservations`,
            {params: {fromDate: "2022-05-01", toDate: "2022-05-30"}, headers: authHeader()})
            .then(resp => setReservations(resp.data))
    }

    return (
        <div className={styles.container}>
            <DashboardNavigation/>
            <div className={styles.upcomingSections}>
                <p className={styles.title}>Your upcoming reservations</p>
                <div className={styles.blocks}>
                    {reservations.slice(0, 3).map((name, i) => (
                        <div className={styles.block} key={i}>
                            <img src={photo}/>
                            <p className={styles.name}>{systems[i].name}</p>
                            <p>{addressesUpComing[i].city}, {addressesUpComing[i].street} {addressesUpComing[i].houseNumber}</p>
                            <div className={styles.rating}>
                                <p>9.8</p>
                                <img src={star}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className={styles.sections}>
                <p className={styles.title}>Recent visits</p>
                <div className={styles.blocks}>
                    {systems.slice(0, 3).map((system, i) => (
                        <div className={styles.block} key={i}>
                            <img src={photo}/>
                            <p className={styles.name}>{system.name}</p>
                            <p>{addresses[i].city}, {addresses[i].street} {addresses[i].houseNumber}</p>
                            <div className={styles.rating}>
                                <p>{feedbacks[i].length}</p>
                                <img src={star}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className={styles.sections}>
                <p className={styles.title}>The best of RESNOW</p>
                <div className={styles.blocks}>
                    {systems.slice(3, 9).map((system, i) => (
                        <div className={styles.block} key={i}>
                            <img src={photo}/>
                            <p className={styles.name}>{system.name}</p>
                            <p>{addresses[i].city}, {addresses[i].street} {addresses[i].houseNumber}</p>
                            <div className={styles.rating}>
                                <p>{feedbacks[i].length}</p>
                                <img src={star}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}