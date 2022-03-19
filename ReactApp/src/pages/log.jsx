import TickTable from "../components/ticktable";
import { useEffect, useState, useMemo } from "react";
import { MockDatabase } from "../utils";
import randLogData, { numItemsPerPage, headers } from "../components/log/sampleData";


export default function Log() {
    // Data in a page
    const [pageData, setPageData] = useState([])
    const [numPages, setNumPages] = useState(0)

    const [searchQuery, setSearchQuery] = useState('')
    
    const mockDB = useMemo(() => {
        const initDB = () => {
            const logData = []
            for (let i = 0; i < 201; ++i) {
                logData.push(randLogData())
            }
            return logData
        }
        return new MockDatabase(initDB())
    }, [])

    const init = () => {
        // When we have backend, get number of pages and data by APIs
        setPageData(mockDB.slice(0, numItemsPerPage))
        setNumPages(Math.ceil(mockDB.getCurrLength() / numItemsPerPage))
    }

    useEffect(init, [mockDB])

    const handleSearch = query => {
        setSearchQuery(query)
        if (query === '') {
            init()
            return
        }
        const searchResult = mockDB.search(query, 0, numItemsPerPage)
        setPageData(searchResult)
        setNumPages(Math.ceil(mockDB.getCurrLength() / numItemsPerPage))
    }
    const handlePageChange = nth => {
        let start = nth * numItemsPerPage
        let end = start + numItemsPerPage
        setPageData(searchQuery === '' ? mockDB.slice(start, end) : mockDB.search(searchQuery, start, end))
    }

    const handleSort = option => {
        console.log(option)
        mockDB.sort(option.key, option.order)
        init()
    }
    const handleFilter = filters => {
        console.log(filters)
    }

    return <div>
        <TickTable
            componentSize="sm"
            data={pageData}
            headers={headers}
            name="Nhật ký hệ thống"
            numPages={numPages}
            onSearch={handleSearch}
            onPageChange={handlePageChange}
            // onRowClick={row => console.log(row)}
            onSort={handleSort}
            onFilter={handleFilter}
        />
    </div>
}