// Dans components/NavBar.js
import React from 'react';
import LogoutButton from './LogoutButton';

const NavBar = () => {
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        {/* Votre logo ou titre */}
                    </div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;