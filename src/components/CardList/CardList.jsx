
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Card from '../Card'
import { useUsers } from '../../providers/UserProvider'

function CardList({ data }) {
    const [filters, setFilters] = useState([])
    const navigate = useNavigate();
    const { user, setUserName } = useUsers()


    useEffect(() => {
        setFilters(data.reduce((acc, curr) => {
            if (!acc?.includes(curr.level)) {
                return [...acc, curr.level]
            }
            return acc
        }, []))
    }, [])

    return (
        <ul>
            {filters.sort().map(filter => {
                return (
                    <div>
                        <h3>{filter}</h3>
                         <ul>
                            {data?.filter(textDoc => textDoc.level === filter).map(elem => {
                            const currTextStatus = [...user.readTexts?.filter(e => e.textId == elem.id)]
                            return (<Card 
                                                                                                title={elem.title} 
                                                                                                level={elem.level}
                                                                                                progress={currTextStatus.length ? (currTextStatus[0].correctAnswers) / (currTextStatus[0].textLength) : 0}
                                                                                                key={elem.id}
                                                                                                handleOnClick={() => navigate(`/fr/${elem.id}`)}
                                                                                            />)})}
                        </ul> 
                    </div>
                )
            })}
        </ul>
    )
}

export default CardList