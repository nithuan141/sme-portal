import dayjs from "dayjs"
import React, { useContext, useState } from "react"
import { Button, Row, Table } from "reactstrap"
import { ProfitContext } from "../../contexts/Profit.Context"
import { DATE_FORMAT } from "../../utils/constants"
import { getInvestmentType } from "../Investment/InvestmentTable"
import { PageHeader } from "../Shared"
import { PaginationBar } from "../Shared/PaginationBar"

export const ProfitTable = () => {
    const { profits, fetchProfit } = useContext(ProfitContext)
    const [currentPage, setPage] = useState(1)
    const [searchText, onSearch] = useState('')

    return <>
        <PageHeader title={'Profits'}  onSearch={onSearch} />
        <Row>
            <Table striped size="sm" bordered hover style={{ marginTop: '10px' }} className="smeTable">
                <ProfitTableHead />
                <tbody>
                    {profits?.filter(x=> searchText === '' || x.investorName.includes(searchText))
                    .slice((currentPage - 1) * 10, (currentPage * 10)).map((item, index) =>
                        <ProfitDetail
                            key={item.id}
                            item={item}
                            index={index + 1 + ((currentPage - 1) * 10)}
                        />)}
                </tbody>
            </Table>
        </Row>
        <Row>
            <PaginationBar currentPage={currentPage} setPage={setPage} totalPage={Math.ceil(profits?.length / 10)} />
        </Row>
    </>
}

const ProfitDetail = ({ item, index }) => {
    return <tr>
        <td>{index}</td>
        <td>{item.investorName}</td>
        <td>{getInvestmentType(item.invetsmentType)}</td>
        <td>{item.paidAmount}</td>
        <td>{dayjs(item.paidDate).format(DATE_FORMAT)}</td>
    </tr>
}

const ProfitTableHead = () => {
    return <thead>
        <tr>
            <th>#</th>
            <th>Investor</th>
            <th>Investment Type</th>
            <th>Profit Paid</th>
            <th>Paid Date</th>
        </tr>
    </thead>
}