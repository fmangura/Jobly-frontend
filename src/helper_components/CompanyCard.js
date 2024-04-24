import React from 'react';
import { useNavigate } from 'react-router-dom'
import './CompanyCard.css'

function CompanyCard({company}){
    const navigate = useNavigate()
    const {name, handle, description} = company;

    return (
        <div className='CompanyCard card' onClick={() => navigate(`/companies/${handle}`)}> 
            <div className='card-body'>
                <h6 className='card-title'>{name}</h6>
                <p>
                    <small>{description}</small>
                </p>
            </div>
        </div>
    );
}

export default CompanyCard;