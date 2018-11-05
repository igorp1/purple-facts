import styled,  {css} from 'styled-components'
import { colorPrimary } from './_theme';

export const TableStyled = styled.table`
    border-collapse: collapse;
    margin: 0 6px;
    tr:nth-child(even) {background: rgba(0,0,0,.05)}
    td, th{
        padding:  12px;
        box-sizing: border-box;
        border: 1px solid #dee2e6;border-collapse: collapse;
        text-align: center;
    }
    td:first-child{text-align:left}
    ${props=>props.compact && css`
        td, th{padding:2px;}
    `}
    ${props=>props.clean && css`  
        tr:nth-child(even) {background: none}
    `}
    ${props=>props.column1 && css`  
        tbody {
            th:nth-child(1) {background: rgba(0,0,0,.05)}
        }
    `}
    
`

const ComparisonTable = (props) => (
    <TableStyled>
        <thead>
            <tr>
                <th style={{border:'0'}} ></th>
                <th>Selling w/ An Agent</th>
                <th>Sold w/ <span style={{color:colorPrimary, whiteSpace: 'nowrap'}} >Purple Facts</span></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Commissions / Fees</strong></td>
                <td><strong>6%</strong> on average is paid by you, the seller</td>
                <td>NONE</td>
            </tr>
            <tr>
                <td><strong>Who Pays Closing Costs?</strong></td>
                <td><strong>2%</strong> on average is paid by you, the seller</td>
                <td>NONE – We pay all costs</td>
            </tr>
            <tr>
                <td><strong>Inspection &amp; Financing Contingency</strong></td>
                <td><strong>Yes</strong>, up to 15% of sales <a href="http://www.trulia.com/blog/5-reasons-home-sales-fall-prevent/" target="_blank" rel="noopener noreferrer">fall through</a></td>
                <td>NONE</td>
            </tr>
            <tr>
                <td><strong>Appraisal Needed</strong></td>
                <td><strong>Yes</strong>, sale is often subject to appraisal.</td> 
                <td>NONE – We make <strong>cash offers</strong></td>
            </tr>
            <tr>
                <td><strong>Average Days Until Sold</strong></td>
                <td>Around 90 Days</td>
                <td>IMMEDIATE CASH OFFER</td>
            </tr>
            <tr>
                <td><strong>Number of Showings</strong></td>
                <td>It Depends</td>
                <td>Just 1!</td>
            </tr>
            <tr>
                <td><strong>Closing Date</strong></td>
                <td>Around 30-60 days after accepting buyers offer</td>
                <td>The date of YOUR CHOICE</td>
            </tr>
            <tr>
                <td><strong>Who Pays For Repairs?</strong></td>
                <td>Negotiated During Inspection Period</td>
                <td>NONE – We pay for all repairs</td>
            </tr>
        </tbody>    
    </TableStyled>
)



export default ComparisonTable