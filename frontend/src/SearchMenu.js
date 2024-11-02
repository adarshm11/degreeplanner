import React, { useState } from 'react';
import universities from "./universities.json"
import './SearchMenu.css'

export function Selector() {

    const [university, setUniversity] = useState(null);
    // const [major, setMajor] = useState("");
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
        setUniversity(null);
    }

    const handleSelectedUniversity = (uni) => {
        setUniversity(uni);
        setInput(uni.name);
    }

    const filteredResults = universities.filter((uni =>
        uni.name.toLowerCase().includes(input.toLowerCase()) ||
        uni.id.toLowerCase().includes(input.toLowerCase())
    ));

    return (
        <div className="container">
            <input className="search-bar"
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Enter university..."
            />
            {input && !university && filteredResults.length > 0 && (
                <ul className="dropdown">
                    {filteredResults.map((result) => (
                        <li
                            key={result.id}
                            onClick={() => handleSelectedUniversity(result)}
                        >
                            {result.name}
                        </li>
                    ))}
                </ul>
            )}
            {university && (
                <button className="confirm-button"><strong>CONFIRM</strong></button>
            )}
        </div>
    );  
};
