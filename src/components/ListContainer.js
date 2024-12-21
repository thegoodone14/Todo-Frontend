import React, { useEffect, useState } from 'react';
import { getLists } from '../services/listService';
import ListForm from './ListForm';

const ListContainer = () => {
    const [lists, setLists] = useState([]);

    const fetchLists = async () => {
        try {
            const data = await getLists();
            setLists(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des listes :", error);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    return (
        <div>
            <h2>Vos Listes</h2>
            <ListForm onListAdded={fetchLists} />
            <ul>
                {lists.map((list) => (
                    <li key={list.ID_List}>{list.name_List}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListContainer;
