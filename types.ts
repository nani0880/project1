// Fix: Import `ReactNode` to resolve TypeScript error 'Cannot find namespace 'React''.
import type { ReactNode } from 'react';

export interface Program {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface Trainer {
    image: string;
    name: string;
    specialty: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    memberSince: string;
    image: string;
}

export interface GalleryImage {
    src: string;
    alt: string;
}
