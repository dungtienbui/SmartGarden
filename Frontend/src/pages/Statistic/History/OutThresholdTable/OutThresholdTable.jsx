import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getPageOutThresholdData, getSensorInfo } from '../../../../services/webService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRotateLeft,
    faAngleLeft,
    faAngleRight,
    faCaretUp,
    faCaretDown,
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import './OutThresholdTable.scss';

function OutThresholdTable({ gardenId, sensorId, color }) {
    const [unit, setUnit] = useState('');
    const defaultFilter = { start: '', end: '', sortNew: true, outBound: -1 };
    const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
    const [submitFilter, setSubmitFilter] = useState(defaultFilter);
    const [filtered, setFiltered] = useState(false);

    const [pageData, setPageData] = useState([]);
    const [pageCount, setPageCount] = useState(-1);
    const [currPage, setCurrPage] = useState(1);

    const handlePageClick = (event) => {
        getData(event.selected + 1, { ...submitFilter });
    };
    const handleSort = () => {
        const newSubmit = { ...submitFilter, sortNew: !submitFilter.sortNew };
        setSubmitFilter(newSubmit);
        getData(currPage, { ...newSubmit });
    };
    const handleFilterOutBound = () => {
        const newOutBound = submitFilter.outBound === -1 ? 1 : submitFilter.outBound - 1;
        const newSubmit = { ...submitFilter, outBound: newOutBound };
        setSubmitFilter(newSubmit);
        getData(currPage, { ...newSubmit });
    };
    const handleFilterDate = () => {
        if (dateFilter.start !== '' && dateFilter.end !== '') {
            if (new Date(dateFilter.start) >= new Date(dateFilter.end)) {
                alert('Ngày bắt đầu phải trước ngày kết thúc !');
                return;
            }
        }
        const newSubmit = { ...submitFilter, start: dateFilter.start, end: dateFilter.end };
        setSubmitFilter(newSubmit);
        getData(currPage, { ...newSubmit });
        setFiltered(true);
    };
    const handleUnFilterDate = () => {
        setDateFilter(defaultFilter);
        setSubmitFilter(defaultFilter);
        getData(currPage, { ...defaultFilter });
        setFiltered(false);
    };
    const handleRefresh = () => {
        if (submitFilter.start !== '' && submitFilter.end !== '') {
            if (new Date(submitFilter.start) >= new Date(submitFilter.end)) {
                alert('Ngày bắt đầu phải trước ngày kết thúc !');
                return;
            }
        }
        getData(currPage, { ...submitFilter });
    };

    const getData = async (page, filterValue) => {
        const res = await getPageOutThresholdData(gardenId, sensorId, page, 11, filterValue);
        if (res) {
            if (res.EC === 0) {
                if (page > res.DT.numPage) {
                    if (res.DT.numPage === 0) {
                        setPageCount(0);
                        setPageData([]);
                        setCurrPage(1);
                    } else {
                        getData(res.DT.numPage, filterValue);
                    }
                } else {
                    setPageCount(res.DT.numPage);
                    setPageData(res.DT.data);
                    setCurrPage(page);
                }
            } else {
                alert(res.EM);
            }
        } else {
            setPageCount(0);
            setPageData([]);
            setCurrPage(1);
            setSubmitFilter({ ...defaultFilter });
            setDateFilter({ start: '', end: '' });
            setFiltered(false);
        }
    };

    useEffect(() => {
        const getUnit = async () => {
            const raw = await getSensorInfo(sensorId);
            if (raw.EC === 0) setUnit(raw.DT.unit);
        };
        getUnit();
        getData(1, { ...defaultFilter });
    }, [gardenId]);

    return (
        <div className="out-threshold-table row g-0 gap-2">
            <div className="col-4 filter d-flex flex-column gap-2 px-5 mt-5">
                <div className="row align-items-center pe-1">
                    <label htmlFor="start" className="col-4 p-0">
                        Từ
                    </label>
                    <input
                        type="date"
                        id="start"
                        className="form-control col"
                        value={dateFilter.start}
                        onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
                    />
                </div>
                <div className="row align-items-center pe-1">
                    <label htmlFor="end" className="col-4 p-0">
                        Đến
                    </label>
                    <input
                        type="date"
                        id="end"
                        className="form-control col"
                        value={dateFilter.end}
                        onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
                    />
                </div>
                <div className="row gap-2 mt-1 pe-1">
                    <button className="btn btn-danger col" disabled={!filtered} onClick={handleUnFilterDate}>
                        Hủy
                    </button>
                    <button
                        className="btn btn-primary col-8"
                        disabled={dateFilter.start === '' && dateFilter.end === ''}
                        onClick={handleFilterDate}
                    >
                        Lọc
                    </button>
                </div>
            </div>
            <div className="col">
                <div className="border border-secondary rounded rounded-top-4 overflow-hidden mb-2 pb-2 text-center">
                    <table className="">
                        <thead>
                            <tr className="fs-5 text-center border-bottom" style={{ backgroundColor: color + '22' }}>
                                <td className="time py-2" onClick={handleSort}>
                                    Thời gian &nbsp;{' '}
                                    <FontAwesomeIcon
                                        color={color}
                                        className=""
                                        icon={submitFilter.sortNew ? faCaretDown : faCaretUp}
                                    />
                                </td>
                                <td className="py-2">Giá trị</td>
                                <td className="state py-2" onClick={handleFilterOutBound}>
                                    Vượt ngưỡng &nbsp;
                                    {submitFilter.outBound === -1 ? (
                                        <FontAwesomeIcon color={color} className="fa-xs ms-1 pe-2" icon={faFilter} />
                                    ) : (
                                        <p className="d-inline" style={{ color: color }}>
                                            {submitFilter.outBound === 0 ? 'Dưới' : 'Trên'}
                                        </p>
                                    )}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center fs-5 pt-2">
                                        {pageCount === -1 ? 'Loading...' : 'No data'}
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan="3" className="pt-1"></td>
                                    </tr>
                                    {pageData.map((data, index) => (
                                        <tr key={index} className="data-row fs-5">
                                            <td>{data.timestamp}</td>
                                            <td className="d-flex p-0 m-0">
                                                <p className="m-0 text-end">{data.value}</p> &nbsp;{unit}
                                            </td>
                                            <td>{data.isBelowLowerBound === 1 ? 'Dưới' : 'Trên'}</td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="pagination d-flex justify-content-between">
                    <button className="btn btn-outline-primary ms-4" onClick={handleRefresh}>
                        Tải lại <FontAwesomeIcon icon={faArrowRotateLeft} />
                    </button>
                    <ReactPaginate
                        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div>
            </div>
        </div>
    );
}

export default OutThresholdTable;
