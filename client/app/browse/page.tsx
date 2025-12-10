'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { GameCard } from '../components/GameCard';
import HeroCarousel from '../components/HeroCarousel';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Search, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Browse() {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/listings');
                setListings(res.data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load listings');
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    const handleRent = async (listingId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return;
        }

        if (!confirm('Are you sure you want to rent this game for 1 week?')) return;

        try {
            await axios.post('http://localhost:4000/api/rentals/request', {
                listingId,
                durationWeeks: 1,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Rental requested successfully!');
            window.location.href = '/dashboard';
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to rent game');
        }
    };

    const filteredListings = listings.filter(l =>
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.platform.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <div className="container mx-auto px-4 pt-24">
                <HeroCarousel />
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-outfit mb-2">Browse Games</h1>
                        <p className="text-muted-foreground">Find your next adventure from verified owners.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search games..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="md">
                            <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-80 bg-card/50 animate-pulse rounded-xl border border-white/5" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredListings.map((listing) => (
                            <GameCard
                                key={listing.id}
                                title={listing.title}
                                platform={listing.platform}
                                price={listing.baseRentalPrice}
                                city={listing.city}
                                rating={listing.owner.ratingAverage}
                                onRent={() => handleRent(listing.id)}
                            />
                        ))}
                    </div>
                )}

                {!loading && filteredListings.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">No games found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
