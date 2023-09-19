import React, { useEffect, useState } from 'react';
import I18n from '../Language';

const PagingTemp = ({
    data = [],
    Columns = 9,
    DataOut = () => [],
    isDisplay = 0
}) => {
    const [TotalPage, setTotalPage] = useState(0);
    const [IndexPage, setIndexPage] = useState(0);

    useEffect(() => {
        let totalPage = Math.ceil(data.length / Columns);
        setTotalPage(totalPage === 0 ? 1 : totalPage);
    }, [data]);

    useEffect(() => {
        if (data.length > 0) {
            if (data.length <= Columns) {
                DataOut(data);
            } else {
                let start = IndexPage * Columns;
                let end = (IndexPage * Columns) + Columns;
                let newData = data.sort((a, b) => b.index - a.index).slice(start, end);
                if (newData.length === 0 && IndexPage !== 0) {
                    let lastPage = Math.ceil(data.length / Columns) - 1;
                    setIndexPage(lastPage);
                } else {
                    DataOut(newData);
                }
            }
        }
        window.scrollTo({
            top: -90,
            behavior: "smooth",
        });
    }, [IndexPage, data]);

    const onChangePage = (key) => {
        let index = IndexPage;
        if (key === 0) setIndexPage(0);
        else if (key === 1) setIndexPage(index - 1);
        else if (key === 2) setIndexPage(index + 1);
        else if (key === 3) setIndexPage(TotalPage - 1);
    }

    return (
        <div className={isDisplay < data.length ? "col-sm-12 col-md-12" : "display-none"}>
            <div className="pagination justify-content-center align-items-center">
                <button disabled={IndexPage === 0} className="page-item btn btn-outline-secondary" onClick={(e) => onChangePage(0)} style={{marginRight: '5px'}}>
                    <i className="fas fa-angle-double-left"></i> {I18n.t("Other.First")}
                </button>
                <button disabled={IndexPage === 0} className="page-item btn btn-outline-secondary" onClick={(e) => onChangePage(1)} style={{marginRight: '5px'}}>
                    <i className="fas fa-angle-left"></i> {I18n.t("Other.Prev")}
                </button>
                {IndexPage + 1} {I18n.t("Other.In")} {TotalPage} {I18n.t("Other.Page")}
                <button disabled={IndexPage === TotalPage - 1} className="page-item btn btn-outline-secondary" onClick={(e) => onChangePage(2)} style={{marginLeft: '5px'}}>
                {I18n.t("Other.Next")} <i className="fas fa-angle-right"></i>
                </button>
                <button disabled={IndexPage === TotalPage - 1} className="page-item btn btn-outline-secondary" onClick={(e) => onChangePage(3)} style={{marginLeft: '5px'}}>
                {I18n.t("Other.Last")} <i className="fas fa-angle-double-right"></i>
                </button>
            </div>
        </div>
    )
}

export const Paging = React.memo(PagingTemp);
