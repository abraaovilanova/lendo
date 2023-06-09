import './Progressbar.css'

function Progressbar({value = 0}) {
    return (
        <div className="progress-bar">
            <div className="bg-bar">
                <div className="fg-bar" style={{width: `${value * 100}%`}}>
                </div>
            </div>
        </div>
    )
}

export default Progressbar