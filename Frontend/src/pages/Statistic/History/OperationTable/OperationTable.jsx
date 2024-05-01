import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getPageOperationData } from '../../../../services/webService';
import { getUserNames } from '../../../../services/userService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRotateLeft,
    faAngleLeft,
    faAngleRight,
    faCaretUp,
    faCaretDown,
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import './OperationTable.scss';

function OperationTable({ gardenId, deviceId, color }) {
    const [userNames, setUserNames] = useState([]);
    const defaultFilter = { start: '', end: '', operator: '-1', isNewest: true, state: -1 };
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
        const newSubmit = { ...submitFilter, isNewest: !submitFilter.isNewest };
        setSubmitFilter(newSubmit);
        getData(currPage, { ...newSubmit });
    };
    const handleFilterState = () => {
        const newState = submitFilter.state === -1 ? 1 : submitFilter.state - 1;
        const newSubmit = { ...submitFilter, state: newState };
        setSubmitFilter(newSubmit);
        getData(currPage, { ...newSubmit });
    };
    const handleFilterOperator = (operator) => {
        const newSubmit = { ...submitFilter, operator };
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

    useEffect(() => {
        const getUsers = async () => {
            const raw = await getUserNames(deviceId);
            if (raw) setUserNames(raw.DT);
        };
        getUsers();
        getData(1, { ...defaultFilter });
    }, []);

    const getData = async (page, filterValue) => {
        const res = await getPageOperationData(gardenId, deviceId, page, 11, filterValue);
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
        }
    };

    return (
        <div className="operation-table row g-0 gap-2">
            <div className="col-4 filter d-flex flex-column gap-2 px-5 mt-4">
                <div className="row align-items-center mb-4 pe-1">
                    <label htmlFor="select" className="col-6 p-0">
                        Điều khiển bởi
                    </label>
                    <select
                        id="select"
                        className="form-select col"
                        value={submitFilter.operator}
                        onChange={(e) => handleFilterOperator(e.target.value)}
                    >
                        <option value="-1"></option>
                        <option value="0">lịch trình</option>
                        <option value="1">tự động</option>
                        {userNames.map((username, index) => (
                            <option value={username} key={index}>
                                {username}
                            </option>
                        ))}
                    </select>
                </div>
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
                                        icon={submitFilter.isNewest ? faCaretDown : faCaretUp}
                                    />
                                </td>
                                <td className="state py-2" onClick={handleFilterState}>
                                    Hoạt động &nbsp;
                                    {submitFilter.state === -1 ? (
                                        <FontAwesomeIcon color={color} className="fa-xs ms-1 pe-2" icon={faFilter} />
                                    ) : (
                                        <p className="d-inline" style={{ color: color }}>
                                            {submitFilter.state === 0 ? 'Tắt' : 'Bật'}
                                        </p>
                                    )}
                                </td>
                                <td className="py-2">Điều khiển bởi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center fs-5 pt-1">
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
                                            <td className="">{data.time}</td>
                                            <td className="">{data.state === 0 ? 'Tắt' : 'Bật'}</td>
                                            <td className="">
                                                {data.isAppliedSchedule === 1
                                                    ? 'lịch trình'
                                                    : data.isAppliedThreshold === 1
                                                    ? 'tự động'
                                                    : data.operatedBy}
                                            </td>
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

export default OperationTable;
