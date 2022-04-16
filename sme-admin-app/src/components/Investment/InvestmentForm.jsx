import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

export const InvestmentForm = ({ handleChange, investment }) => {
    const {
        investedAmount,
        profitPercentage,
        investedDate,
        investmentMonths,
        invetsmentType,
    } = investment
    return <Form>
        <FormGroup>
            <Label for="investedAmount">Amount</Label>
            <Input
                id="investedAmount"
                name="investedAmount"
                placeholder="Investment Amount"
                value={investedAmount}
                type="number"
                min={1}
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="profitPercentage">Profit %</Label>
            <Input
                id="profitPercentage"
                name="profitPercentage"
                placeholder="Profit %"
                value={profitPercentage}
                type="number"
                min={1}
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Label for="investmentMonths">Duration (Months)</Label>
            <Input
                id="investmentMonths"
                name="investmentMonths"
                placeholder="Duration (Months)"
                value={investmentMonths}
                type="number"
                min={1}
                onChange={handleChange}
            />
        </FormGroup>

        <FormGroup>
            <Label for="investedDate">Invested Date</Label>
            <Input
                id="investedDate"
                name="investedDate"
                placeholder="Invested Date"
                value={investedDate}
                type="date"
                onChange={handleChange}
            />
        </FormGroup>
        
        <FormGroup>
            <Label for="invetsmentType">Type of Investment</Label>
            <Input
                id="invetsmentType"
                name="invetsmentType"
                type="select"
                value={invetsmentType}
                onChange={handleChange}
            >
                <option value={1}>Monthly</option>
                <option value={2}>Compounding </option>
            </Input>
        </FormGroup>
    </Form>
}