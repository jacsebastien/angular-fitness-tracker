export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: Date; // Optional
    state?: 'completed' | 'cancelled' | null; // Optional, Only 3 values allowed
}
