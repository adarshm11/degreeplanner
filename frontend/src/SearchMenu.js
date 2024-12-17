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
    const [currentPage, setCurrentPage] = useState("university");

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
            setInput("");
            setCurrentPage("major");
        }
    }

    const handleBackClick = () => {
        setInput("");
        setCurrentPage("university");
    }

    const majors =
        university?.id === "SJSU" ? sjsu_majors :
        university?.id === "UCSC" ? ucsc_majors : 
        university?.id === "UMN" ? umn_majors : 
        [];

    const filteredUniversities = universities.filter((uni =>
        uni.name.toLowerCase().includes(input.toLowerCase()) ||
        uni.id.toLowerCase().includes(input.toLowerCase())
    ));

    const filteredMajors = majors.filter(maj =>
        maj.toLowerCase().includes(input.toLowerCase())
    );
    
    return (
        <div className="search-menu-container">
            <AnimatePresence>
                {currentPage === "university" && (
                    <motion.div
                        key="university-page"
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.5 }}
                        className="university-page"
                    >
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
                                className="menu-button"
                                onClick={() => handleClick(isUniversityChosen)}
                            >
                                <strong>CONFIRM</strong>
                            </button>
                        )}
                    </motion.div>
                )}

                {currentPage === "major" && (
                    <motion.div
                        key="major-page"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                        className="major-page"
                    >
                        <input className="search-bar"
                            type="text"
                            value={input}
                            onChange={handleMajorChange}
                            placeholder="Enter major..."
                        />
                        {input && filteredMajors.length > 0 && (
                            <ul className="dropdown-menu">
                                {filteredMajors.map((result, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSelectedMajor(result)}
                                    >
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button 
                            className="menu-button"
                            onClick={() => handleBackClick()}
                        >
                            <strong>BACK</strong>
                        </button>
                        
                        {major && (
                            <button 
                                className="menu-button"
                                onClick={() => alert(`You selected ${university.name} and major ${major}`)}
                            >
                                <strong>CONFIRM</strong>
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
