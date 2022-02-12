import React, { useContext, useState } from "react"
import { Input, Row, Table } from "reactstrap"
import { CourseContext } from "../../contexts/Course.Context"
import { PageHeader } from "../Shared"
import { PaginationBar } from "../Shared/PaginationBar"
import { NewCourseModal } from "./NewCourseModal"

export const CourseTable = () => {
    const { courses, fetchCourse } = useContext(CourseContext)
    const[currentPage, setPage] = useState(1)
    const[showCourseModal, setCourseModal] = useState(false)
    const [searchText, onSearch] = useState('')

    const toggleCourseModal = () => {
        fetchCourse()
        setCourseModal(!showCourseModal)
    }

    return <>
        <PageHeader title={'Courses'} add={toggleCourseModal} onSearch={onSearch}/>
        <Row>
            <Table striped size="sm" bordered hover style={{marginTop: '10px'}} className="smeTable">
                <CourseTableHead />
                <tbody>
                    {courses?.filter(x=> searchText === '' || x.title.includes(searchText))
                    .slice((currentPage-1) * 10 , (currentPage * 10)).map((item, index) => <CourseDetail key={item.id} item={item} index={index+1 + ((currentPage-1) * 10)}/>)}
                </tbody>
            </Table>
        </Row>
        <Row>
        <PaginationBar currentPage={currentPage} setPage={setPage} totalPage={Math.ceil(courses?.length/10)}/>
        </Row>
        <NewCourseModal isOpen={showCourseModal} isEdit={false} toggle={toggleCourseModal} />
    </>
}

const CourseDetail = ({ item, index }) => {
    return <tr>
        <td>{index}</td>
        <td>{item.title}</td>
        <td>{item.durationMinutes}</td>
        <td>{item.tags}</td>
        <td><Input type="checkbox" checked={item.isPublished} readOnly/></td>
    </tr>
}

const CourseTableHead = () => {
    return <thead>
        <tr>
            <th>#</th>
            <th>Course Title</th>
            <th>Duration (minutes)</th>
            <th>Tags</th>
            <th>Published</th>
        </tr>
    </thead>
}