'use client';
import Link from 'next/link';
import { Gamepad2, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-card border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-primary/20 p-2 rounded-lg">
                                <Gamepad2 className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-2xl font-bold font-outfit tracking-tight">Swaply</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Pakistan's first and largest peer-to-peer video game rental marketplace. Play more, pay less.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold font-outfit mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/browse" className="hover:text-primary transition-colors">Browse Games</Link></li>
                            <li><Link href="/listings/create" className="hover:text-primary transition-colors">List Your Game</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold font-outfit mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="/safety" className="hover:text-primary transition-colors">Trust & Safety</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold font-outfit mb-4">Connect</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Instagram className="h-4 w-4" />
                            </a>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>support@swaply.pk</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Swaply Technologies. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
