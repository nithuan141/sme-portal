import httpHelper from './httpserviceutils/HttpHelper'

export const getAllCourse = () => {
    return httpHelper.get(`v1/Course`)
}

export const saveCourse = (course) => {
    return httpHelper.post('v1/Course', course)
}

export const updateCourseHistory = (coursedetails) => {
    return httpHelper.post('v1/CourseHistory', coursedetails)
}