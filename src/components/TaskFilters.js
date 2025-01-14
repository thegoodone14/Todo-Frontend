import React from 'react';

const TaskFilters = ({ filters, onFilterChange }) => {
    return (
        <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Barre de recherche */}
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Rechercher une tâche..."
                        value={filters.search || ''}
                        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                {/* Filtre par priorité */}
                <div>
                    <select
                        value={filters.priority || ''}
                        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">Toutes les priorités</option>
                        <option value="LOW">Basse</option>
                        <option value="MEDIUM">Moyenne</option>
                        <option value="HIGH">Haute</option>
                    </select>
                </div>

                {/* Filtre par statut */}
                <div>
                    <select
                        value={filters.isDone === undefined ? '' : filters.isDone.toString()}
                        onChange={(e) => {
                            const value = e.target.value;
                            onFilterChange({
                                ...filters,
                                isDone: value === '' ? undefined : value === 'true'
                            });
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">Tous les statuts</option>
                        <option value="false">À faire</option>
                        <option value="true">Terminé</option>
                    </select>
                </div>

                {/* Tri */}
                <div>
                    <select
                        value={filters.sortBy || 'dueDate'}
                        onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="dueDate">Date d'échéance</option>
                        <option value="priority">Priorité</option>
                        <option value="description">Description</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;
