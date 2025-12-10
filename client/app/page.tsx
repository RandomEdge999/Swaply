'use client';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { Button } from './components/ui/Button';
import { motion } from 'framer-motion';
import { Gamepad2, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              The #1 Game Rental Platform in Pakistan
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-outfit tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Play More. <br /> Pay Less.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Rent the latest PlayStation, Xbox, and Switch games from verified owners in your city. Secure payments, tracked shipping, and zero stress.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/browse">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8">
                  Browse Games <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8">
                  Start Renting
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-primary" />}
              title="Verified & Secure"
              description="Every user is ID-verified. Payments are held securely until you receive the game."
            />
            <FeatureCard
              icon={<Truck className="h-10 w-10 text-blue-400" />}
              title="Tracked Shipping"
              description="Integrated tracking for every rental. Know exactly when your game arrives."
            />
            <FeatureCard
              icon={<Gamepad2 className="h-10 w-10 text-purple-400" />}
              title="Huge Library"
              description="Access thousands of titles across PS5, Xbox, and Switch at a fraction of the cost."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-colors"
    >
      <div className="mb-6 p-4 bg-background rounded-xl inline-block border border-white/5">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-outfit mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
