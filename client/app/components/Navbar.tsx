'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { Gamepad2, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                        <Gamepad2 className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-2xl font-bold font-outfit tracking-tight">Swaply</span>
                </Link>

                <div className="flex items-center space-x-6">
                    <Link href="/browse" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Browse Games
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/listings/create">
                                <Button variant="outline" size="sm">
                                    List Game
                                </Button>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
