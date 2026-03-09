export const categories = [
    {
        id: 1,
        name: 'Cricket',
        icon: '🏏',
        color: 'bg-blue-100',
        subcategories: ['Kit', 'Wears']
    },
    {
        id: 2,
        name: 'Football',
        icon: '⚽',
        color: 'bg-green-100',
        subcategories: ['Kit', 'Wears']
    },
    {
        id: 3,
        name: 'Tennis',
        icon: '🎾',
        color: 'bg-yellow-100',
        subcategories: ['Kit', 'Wears']
    },
];

import img1 from "../../public/images/products (1).png"
import img2 from "../../public/images/products (2).png"
import img3 from "../../public/images/products (3).png"
import img4 from "../../public/images/products (5).png"
import img5 from "../../public/images/products (4).png"
import img6 from "../../public/images/products (6).png"

export const products = [
    
    {
        id: 1,
        name: "Tennis Mat",
        price: 899,
        originalPrice: 1299,
        rating: 4.5,
        image: img1,
        category: "Tennis kit",
        description: "Breathable and sweat-wicking team jersey for maximum comfort.",
        features: ["Moisture Wicking", "Sublimated Design", "Stretchable"]
    },
    
    {
        id: 2,
        name: "Football Training Bibs",
        price: 349,
        originalPrice: 599,
        rating: 4.7,
        image: img2,
        category: "Football Wears",
        description: "High-visibility training bibs for team drills and practice.",
        features: ["Durable Mesh", "Machine Washable", "Multiple Colors"]
    },
    {
        id: 3,
        name: "Tennis Racket Pro",
        price: 2599,
        originalPrice: 3499,
        rating: 4.6,
        image: img3,
        category: "Tennis Kit",
        description: "Lightweight graphite racket for precision and control.",
        features: ["Graphite Body", "Large Sweet Spot", "Optimal Tension"]
    },
    {
        id: 4,
        name: "Tennis Sports Shorts",
        price: 750,
        originalPrice: 999,
        rating: 4.4,
        image: img4,
        category: "Tennis kit",
        description: "Premium sports shorts with deep pockets for tennis balls.",
        features: ["Deep Pockets", "Breathable Fabric", "Quick Dry"]
    }
];
