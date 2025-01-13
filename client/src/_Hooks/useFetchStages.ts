import { useState, useEffect } from 'react';
import axios from 'axios';

interface Stage {
    _id: string;
    name: string;
    description: string;
    sequence: number;
    isFinalStage: boolean;
    slug: string;
}

const useFetchStages = () => {
    const [stages, setStages] = useState<Stage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStages = async () => {
        try {
            const response = await axios.get('/stages');
            setStages(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching stages:', error);
            setError('Error fetching stages');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStages();
    }, []);

    return { stages, loading, error, fetchStages };
};

export default useFetchStages;