import React from 'react';
import type { Program, Trainer, Testimonial, GalleryImage } from './types';

export const GmailIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
    </svg>
);

export const PROGRAMS_DATA: Program[] = [
    {
        icon: 'ST',
        title: 'Strength Training',
        description: 'Build muscle and increase your raw strength with our state-of-the-art equipment and personalized plans.'
    },
    {
        icon: 'HI',
        title: 'Cardio & Endurance',
        description: 'Improve your cardiovascular health and stamina with high-intensity interval training and endurance workouts.'
    },
    {
        icon: 'YM',
        title: 'Yoga & Flexibility',
        description: 'Enhance your flexibility, balance, and mental clarity through our guided yoga and stretching sessions.'
    }
];

export const TRAINERS_DATA: Trainer[] = [
    {
        image: 'https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
        name: 'Johnathan Doe',
        specialty: 'Strength & Conditioning'
    },
    {
        image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
        name: 'Jane Smith',
        specialty: 'HIIT & Cardio'
    },
    {
        image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
        name: 'Alex Ray',
        specialty: 'Yoga & Mobility'
    },
    {
        image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
        name: 'Emily White',
        specialty: 'CrossFit & Functional Fitness'
    }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
    {
        quote: "Joining CFS9 was the best decision I've ever made for my health. The trainers are incredibly supportive and the community is motivating!",
        name: 'Priya Sharma',
        memberSince: 'Member since 2022',
        image: '/gallery/13.jpg'
    },
    {
        quote: "I've seen amazing results in just a few months. The facilities are top-notch and always clean. Highly recommend to anyone serious about fitness.",
        name: 'Rohan Verma',
        memberSince: 'Member since 2023',
        image: '/gallery/6.jpg'
    },
    {
        quote: "A fantastic gym with a great atmosphere. I've not only improved my physical strength but also my mental well-being. It feels like a second home.",
        name: 'Anika Reddy',
        memberSince: 'Member since 2021',
        image: '/gallery/13.jpg'
    }
];

export const GALLERY_IMAGES: GalleryImage[] = [
    { src: '/gallery/1.jpg', alt: 'Man lifting weights' },
    { src: '/gallery/2.jpg', alt: 'Man doing pull-ups' },
    { src: '/gallery/3.jpg', alt: 'Woman on a rowing machine' },
    { src: '/gallery/4.jpg', alt: 'Man working out with battle ropes' },
    { src: '/gallery/5.jpg', alt: 'Dumbbells on a rack' },
    { src: '/gallery/6.jpg', alt: 'Group fitness class with kettlebells' },
    { src: '/gallery/7.jpg', alt: 'Training session' },
    { src: '/gallery/8.jpg', alt: 'Gym equipment' },
    { src: '/gallery/9.jpg', alt: 'Workout area' },
    { src: '/gallery/10.jpg', alt: 'Fitness training' },
    { src: '/gallery/11.jpg', alt: 'Strength training' },
    { src: '/gallery/12.jpg', alt: 'Gym facility' }
];
