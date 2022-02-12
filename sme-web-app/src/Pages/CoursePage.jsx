import React from 'react'
import { Course } from '../components/Course'
import { Header } from '../components/Shared'
import { CourseContextProvider } from '../contexts/Course.Context'

export const CoursePage = () => {
    return <CourseContextProvider>
        <Header />
        <Course />
    </CourseContextProvider>
}