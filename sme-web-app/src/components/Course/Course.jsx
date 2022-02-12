import React, { useContext } from 'react'
import { CourseContext } from '../../contexts/Course.Context'
import { CourseFilter } from './CourseFilter'
import { CourseHeader } from './CourseHeader'
import { CourseList } from './CourseList'
import { CourseDetail } from './CourseDetail'

export const Course = () => {
    const { selectedCourse } = useContext(CourseContext)
    return <>{selectedCourse ?
        <CourseDetail />
        :
        <div className="content-wrapper position-relative">
            <CourseHeader />
            <div className="course-listing position-relative">
                <CourseFilter />
                <CourseList />
            </div>
        </div>
    }
    </>
}