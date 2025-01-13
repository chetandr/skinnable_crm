import React from 'react';
// import AxiosInstance from '../_Utils/AxiosInstance';
import {
    Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import useFetchTemplate, { Template } from '../_Hooks/useFetchTemplate';
import TemplateForm from '../TemplateForm';
import InputField from '../TemplateForm/Components/interface';



const Create: React.FC = () => {
    const params = useParams();
    const templates = useFetchTemplate(params.template as string) as { template: Template; loading: boolean; error: string | null; fetchTemplate: () => Promise<void>; attributes: any[] };
    console.log(templates.template.attributes);
    return !templates.loading ? <TemplateForm fields={templates.template.attributes as InputField[] || []} onSubmit={() => { }} /> : "Loading...";
};

export default Create;