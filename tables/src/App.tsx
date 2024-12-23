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
            setSortOrder((prevState) => ({...prevState, id: 'arrowUpFlag'}));

            setData([...data].sort((a, b) => b.id - a.id));
        } else if (sortOrder.id === 'arrowUpFlag') {
            setSortOrder((prevState) => ({...prevState, id: 'arrowDownFlag'}));

            setData([...data].sort((a, b) => a.id - b.id));
        } else {
            setSortOrder((prevState) => ({...prevState, id: null}));

            setData([...data]);
        }
    };

    const handleStringSort = (key: keyof DataUser) => {
        const sortedString = [...data].sort((a, b) => {
            if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                return a[key].localeCompare(b[key]);
            }

            return a[key] > b[key] ? 1 : -1;
        });

        setData(sortedString);
    };

    const getArrowClass = (order: null | 'arrowUpFlag' | 'arrowDownFlag') => {
        if (order === 'arrowUpFlag') {
            return 'arrow-up';
        }

        if (order === 'arrowDownFlag') {
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
                    <img src={arrow} alt="arrow" className={getArrowClass(sortOrder.id)}/>
                </th>
                <th onClick={() => handleStringSort('name')}>
                    NAME
                    <img src={arrow} alt="arrow" className={getArrowClass(sortOrder.name)}/>
                </th>
                <th onClick={() => handleStringSort('username')}>
                    USERNAME
                    <img src={arrow} alt="arrow" className={getArrowClass(sortOrder.username)}/>
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
