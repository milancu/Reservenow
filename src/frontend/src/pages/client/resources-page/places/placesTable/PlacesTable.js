import {useFilters, usePagination, useTable} from "react-table";
import styles from "../Places.module.scss";

export const Table = ({columns, data}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow,
    } = useTable({
            columns,
            data,
        },
        useFilters,
        usePagination
    )

    const {pageIndex} = state

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        <td className={styles.collCheckbox}>
                            <input type="checkbox" />
                        </td>
                        {headerGroup.headers.map(column => (
                            <td className={styles.td} {...column.getHeaderProps()}>
                                <p>{column.render('Header')}</p>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </td>

                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row)
                    return (
                        <tr className={styles.tRow} {...row.getRowProps()}>
                            <td className={styles.collCheckbox}>
                                <input type="checkbox" />
                            </td>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td>
                                <div className={styles.buttonCell}>
                                    <button className={'button-primary-outline ' .concat(styles.buttonEdit)}>Upravit</button>
                                    <button className={'button-primary-outline ' .concat(styles.buttonDelete)}>Odstranit</button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className={styles.buttonsContainer}>
                <div>
                    <span>Page {pageIndex + 1} of {pageOptions.length} </span>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className={'button-primary sm'}>Předchozí</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className={'button-primary sm'}>Další</button>
                </div>
            </div>
        </>
    )
}