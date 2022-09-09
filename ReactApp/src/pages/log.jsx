import TickTable from "../components/ticktable";
import { useEffect, useState, useMemo } from "react";
import { MockDatabase, multiFilter } from "../utils";
import randLogData, { numItemsPerPage, headers } from "../components/log/sampleData";


export default function Log() {
    // Data in a page
    const [pageData, setPageData] = useState([])
    const [numPages, setNumPages] = useState(0)

    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState(null)
    const [sortOption, setSortOption] = useState(null)
    
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

        const result = mockDB.query(query, filters, sortOption)

        setPageData(result.slice(0, numItemsPerPage))
        setNumPages(Math.ceil(result.length / numItemsPerPage))
    }
    const handlePageChange = nth => {
        let start = nth * numItemsPerPage
        let end = start + numItemsPerPage

        const searchResult = searchQuery === '' ? mockDB.slice(0) : mockDB.search(searchQuery, 0)
        const filterResult = filters ? multiFilter(searchResult, filters) : searchResult
        setPageData(filterResult.slice(start, end))
    }
    
    const handleSort = option => {
        console.log(option)
        setSortOption(option)
        
        const result = mockDB.query(searchQuery, filters, option)

        setPageData(result.slice(0, numItemsPerPage))
        setNumPages(Math.ceil(result.length / numItemsPerPage))
    }
    const handleFilter = filterOptions => {
        setFilters(filterOptions)
        console.log(filterOptions)
        
        const result = mockDB.query(searchQuery, filterOptions, sortOption)

        setPageData(result.slice(0, numItemsPerPage))
        setNumPages(Math.ceil(result.length / numItemsPerPage))
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
            onSort={handleSort}
            onFilter={handleFilter}
        />
    </div>
}