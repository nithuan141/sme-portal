import React from 'react'
import { Container } from 'reactstrap'
import { CourseTable } from '../components/Course/CourseTable'
import { Header } from '../components/Shared/Header'
import { CourseContextProvider } from '../contexts/Course.Context'

export const CoursePage =() => {
    return <CourseContextProvider>
        <Header />
        <Container>
            <CourseTable />
        </Container>
    </CourseContextProvider>
}