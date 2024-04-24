import React from 'react';
import { Button } from 'reactstrap';

function JobCards({title, salary, equity, company, id, applied, sendApply}){
    function apply(e) {
        e.preventDefault();
        sendApply(id);

    }

    return (
        <div className='JobCard card'> 
            <div className='card-body'>
                <h3 className='card-title'>{title}</h3>
                <p>{company}</p>
                <div>
                    <small>
                        {`Salary: ${salary},
                            Equity: ${equity}`}
                    </small>
                </div>
                {applied.includes(id) ? <Button disabled={true}>Apply!</Button> : <Button color={'danger'} onClick={apply}>Apply!</Button>}
            </div>
        </div>
    );
}

export default JobCards;