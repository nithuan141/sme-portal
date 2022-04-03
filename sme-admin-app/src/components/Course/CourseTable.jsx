import React, { useContext, useState, useEffect } from "react"
import { Input, Row, Table, Button } from "reactstrap"
import { CourseContext } from "../../contexts/Course.Context"
import { PageHeader } from "../Shared"
import { PaginationBar } from "../Shared/PaginationBar"
import { NewCourseModal } from "./NewCourseModal"

export const CourseTable = () => {
    const { courses, fetchCourse } = useContext(CourseContext)
    const [currentPage, setPage] = useState(1)
    const [showCourseModal, setCourseModal] = useState(false)
    const [searchText, onSearch] = useState('')
    const [isEditCourse, setIsEditCourse] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)

    const toggleCourseModal = () => {
        fetchCourse()
        setCourseModal(!showCourseModal)
    }

    /**
     * Handle the View/Edit Button action
     * @param {CourseItem} item 
     */
    const handleViewEditButtonClick = (item) => {
        setIsEditCourse(true)
        setSelectedCourse(item)
    }

    /**
     * Set isEditCourse as false when the Modal is closed.
     */
    useEffect(() => {
        if (!showCourseModal && isEditCourse) {
            setSelectedCourse(null)
            // added delay to not show Add New Course while closing
            const timer = setTimeout(() => setIsEditCourse(false), 300);
            return () => clearTimeout(timer);
        }
    }, [showCourseModal])

    /**
     * Toggle Course Modal when View/Edit button is clicked.
     */
    useEffect(() => {
        if (isEditCourse) {
            toggleCourseModal()
        }
    }, [isEditCourse]);

    return <>
        <PageHeader title={'Courses'} add={toggleCourseModal} onSearch={onSearch} />
        <Row>
            <Table striped size="sm" bordered hover style={{ marginTop: '10px' }} className="smeTable">
                <CourseTableHead />
                <tbody>
                    {courses?.filter(x => searchText === '' || x.title.includes(searchText))
                        .slice((currentPage - 1) * 10, (currentPage * 10)).map((item, index) =>
                            <CourseDetail
                                key={item.id}
                                item={item}
                                index={index + 1 + ((currentPage - 1) * 10)}
                                setIsEditCourse={setIsEditCourse}
                                handleViewEditButtonClick={() => handleViewEditButtonClick(item)}
                            />)}
                </tbody>
            </Table>
        </Row>
        <Row>
            <PaginationBar currentPage={currentPage} setPage={setPage} totalPage={Math.ceil(courses?.length / 10)} />
        </Row>
        <NewCourseModal isOpen={showCourseModal} isEdit={isEditCourse} toggle={toggleCourseModal} selectedCourse={selectedCourse} />
    </>
}

const CourseDetail = ({ item, index, handleViewEditButtonClick }) => {

    const onViewEditButtonClick = () => {
        handleViewEditButtonClick()
    }

    return <tr>
        <td>{index}</td>
        <td>{item.title}</td>
        <td>{item.durationMinutes}</td>
        <td>{item.tags}</td>
        <td><Input type="checkbox" checked={item.isPublished} readOnly /></td>
        <td>
            <Button
                outline
                color="primary"
                onClick={onViewEditButtonClick}
                style={{ width: '100px', marginRight: '10px' }}
            >
                View/Edit
            </Button>
        </td>
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
            <th>View/Edit</th>
        </tr>
    </thead>
}