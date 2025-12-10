'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "Elden Ring: Shadow of the Erdtree",
        subtitle: "Return to the Lands Between",
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
        color: "from-yellow-600/20 to-orange-900/20"
    },
    {
        id: 2,
        title: "Marvel's Spider-Man 2",
        subtitle: "Be Greater. Together.",
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed92a30563138523f7c96b2c80d554a015514923.png",
        color: "from-red-600/20 to-blue-900/20"
    },
    {
        id: 3,
        title: "God of War Ragnarök",
        subtitle: "Myths of Midgard",
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
        color: "from-blue-600/20 to-cyan-900/20"
    }
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl mb-12 group">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 bg-gradient-to-br ${slides[current].color}`}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center p-12">
                        <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-8">
                            <div className="space-y-4 max-w-xl z-10">
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-md border border-white/10"
                                >
                                    Featured Rental
                                </motion.span>
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-5xl font-bold font-outfit text-white leading-tight"
                                >
                                    {slides[current].title}
                                </motion.h2>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xl text-white/80"
                                >
                                    {slides[current].subtitle}
                                </motion.p>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Button size="lg" className="mt-4">Rent Now</Button>
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="hidden md:block relative z-10"
                            >
                                <img
                                    src={slides[current].image}
                                    alt={slides[current].title}
                                    className="w-[500px] h-[300px] object-cover rounded-xl shadow-2xl shadow-black/50 rotate-3 hover:rotate-0 transition-transform duration-500"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100">
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100">
                <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === current ? 'bg-white w-6' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}
