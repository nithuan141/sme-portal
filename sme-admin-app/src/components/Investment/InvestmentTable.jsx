import dayjs from "dayjs"
import React, { useContext, useState, useEffect } from "react"
import { Button, Row, Table } from "reactstrap"
import { InvestmentContext } from "../../contexts/Investment.Context"
import { DATE_FORMAT } from "../../utils/constants"
import { PageHeader } from "../Shared"
import { PaginationBar } from "../Shared/PaginationBar"
import { NewInvestmentModal } from "./NewInvestmentModal"
import { PayProfitModal } from "./PayProfitModal"
import { ShowConfirmationModal } from "./ShowConfirmationModal"

export const InvestmentTable = ({ isWithdrawn = false }) => {
    const { investments, fetchInvestment } = useContext(InvestmentContext)
    const [currentPage, setPage] = useState(1)
    const [showPayProfitModal, setPayProfitModal] = useState(false)
    const [selectedInvestement, setSelectedInvestment] = useState()
    const [searchText, onSearch] = useState('')
    const [showConfirm, setConfirmModal] = useState(false)
    const [showInvestModal, setShowInvestModal] = useState(false)
    const [isEditInvestment, setIsEditInvestement] = useState(false)

    const togglePayProfitModal = () => {
        fetchInvestment()
        setPayProfitModal(!showPayProfitModal)
    }

    const toggleConfirmModal = () => {
        fetchInvestment()
        setConfirmModal(false)
    }

    const toggleInvestModal = () => {
        fetchInvestment()
        setShowInvestModal(!showInvestModal)
    }

    /**
     * Set isEditInvestment as false when the Modal is closed.
     */
     useEffect(() => {
        if (!showInvestModal && isEditInvestment) {
            setSelectedInvestment(null)
            // added delay to not show Add New Investment Title while closing
            const timer = setTimeout(() => setIsEditInvestement(false), 300);
            return () => clearTimeout(timer);
        }
    }, [showInvestModal])

    /**
     * Toggle InvestModal Modal when View/Edit button is clicked.
     */
    useEffect(() => {
        if (isEditInvestment) {
            toggleInvestModal()
        }
    }, [isEditInvestment]);

    return (
      <>
        {isWithdrawn ? (
          <h3>Deposit Withdrawn Requests</h3>
        ) : (
          <PageHeader title={"Investments"} onSearch={onSearch} />
        )}

        <Row>
          <Table
            striped
            size="sm"
            bordered
            hover
            style={{ marginTop: "10px" }}
            className="smeTable"
          >
            <InvestmentTableHead />
            <tbody>
              {investments
                ?.filter(
                  (x) =>
                    (searchText === "" ||
                      x.investorName.includes(searchText)) &&
                    (!isWithdrawn || x.status === 1)
                )
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((item, index) => (
                  <InvestmentDetail
                    key={item.id}
                    item={item}
                    index={index + 1 + (currentPage - 1) * 10}
                    setSelectedInvestment={setSelectedInvestment}
                    setPayProfitModal={setPayProfitModal}
                    setConfirmModal={setConfirmModal}
                    setIsEditInvestement={setIsEditInvestement}
                  />
                ))}
            </tbody>
          </Table>
        </Row>
        <Row>
          <PaginationBar
            currentPage={currentPage}
            setPage={setPage}
            totalPage={Math.ceil(investments?.length / 10)}
          />
          <PayProfitModal
            isOpen={showPayProfitModal}
            toggle={togglePayProfitModal}
            userId={selectedInvestement?.userId}
            investment={selectedInvestement}
          />
          <ShowConfirmationModal
            toggle={toggleConfirmModal}
            isOpen={showConfirm}
            investment={selectedInvestement}
          />
        </Row>
        <NewInvestmentModal
          userId={selectedInvestement?.userId}
          userName={selectedInvestement?.investorName}
          isEdit={isEditInvestment}
          isOpen={showInvestModal}
          toggle={toggleInvestModal}
          selectedInvestement={selectedInvestement}
        />
      </>
    );
}

const InvestmentDetail = ({ item, index, setSelectedInvestment, setPayProfitModal, setConfirmModal, setIsEditInvestement }) => {
    return (
      <tr>
        <td>{index}</td>
        <td>{item.investorName}</td>
        <td>{item.investedAmount}</td>
        <td>{item.profitPercentage}</td>
        <td>{dayjs(item.investedDate).format(DATE_FORMAT)}</td>
        <td>{item.investmentMonths}</td>
        <td>{getInvestmentType(item.invetsmentType)}</td>
        <td style={{ backgroundColor: item.status === 1 ? "#ffc107" : "" }}>
          {getStatus(item.status)}
        </td>
        <td>
          {(item.status === 0 || item.status === 1) && (
            <>
              <Button
                color="primary"
                outline
                onClick={() => {
                  setSelectedInvestment(item);
                  setPayProfitModal(true);
                }}
              >
                Pay Profit
              </Button>{" "}
              <Button
                color="primary"
                outline
                onClick={() => {
                  setSelectedInvestment(item);
                  setConfirmModal(true);
                }}
              >
                Return
              </Button>{" "}
            </>
          )}
        </td>
        <td>
          <Button
            outline
            color="primary"
            onClick={() => {
              setSelectedInvestment(item);
              setIsEditInvestement(true);
            }}
          >
            View/Edit
          </Button>
        </td>
      </tr>
    );
}

const InvestmentTableHead = () => {
    return <thead>
        <tr>
            <th>#</th>
            <th>Investor</th>
            <th>Amount</th>
            <th>Profit %</th>
            <th>Invested On</th>
            <th>Duration (Months)</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
            <th>View/Edit</th>
        </tr>
    </thead>
}

export const getStatus = (status) => {
    switch (status) {
        case 0:
            return "Active"
        case 1:
            return "Withdrawn Requested"
        case 2:
            return "Withdrawn"
        default:
            return "Active"
    }
}

export const getInvestmentType = (type) => {
    switch (type) {
        case 1:
            return "Monthly"
        case 2:
            return "Compounding "
        default:
            return "N/A"
    }
}