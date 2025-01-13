import { useState, useEffect } from 'react';
// import axios from 'axios';
import AxiosInstance from '../_Utils/AxiosInstance';

export interface Template {
    name?: string;
    attributes?: Record<string, any>;
}

const useFetchTemplate = (templateName: string) => {
    const [template, setTemplate] = useState<Template>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTemplate = async () => {
        try {
            const response = await AxiosInstance().get(`/template?name=${templateName}`);
            setTemplate(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching stages:', error);
            setError('Error fetching stages');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplate();
    }, []);

    return { template, loading, error, fetchTemplate };
};

export default useFetchTemplate;