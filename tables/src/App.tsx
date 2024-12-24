import './App.css'
import {useEffect, useState} from "react";
import arrow from './assets/arrow.svg'

type DataUser = {
    id: number;
    name: string;
    username: string;
}

type SortOrder = {
    id: null | 'arrowUpFlag' | 'arrowDownFlag';
    name: null | 'arrowUpFlag' | 'arrowDownFlag';
    username: null | 'arrowUpFlag' | 'arrowDownFlag';
};

function App() {
    const [data, setData] = useState<DataUser[]>([]);
    const [sortOrder, setSortOrder] = useState<SortOrder>({
        id: null,
        name: null,
        username: null,
    });

    useEffect(() => {
        const API = 'https://jsonplaceholder.typicode.com/users';

        (async () => {
            try {
                const response = await fetch(API);
                const json = await response.json();

                setData(json);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleIdSort = () => {
        if (sortOrder.id === null) {
            setData([...data].sort((a, b) => b.id - a.id));
            setSortOrder((prevState) => ({...prevState, id: 'arrowUpFlag'}));
        } else if (sortOrder.id === 'arrowUpFlag') {
            setData([...data].sort((a, b) => a.id - b.id));
            setSortOrder((prevState) => ({...prevState, id: 'arrowDownFlag'}));
        } else {
            setData([...data]);
            setSortOrder((prevState) => ({...prevState, id: null}));
        }
    };

    const handleStringSort = (key: keyof DataUser) => {
        const sortedString = [...data].sort((a, b) => {
            if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                const result = a[key].localeCompare(b[key]);

                if (result > 0) {
                    return 1;
                } else if (result < 0) {
                    return -1;
                }
            }

            return 0;
        });

        console.log('sortedString:', sortedString);

        if (sortOrder[key] === null) {
            setSortOrder((prevState) => ({...prevState, [key]: 'arrowUpFlag'}));
        } else if (sortOrder[key] === 'arrowUpFlag') {
            setSortOrder((prevState) => ({...prevState, [key]: 'arrowDownFlag'}));
        } else {
            setSortOrder((prevState) => ({...prevState, [key]: null}));
        }

        setData(sortedString);
    };

    const getArrowClass = (key: keyof SortOrder) => {
        if (sortOrder[key] === 'arrowUpFlag') {
            return 'arrow-up';
        }

        if (sortOrder[key] === 'arrowDownFlag') {
            return 'arrow-down';
        }

        return '';
    }

    return (
        <table>
            <thead>
            <tr>
                <th onClick={handleIdSort}>
                    ID
                    <img
                        src={arrow}
                        alt="arrow"
                        className={getArrowClass('id')}
                    />
                </th>
                <th onClick={() => handleStringSort('name')}>
                    NAME
                    <img
                        src={arrow}
                        alt="arrow"
                        className={getArrowClass('name')}
                    />
                </th>
                <th onClick={() => handleStringSort('username')}>
                    USERNAME
                    <img
                        src={arrow}
                        alt="arrow"
                        className={getArrowClass('username')}
                    />
                </th>
            </tr>
            </thead>
            <tbody>
            {data && data.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default App
