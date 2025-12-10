'use client';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

interface GameCardProps {
    title: string;
    platform: string;
    price: number;
    rating?: number;
    city: string;
    imageUrl?: string;
    onRent: () => void;
}

export function GameCard({ title, platform, price, rating = 0, city, imageUrl, onRent }: GameCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="overflow-hidden h-full flex flex-col glass hover:border-primary/50 transition-colors">
                <div className="relative h-48 bg-muted">
                    {/* Placeholder for Game Image - In real app use Next/Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gradient-to-br from-gray-800 to-gray-900">
                        {imageUrl ? (
                            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-bold opacity-20">{title[0]}</span>
                        )}
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center text-xs font-medium text-yellow-400">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400" />
                        {rating > 0 ? rating.toFixed(1) : 'New'}
                    </div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-lg leading-tight line-clamp-1 text-white">{title}</h3>
                            <p className="text-sm text-muted-foreground">{platform}</p>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-muted-foreground">
                                <MapPin className="w-3 h-3 mr-1" />
                                {city}
                            </div>
                            <div className="font-bold text-primary text-lg">
                                Rs {price}<span className="text-xs text-muted-foreground font-normal">/wk</span>
                            </div>
                        </div>

                        <Button onClick={onRent} className="w-full" size="sm">
                            Rent Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
