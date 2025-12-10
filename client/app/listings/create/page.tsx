'use client';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';

export default function CreateListing() {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('PlayStation 5');
    const [condition, setCondition] = useState('LIKE_NEW');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [baseRentalPrice, setBaseRentalPrice] = useState('');
    const [city, setCity] = useState('Lahore');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:4000/api/listings', {
                title,
                platform,
                condition,
                purchasePrice,
                baseRentalPrice,
                city,
                allowedDurations: ['1 week'],
                region: 'R2',
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Game listed successfully!');
            window.location.href = '/dashboard';
        } catch (error) {
            toast.error('Failed to create listing');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 max-w-2xl">
                <Card className="border-white/10 bg-card/50">
                    <CardHeader>
                        <CardTitle>List a Game</CardTitle>
                        <p className="text-muted-foreground text-sm">Earn money by renting out your idle games.</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Game Title</label>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Elden Ring" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Platform</label>
                                    <select
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <option>PlayStation 5</option>
                                        <option>PlayStation 4</option>
                                        <option>Xbox Series X</option>
                                        <option>Nintendo Switch</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Condition</label>
                                    <select
                                        value={condition}
                                        onChange={(e) => setCondition(e.target.value)}
                                        className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <option value="NEW">New</option>
                                        <option value="LIKE_NEW">Like New</option>
                                        <option value="GOOD">Good</option>
                                        <option value="ACCEPTABLE">Acceptable</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Purchase Price (PKR)</label>
                                    <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="e.g. 15000" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Weekly Rental (PKR)</label>
                                    <Input type="number" value={baseRentalPrice} onChange={(e) => setBaseRentalPrice(e.target.value)} placeholder="e.g. 2000" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">City</label>
                                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Lahore" required />
                            </div>

                            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Click to upload game photos</p>
                            </div>

                            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                                Create Listing
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
