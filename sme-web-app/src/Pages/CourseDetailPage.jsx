import React from 'react'
import { Course } from '../components/Course'
import { Header } from '../components/Shared'
import { CourseContextProvider } from '../contexts/Course.Context'

export const CourseDetailPage = () => {
    return <CourseContextProvider>
        <Header />
        <Course detail={true} />
    </CourseContextProvider>
}