'use client';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            toast.success('Welcome back!');
            window.location.href = '/dashboard';
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Login failed');
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
                    <div className="hidden md:block space-y-6">
                        <h1 className="text-4xl font-bold font-outfit leading-tight">
                            Welcome back to <br />
                            <span className="text-primary">Swaply</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Continue your gaming journey. Rent the latest titles or manage your listings.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-32 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/5" />
                            <div className="h-32 rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-white/5" />
                        </div>
                    </div>

                    {/* Form Side */}
                    <Card className="w-full max-w-md mx-auto border-white/10 bg-card/50">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                    <label className="text-sm font-medium">Password</label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" isLoading={isLoading}>
                                    Sign In
                                </Button>
                                <p className="text-center text-sm text-muted-foreground mt-4">
                                    Don't have an account?{' '}
                                    <Link href="/register" className="text-primary hover:underline">
                                        Register
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
