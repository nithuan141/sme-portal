import React, { useState, useEffect } from 'react'
import { getAllCourse } from '../services/course.service';

export const CourseContext = React.createContext({courses: []})

export const CourseContextProvider = (props) => {
    const[courses, setCourse] = useState();
    const[selectedCourse, selectCourse] = useState()

    useEffect(() => {
        fetchCourse()
    }, [])

    const fetchCourse = () => {
        getAllCourse().then(res => {
            setCourse(res.data)
        })
    }

    return <CourseContext.Provider value={{courses: courses, fetchCourse, selectedCourse, selectCourse}}>
        {props.children}
    </CourseContext.Provider>
}