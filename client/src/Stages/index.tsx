import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AxiosInstance from '../_Utils/AxiosInstance';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Paper
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { StyledTableCell, StyledTableRow } from '../StyledTable';
import Panel from '../Panel';
import DrawerPanel from '../DrawerPanel';

interface Stage {
    _id: string;
    name: string;
    description: string;
    sequence: number;
    isFinalStage: boolean;
    slug: string;
}

const Stages: React.FC = () => {
    const [stages, setStages] = useState<Stage[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sequence, setSequence] = useState(0);
    const [isFinalStage, setIsFinalStage] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [slug, setSlug] = useState('');
    const [editingStage, setEditingStage] = useState<Stage | null>(null);
    useEffect(() => {
        fetchStages();
    }, []);

    const fetchStages = async () => {
        try {
            console.log("Getting Stages")
            const response = await AxiosInstance().get('/stages');
            setStages(response.data);
        } catch (error) {
            console.error('Error fetching stages:', error);
        }
    };

    const createStage = async () => {
        try {
            const newStage = { name, description, sequence, isFinalStage, slug };
            const response = await AxiosInstance().post('/stages', { data: newStage });
            setStages([...stages, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error creating stage:', error);
        }
    };

    const updateStage = async () => {
        if (!editingStage) return;
        try {
            const updatedStage = { ...editingStage, name, description, sequence, isFinalStage, slug };
            const response = await AxiosInstance().put(`/stages/${editingStage._id}`, { data: updatedStage });
            setStages(stages.map(stage => (stage._id === editingStage._id ? response.data : stage)));
            resetForm();
        } catch (error) {
            console.error('Error updating stage:', error);
        }
    };

    const deleteStage = async (id: string) => {
        try {
            await axios.delete(`/stages/${id}`);
            setStages(stages.filter(stage => stage._id !== id));
        } catch (error) {
            console.error('Error deleting stage:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setSequence(0);
        setIsFinalStage(false);
        setSlug('');
        setEditingStage(null);
    };

    const handleEdit = (stage: Stage) => {
        setEditingStage(stage);
        setName(stage.name);
        setDescription(stage.description);
        setSequence(stage.sequence);
        setIsFinalStage(stage.isFinalStage);
        setSlug(stage.slug);
    };

    return (
        <Box p={3}>
            <DrawerPanel title='New Stage' open={addNew} onClose={() => { setAddNew(false) }} ctas={<Box display="flex" gap={2}>
                <Button type="submit" variant="contained" color="primary">{editingStage ? 'Update' : 'Save'}</Button>
                {editingStage && <Button type="button" variant="outlined" onClick={resetForm}>Cancel</Button>}
            </Box>}>
                <Box component="form" onSubmit={e => { e.preventDefault(); editingStage ? updateStage() : createStage(); }} display="flex" flexDirection="column" gap={2}>
                    <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required />
                    <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} required />
                    <TextField label="Sequence" type="number" value={sequence} onChange={e => setSequence(Number(e.target.value))} required />
                    <FormControlLabel control={<Checkbox checked={isFinalStage} onChange={e => setIsFinalStage(e.target.checked)} />} label="Is Final Stage" />
                    <TextField label="Slug" value={slug} onChange={e => setSlug(e.target.value)} required />

                </Box>
            </DrawerPanel>
            <Panel title='Stages' actionables={[
                <Button variant="contained" startIcon={<Add />} size='small' onClick={() => setAddNew(true)}>
                    New Stage
                </Button>
            ]}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Final Stage</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {stages.map(stage => (
                                <StyledTableRow key={stage._id}>
                                    <StyledTableCell>{stage.name}</StyledTableCell>
                                    <StyledTableCell>{stage.description}</StyledTableCell>
                                    <StyledTableCell>{stage.isFinalStage ? 'Yes' : 'No'}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(stage)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteStage(stage._id)}>
                                            <Delete />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Panel>
            {/* <Typography variant="h4" gutterBottom>Stages</Typography> */}


        </Box>
    );
};

export default Stages;