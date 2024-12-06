import React, { useState } from 'react';
import universities from "./universities.json";
import sjsu_majors from './majors/sjsu_majors.json';
import ucsc_majors from "./majors/ucsc_majors.json";
import umn_majors from "./majors/umn_majors.json";
import './SearchMenu.css';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchMenu() {

    const [university, setUniversity] = useState(null);
    const [major, setMajor] = useState("");
    const [input, setInput] = useState("");
    const [isUniversityChosen, setIsUniversityChosen] = useState(false);

    const handleUniversityChange = (e) => {
        setInput(e.target.value);
        setUniversity(null);
    }

    const handleMajorChange = (e) => {
        setInput(e.target.value);
        setMajor(null);
    }

    const handleSelectedUniversity = (uni) => {
        setUniversity(uni);
        setInput(uni.name);
        setIsUniversityChosen(true);
    }
    
    const handleSelectedMajor = (maj) => {
        setMajor(maj);
        setInput(maj);
    }

    const handleClick = (firstStepDone) => {
        if (firstStepDone) { // button is being clicked after university is chosen
            // transition to major selection
        }
    }

    const filteredUniversities = universities.filter((uni =>
        uni.name.toLowerCase().includes(input.toLowerCase()) ||
        uni.id.toLowerCase().includes(input.toLowerCase())
    ));

    return (
        <div className="search-menu-container">
            <input className="search-bar"
                type="text"
                value={input}
                onChange={handleUniversityChange}
                placeholder="Enter university..."
            />
            {input && !university && filteredUniversities.length > 0 && (
                <ul className="dropdown-menu">
                    {filteredUniversities.map((result) => (
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
                <button 
                    className="confirm-button"
                    onClick={() => handleClick(isUniversityChosen)}
                >
                    <strong>CONFIRM</strong>
                </button>
            )}
        </div>
    );  
};
