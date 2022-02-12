import React from 'react'

export const CourseFilter = () => {
    return <div className="course-listing__filter">

        <div className="dropdown">
            <button className="course-listing__filter-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown"
                aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M21 4v2h-1l-5 7.5V22H9v-8.5L4 6H3V4h18zM6.404 6L11 12.894V20h2v-7.106L17.596 6H6.404z"
                        fill="rgba(115,115,115,1)" />
                </svg> Filter
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <div className="course-listing__wrapper">
                    <div className="course-listing__search">
                        <input type="search" placeholder="Search" />
                        <button className="course-listing__search-btn" aria-label="Search"><svg width="17" height="18"
                            viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6.93333" cy="6.93333" r="6.43333" stroke="#80868B" />
                            <path d="M10.6667 11.7333L16.0001 17.0667" stroke="#80868B" />
                        </svg>
                        </button>
                    </div>
                    <div className="course-listing__filter w-100">
                        <p>Category</p>
                        <label className="chckbox">Stock market
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>

                    </div>
                    <div className="course-listing__filter w-100">
                        <p>Category</p>
                        <label className="chckbox">Stock market
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
}