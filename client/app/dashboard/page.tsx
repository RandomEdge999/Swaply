'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { toast } from 'react-hot-toast';
import { Package, ArrowRight, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [rentals, setRentals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'rentals' | 'listings'>('rentals');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return;
        }

        const fetchData = async () => {
            try {
                const userRes = await axios.get('http://localhost:4000/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(userRes.data);

                const rentalsRes = await axios.get('http://localhost:4000/api/rentals/my-rentals', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRentals(rentalsRes.data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAction = async (action: string, rentalId: string) => {
        const token = localStorage.getItem('token');
        try {
            let endpoint = '';
            let body = { rentalId };

            if (action === 'ship') {
                endpoint = '/api/rentals/ship';
                // @ts-ignore
                body.trackingNumber = prompt('Enter Tracking Number:');
                // @ts-ignore
                body.courier = 'TCS';
            } else if (action === 'receive') {
                endpoint = '/api/rentals/receive';
            } else if (action === 'return') {
                endpoint = '/api/rentals/return';
                // @ts-ignore
                body.trackingNumber = prompt('Enter Return Tracking Number:');
                // @ts-ignore
                body.courier = 'TCS';
            } else if (action === 'confirm') {
                endpoint = '/api/rentals/confirm';
            }

            if (!endpoint) return;

            await axios.post(`http://localhost:4000${endpoint}`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Action successful');
            // Refresh rentals
            const rentalsRes = await axios.get('http://localhost:4000/api/rentals/my-rentals', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRentals(rentalsRes.data);
        } catch (error) {
            toast.error('Action failed');
            console.error(error);
        }
    };

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />
            <div className="container mx-auto px-4 pt-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-outfit mb-2">Dashboard</h1>
                        <p className="text-muted-foreground">Manage your rentals and account.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden md:block">
                            <p className="font-bold">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {user?.name[0]}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('rentals')}
                        className={cn("pb-4 px-2 text-sm font-medium transition-colors relative", activeTab === 'rentals' ? "text-primary" : "text-muted-foreground hover:text-foreground")}
                    >
                        My Rentals
                        {activeTab === 'rentals' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('listings')}
                        className={cn("pb-4 px-2 text-sm font-medium transition-colors relative", activeTab === 'listings' ? "text-primary" : "text-muted-foreground hover:text-foreground")}
                    >
                        My Listings
                        {activeTab === 'listings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                </div>

                {activeTab === 'rentals' && (
                    <div className="space-y-4">
                        {rentals.map((rental) => (
                            <Card key={rental.id} className="bg-card/50 border-white/5 hover:border-white/10 transition-colors">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                                            <Package className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{rental.listing.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border",
                                                    rental.status === 'ACTIVE' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                        rental.status === 'OVERDUE' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                            "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                                )}>
                                                    {rental.status.replace(/_/g, ' ')}
                                                </span>
                                                <span>•</span>
                                                <span>{rental.renterId === user.id ? 'Renter' : 'Owner'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full md:w-auto">
                                        {/* Owner Actions */}
                                        {user.id === rental.ownerId && rental.status === 'PENDING_SHIPMENT' && (
                                            <Button onClick={() => handleAction('ship', rental.id)} size="sm" className="w-full md:w-auto">
                                                <Package className="mr-2 h-4 w-4" /> Ship Game
                                            </Button>
                                        )}
                                        {user.id === rental.ownerId && rental.status === 'IN_RETURN_TRANSIT' && (
                                            <Button onClick={() => handleAction('confirm', rental.id)} size="sm" className="w-full md:w-auto bg-green-600 hover:bg-green-700">
                                                <CheckCircle className="mr-2 h-4 w-4" /> Confirm Return
                                            </Button>
                                        )}

                                        {/* Renter Actions */}
                                        {user.id === rental.renterId && rental.status === 'IN_TRANSIT_TO_RENTER' && (
                                            <Button onClick={() => handleAction('receive', rental.id)} size="sm" className="w-full md:w-auto bg-green-600 hover:bg-green-700">
                                                <CheckCircle className="mr-2 h-4 w-4" /> Confirm Received
                                            </Button>
                                        )}
                                        {user.id === rental.renterId && (rental.status === 'ACTIVE' || rental.status === 'OVERDUE') && (
                                            <Button onClick={() => handleAction('return', rental.id)} size="sm" className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700">
                                                <ArrowRight className="mr-2 h-4 w-4" /> Return Game
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {rentals.length === 0 && (
                            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                                <p className="text-muted-foreground">No rentals found.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'listings' && (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                        <p className="text-muted-foreground">You haven't listed any games yet.</p>
                        <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/listings/create'}>
                            List a Game
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
