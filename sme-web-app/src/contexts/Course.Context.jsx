import React, { useState, useEffect } from 'react'
import { getAllCourse, updateCourseHistory } from '../services/course.service';

export const CourseContext = React.createContext({courses: []})

export const CourseContextProvider = (props) => {
    const[courses, setCourse] = useState();
    const[selectedCourse, selectCourse] = useState();

    useEffect(() => {
        fetchCourse()
    }, [])

    const fetchCourse = () => {
        getAllCourse().then(res => {
            setCourse(res?.data?.filter(x=>x.isPublished))
        })
    }

    const setCourseHistory = (courseDetails) => {
        updateCourseHistory(courseDetails)
    }

    return <CourseContext.Provider value={{courses: courses, fetchCourse, selectedCourse, selectCourse, setCourseHistory}}>
        {props.children}
    </CourseContext.Provider>
}