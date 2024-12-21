import React, { useState } from 'react';
import { addList } from '../services/listService';

const ListForm = ({ onListAdded }) => {
    const [listName, setListName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addList({ name_List: listName });
            setListName(''); // Réinitialise le champ
            onListAdded();   // Appelle une fonction pour rafraîchir les listes
        } catch (error) {
            console.error("Erreur lors de la création de la liste :", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Nom de la liste"
                required
            />
            <button type="submit">Créer Liste</button>
        </form>
    );
};

export default ListForm;
