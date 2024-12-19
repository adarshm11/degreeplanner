import React, { useState } from 'react';
import universities from "./universities.json";
import sjsu_majors from './majors/sjsu_majors.json';
import ucsc_majors from "./majors/ucsc_majors.json";
import umn_majors from "./majors/umn_majors.json";
import './SearchMenu.css';
import { motion, AnimatePresence } from 'framer-motion';

// SearchMenu component to select university and major
export function SearchMenu() {

    const [university, setUniversity] = useState(null);
    const [major, setMajor] = useState("");
    const [input, setInput] = useState("");
    const [isUniversityChosen, setIsUniversityChosen] = useState(false);
    const [currentPage, setCurrentPage] = useState("university");

    // Handles change in university search input
    const handleUniversityChange = (e) => {
        setInput(e.target.value);
        setUniversity(null);
    }

    // Handles change in major search input
    const handleMajorChange = (e) => {
        setInput(e.target.value);
        setMajor(null);
    }

    // Handles selection of a university
    const handleSelectedUniversity = (uni) => {
        setUniversity(uni);
        setInput(uni.name);
        setIsUniversityChosen(true);
    }
    
    // Handles selection of a major
    const handleSelectedMajor = (maj) => {
        setMajor(maj);
        setInput(maj);
    }

    // Handles "Next" button click after a university is chosen
    const handleClick = (firstStepDone) => {
        if (firstStepDone) {
            setInput("");
            setCurrentPage("major");
        }
    }

    // Handles "Back" button click to go back to university selection
    const handleBackClick = () => {
        setInput("");
        setCurrentPage("university");
    }

    // Determine majors based on selected university
    const majors =
        university?.id === "SJSU" ? sjsu_majors :
        university?.id === "UCSC" ? ucsc_majors : 
        university?.id === "UMN" ? umn_majors : 
        [];

    // Filter universities based on search input
    const filteredUniversities = universities.filter((uni =>
        uni.name.toLowerCase().includes(input.toLowerCase()) ||
        uni.id.toLowerCase().includes(input.toLowerCase())
    ));

    // Filter majors based on search input
    const filteredMajors = majors.filter(maj =>
        maj.toLowerCase().includes(input.toLowerCase())
    );
    
    return (
        <div className="search-menu-container">
            <AnimatePresence>
                {/* University selection page */}
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

                {/* Major selection page */}
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
                        {/* Button to go back to university selection */}
                        <button 
                            className="menu-button"
                            onClick={() => handleBackClick()}
                        >
                            <strong>BACK</strong>
                        </button>
                        
                        {/* Confirm major selection */}
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