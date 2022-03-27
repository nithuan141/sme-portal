import React, { useState, useEffect } from 'react'
import { getAllCourse, updateCourseHistory } from '../services/course.service';

export const CourseContext = React.createContext({ courses: [] })

export const CourseContextProvider = (props) => {
    const [courses, setCourse] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedCourse, selectCourse] = useState();
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState([])
    const [uniqueCategories, setuniqueCategories] = useState([])

    useEffect(() => {
        fetchCourse()
    }, [])

    useEffect(() => {
        let category = [] 
        courses?.forEach(c => {
            category = [...category, ...(c.tags.split(',').map(x=>x.toLowerCase().trim()))]
        })
        setuniqueCategories([...new Set(category.map(item => item))]);

    }, [courses])

    const fetchCourse = () => {
        setLoading(true)
        getAllCourse().then(res => {
            setCourse(res?.data?.filter(x => x.isPublished))
            setLoading(false)
        }).catch(err => {
            console.error(err);
            setLoading(false)
        })
    }

    const setCourseHistory = (courseDetails) => {
        updateCourseHistory(courseDetails)
    }
    
    const hastagsInFilter = (tags) => {
        const allTags = tags.split(',')
        let found = false
        allTags.forEach(tag => {
            if (filters.includes(tag.toLowerCase().trim())) {
                found = true
            }
        })
        return found;
    }

    const filteredData = courses?.filter(x => (!searchText || x.title.toLowerCase().includes(searchText))
        && (filters.length === 0 || hastagsInFilter(x.tags)))

    return <CourseContext.Provider
        value={{
            courses: filteredData,
            fetchCourse,
            selectedCourse,
            selectCourse,
            setCourseHistory,
            setSearchText,
            searchText,
            setFilters,
            filters,
            loading,
            uniqueCategories
        }}>
        {props.children}
    </CourseContext.Provider>
}