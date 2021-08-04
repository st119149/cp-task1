import React from 'react';

import data from '../../data';

import './App.scss';

function App() {

    const [pageIndex, setPageIndex] = React.useState(1);

    const toNextPage = () => {
        if (pageIndex !== Math.ceil(visibleData.length / 30))
            setPageIndex(pageIndex + 1);
    }
    const toPrevPage = () => {
        if (pageIndex !== 1)
            setPageIndex(pageIndex - 1);
    }


    const [term, setTerm] = React.useState('');

    const onChangeSearch = e => {
        setTerm(e.target.value.toLowerCase());
        setPageIndex(1);
    }

    const [sort, setSort] = React.useState({ prop: 'name', ascending: true });

    const onClickSort = e => {
        const value = e.target.textContent;
        let ascending = true;
        if (value === sort.prop)
            ascending = !sort.ascending;
        setSort({ prop: value, ascending: ascending });
        setPageIndex(1);
    };

    const visibleData = data
        .sort((a, b) => {
            const ascending = sort.ascending ? 1 : -1;

            if (a[sort.prop] > b[sort.prop])
                return ascending;
            if (a[sort.prop] < b[sort.prop])
                return -1 * ascending;

            return 0;
        })
        .filter(item =>
            item.name.toLowerCase().includes(term) ||
            String(item.age).includes(term) ||
            String(item.weight).includes(term) ||
            item.color.toLowerCase().includes(term)
        );

    return (
        <div className="app">

            <div className="search">
                <input
                    type="text"
                    placeholder="search"
                    value={term}
                    onChange={onChangeSearch}
                />
            </div>

            <div className="column-title">
                <div onClick={onClickSort}>name</div>
                <div onClick={onClickSort}>age</div>
                <div onClick={onClickSort}>weight</div>
                <div onClick={onClickSort}>color</div>
            </div>

            <div className="table">
                {
                    visibleData.length ?
                        visibleData
                            .map((item) => {
                                return (
                                    <div key={`${item.name}${item.color}${item.index}`} className="table__row">
                                        <div>{item.name}</div>
                                        <div>{item.age}</div>
                                        <div>{item.weight}</div>
                                        <div>{item.color}</div>
                                    </div>
                                );
                            })
                            .filter((item, index) =>
                                index >= (pageIndex - 1) * 30 && index < pageIndex * 30
                            ) :
                        <div>not found</div>
                }
            </div>

            <div className="pagination">
                <div className="arrow"
                    onClick={toPrevPage}
                ></div>

                {
                    Array.from({ length: Math.ceil(visibleData.length / 30) })
                        .map((item, index) =>
                            <div
                                key={index}
                                className={index + 1 === pageIndex ? "circle circle_active" : "circle"}
                            ></div>
                        )
                }

                <div className="arrow arrow_right"
                    onClick={toNextPage}
                ></div>
            </div>

        </div>
    );
}

export default App;