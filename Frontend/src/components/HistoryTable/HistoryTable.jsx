import { useEffect, useState } from 'react';
import { getSensorInfo } from '../../services/webService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import './HistoryTable.scss';

function HistoryTable({ gardenId, sensorId }) {
    const [unit, setUnit] = useState('');
    const [historyData, setHistoryData] = useState([]);
    const [filterValue, setFilterValue] = useState({ start: '', end: '' });

    useEffect(() => {
        const getUnit = async () => {
            const raw = await getSensorInfo(sensorId);
            if (raw.EC === 0) setUnit(raw.DT.unit);
        };
        getUnit();
        const getHistoryData = () => {
            const res = [
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
                { time: '4/8/2024, 12:19:08 PM', value: 50 },
            ];
            setHistoryData(res);
        };
        getHistoryData();
    }, []);

    return (
        <div className="history-table">
            <div className="filter d-flex align-items-center mb-3 pt-2 gap-2">
                <label htmlFor="start">Từ</label>
                <input
                    type="date"
                    id="start"
                    className="form-control me-3"
                    value={filterValue.start}
                    onChange={(e) => setFilterValue({ ...filterValue, start: e.target.value })}
                />
                <label htmlFor="end">Đến</label>
                <input
                    type="date"
                    id="end"
                    className="form-control me-4"
                    value={filterValue.end}
                    onChange={(e) => setFilterValue({ ...filterValue, end: e.target.value })}
                />
                <button className="btn btn-primary" disabled={filterValue.start === '' && filterValue.end === ''}>
                    Lọc
                </button>
                <button
                    className="btn btn-danger"
                    disabled={filterValue.start === '' && filterValue.end === ''}
                    onClick={() => setFilterValue({ start: '', end: '' })}
                >
                    Hủy
                </button>
            </div>
            <div className="table border border-dark rounded mb-2 p-2">
                {historyData.length === 0 ? (
                    <p className="text-center fs-5">Loading...</p>
                ) : (
                    historyData.map((data, index) => (
                        <div key={index} className="fs-5 d-flex ps-4">
                            <p className="m-0">{data.time}:</p>
                            <p className="m-auto">
                                {data.value} {unit}
                            </p>
                        </div>
                    ))
                )}
            </div>
            <div className="pagination d-flex justify-content-between">
                <button className="btn btn-outline-primary ms-4">
                    Tải lại <FontAwesomeIcon icon={faArrowRotateLeft} />
                </button>
                <div className="">pagination</div>
            </div>
        </div>
    );
}

export default HistoryTable;
