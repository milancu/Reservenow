import styles from './ResourcesPage.module.scss'
import {useState, useEffect, useMemo} from "react";
// import {useTable} from "react-table"
import {Sources} from "./sources/Sources";
import {Places} from "./places/Places";
import {Employees} from "./employes/Employees";

export const ResourcesPageClient = () => {
    const [source, setSource] = useState(true);
    const [place, setPlace] = useState(false);
    const [employee, setEmployee] = useState(false);
    // const [data, setData] = useState();
    // const columns = useMemo(() => [
    //     {
    //         Header: "Zdroje",
    //         columns: [
    //             {
    //                 Header: "Plný název"
    //             },
    //             {
    //                 Header: "Název"
    //             },
    //             {
    //                 Header: "Služba",
    //                 Cell: ({ cell: { value } }) => value ? {value} : "-"
    //             },
    //             {
    //                 Header: "Místo"
    //             },
    //             {
    //                 Header: "Zaměstnanec",
    //                 Cell: ({ cell: { value } }) => value ? {value} : "-"
    //             },
    //             {
    //                 Header: " "
    //             },
    //         ]
    //
    //     }]
    // )

    const activeSource = () => {
        setSource(true)
        setPlace(false)
        setEmployee(false)
    }

    const activePlace = () => {
        setSource(false)
        setPlace(true)
        setEmployee(false)
    }

    const activeEmployee = () => {
        setSource(false)
        setPlace(false)
        setEmployee(true)
    }

    // const basicTable = () => {
    //     useTable({
    //
    //     })
    // }

    return (
        <div>
            <div className={styles.menu}>
                <button type={'button'} className={source ? styles.active : ""} onClick={activeSource}>Zdroje
                </button>
                <button type={'button'} className={place ? styles.active : ""} onClick={activePlace}>Místa
                </button>
                <button type={'button'} className={employee ? styles.active : ""}
                        onClick={activeEmployee}>Zaměstnanci
                </button>
            </div>
            {source ? <Sources/> : <></>}
            {place ? <Places/> : <></>}
            {employee ? <Employees/> : <></>}
        </div>

    )
}