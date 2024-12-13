import './App.css'
import {useEffect, useState} from "react";

type DataUser = {
    id: number;
    name: string;
    username: string;
}

function App() {
    const [data, setData] = useState<DataUser[]>([]);

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

    const handleColumnSort = () => {
        const newSortData = data.sort((a, b) => a.id - b.id);

        console.log('newSortData: ', newSortData);
        setData([...newSortData]);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th onClick={handleColumnSort}>ID</th>
                    <th>NAME</th>
                    <th>USERNAME</th>
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
