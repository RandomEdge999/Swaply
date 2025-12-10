'use client';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('RENTER');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:4000/api/auth/register', {
                email,
                password,
                name,
                phone,
                role,
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            toast.success('Account created successfully!');
            window.location.href = '/dashboard';
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">

                    {/* Visual Side */}
                    <div className="hidden md:block space-y-6 order-2 md:order-1">
                        <h1 className="text-4xl font-bold font-outfit leading-tight">
                            Join the <br />
                            <span className="text-primary">Community</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Start renting games or earning money from your collection today.
                        </p>
                        <div className="p-6 rounded-2xl bg-secondary/30 border border-white/5">
                            <h3 className="font-bold mb-2">Why join?</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>• Access to hundreds of games</li>
                                <li>• Verified users only</li>
                                <li>• Secure payments</li>
                            </ul>
                        </div>
                    </div>

                    {/* Form Side */}
                    <Card className="w-full max-w-md mx-auto border-white/10 bg-card/50 order-1 md:order-2">
                        <CardHeader>
                            <CardTitle>Create Account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input
                                        type="tel"
                                        placeholder="+92 300 1234567"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Password</label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">I want to...</label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <option value="RENTER">Rent Games</option>
                                        <option value="OWNER">Lend Games</option>
                                    </select>
                                </div>
                                <Button type="submit" className="w-full" isLoading={isLoading}>
                                    Sign Up
                                </Button>
                                <p className="text-center text-sm text-muted-foreground mt-4">
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-primary hover:underline">
                                        Login
                                    </Link>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
