import { InputGroup, FormControl, Button } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"
import { useState } from "react"

export default function SearchBox({ onSearch }) {
    const [query, setQuery] = useState('')

    return <InputGroup size='sm'>
        <FormControl
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { e.key === 'Enter' && onSearch(query) }}
            placeholder='Search text ...'
        />
        <Button onClick={() => onSearch(query)}><Search size={18} /></Button>
    </InputGroup>
} 