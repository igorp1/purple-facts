
import {TableStyled} from './ComparisonTable'
import { DateEpoch } from './_common';

const specialDataDisplay = (data, key) => {
    switch(key){
        case 'email' :
            return <a href={`mailto:${data[key]}`} >{data[key]}</a>
        case 'lastUpdate':
            return <DateEpoch complete epoch={data[key]} />
        case 'city' :
            return <span>{data[key].name}</span>
        default:
            return <span>{typeof data[key] ==='object' ? JSON.stringify(data[key]) : data[key] }</span>
    }
}

const ObjectTable = ({data}) => (
    <TableStyled compact clean column1 style={{width:'100%'}}>
        <tbody>
            {Object.keys(data).filter(key=>key!=='hidden' && data[key]).map(key => (
                <tr key={key}>
                    <th>{key}</th>
                    <td>{specialDataDisplay(data,key)}</td>
                </tr>
            ))}
        </tbody>
    </TableStyled>
)

export default ObjectTable