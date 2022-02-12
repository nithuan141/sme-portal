import React, { useContext, useState } from "react"
import { Button, Input, Row, Table } from "reactstrap"
import { UsersContext } from "../../contexts/User.Context"
import { INVESTOR_ROLE } from "../../utils/constants"
import { NewInvestmentModal } from "../Investment/NewInvestmentModal"
import { PageHeader } from "../Shared"
import { PaginationBar } from "../Shared/PaginationBar"
import { NewUserModal } from "./NewUserModal"

export const UserTable = () => {
    const { users, fetchUser } = useContext(UsersContext)
    const [currentPage, setPage] = useState(1)
    const [showUserModal, setUserModal] = useState(false)
    const [showInvestModal, setInvestModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState()
    const [searchText, onSearch] = useState('')

    const toggleUserModal = () => {
        fetchUser()
        setUserModal(!showUserModal)
    }

    const toggleInvestModal = () => {
        fetchUser()
        setInvestModal(!showInvestModal)
    }

    return <>

        <PageHeader title={'Users'} add={toggleUserModal} onSearch={onSearch}/>
        <Row>
            <Table striped size="sm" bordered hover style={{ marginTop: '10px' }} className="smeTable">
                <UserTableHead />
                <tbody>
                    {users?.filter(x=> searchText === '' || x.name.includes(searchText) || x.email.includes(searchText))
                    .slice((currentPage - 1) * 10, (currentPage * 10)).map((item, index) =>
                        <UserDetail key={item.id} setSelectedUser={setSelectedUser} setInvestModal={setInvestModal}
                            item={item} index={index + 1 + ((currentPage - 1) * 10)} />)}
                </tbody>
            </Table>
        </Row>
        <Row>
            <PaginationBar currentPage={currentPage} setPage={setPage} totalPage={Math.ceil(users?.length / 10)} />
        </Row>
        <NewUserModal isOpen={showUserModal} isEdit={false} toggle={toggleUserModal} />
        <NewInvestmentModal userId={selectedUser?.id} userName={selectedUser?.name} isOpen={showInvestModal} toggle={toggleInvestModal} />
    </>
}

const UserDetail = ({ item, index, setSelectedUser, setInvestModal }) => {
    return <tr>
        <td>{index}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.role}</td>
        <td><Input type="checkbox" checked={item.isActive} readOnly/></td>
        <td>{item.role === INVESTOR_ROLE && <Button outline color="primary" onClick={() => {
            setSelectedUser(item)
            setInvestModal(true)
        }}>Invest</Button>}</td>
    </tr>
}

const UserTableHead = () => {
    return <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Active</th>
            <th>Invest</th>
        </tr>
    </thead>
}