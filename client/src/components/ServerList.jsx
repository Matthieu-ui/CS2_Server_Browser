import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServerList = () => {
    const [servers, setServers] = useState([]);
    const [filteredServers, setFilteredServers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({ region: '', game: '' });
    const [expandedServer, setExpandedServer] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/servers')
            .then(response => {
                setServers(response.data);
                setFilteredServers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching server data:', error);
                setError('Error fetching server data');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filterServers = () => {
            const filtered = servers.filter(server => {
                return (
                    (filter.region === '' || server.region.toString() === filter.region) &&
                    (filter.game === '' || server.product.toLowerCase().includes(filter.game.toLowerCase()))
                );
            });
            setFilteredServers(filtered);
        };

        filterServers();
    }, [filter, servers]);

    const handleExpand = (index) => {
        setExpandedServer(expandedServer === index ? null : index);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 bg-primary">
            <h1 className="text-2xl font-bold mb-4">Server List</h1>

            <div className="flex flex-wrap gap-4 mb-4 ">
                <div>
                    <label htmlFor="region" className="block text-sm font-medium  text-gray-100">Region</label>
                    <select
                        id="region"
                        value={filter.region}
                        onChange={(e) => setFilter({ ...filter, region: e.target.value })}
                        className="mt-1 bg-secondary block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">All Regions</option>
                        {/* Add more regions as needed */}
                        <option value="255">All Regions</option>
                        <option value="1">US East</option>
                        <option value="2">US West</option>
                        <option value="3">South America</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="game" className="block text-sm font-medium text-gray-100">Game</label>
                    <input
                        id="game"
                        type="text"
                        value={filter.game}
                        onChange={(e) => setFilter({ ...filter, game: e.target.value })}
                        className="mt-1 block w-full bg-secondary pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                </div>
            </div>

            <div className="overflow-y-auto h-96 border border-gray-300 rounded-md">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-primary">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Game Port</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Map</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Players</th>
                        
                        </tr>
                    </thead>
                    <tbody className="bg-primary divide-y divide-gray-200">
                        {filteredServers.map((server, index) => (
                            <React.Fragment key={index}>
                                <tr onClick={() => handleExpand(index)} className="hover:bg-secondary cursor-pointer">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.gamePort}</td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.map}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.players} / {server.maxPlayers}</td>

                                </tr>
                                {expandedServer === index && (
                                    <tr>
                                        <td colSpan="11" className="px-6 py-4 bg-gray-50">
                                            <div className="text-sm text-gray-100">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bots</th>
                                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Secure</th>
                                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Dedicated</th>
                                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">OS</th>
                                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Game Type</th>
                                                    </tr>
                                                </thead>



                                                <tr className="hover:bg-gray-100 cursor-pointer">

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.maxPlayers}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.bots}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.secure ? 'Yes' : 'No'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.dedicated ? 'Yes' : 'No'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.os}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{server.gameType}</td>
                                                </tr>





                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServerList;
