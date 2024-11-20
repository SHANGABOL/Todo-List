import React, { useEffect, useState } from 'react';
import './Active.css';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { Complete } from '../Complete/Complete';

interface Props {
    value: string;
}

export const Active = ({ value }: Props) => {
    const [receivedValues, setReceivedValues] = useState<string[]>([]);
    const [editableIndex, setEditableIndex] = useState<number | null>(null);
    const [tempValue, setTempValue] = useState<string>(''); 
    const [propSend, setPropSend] = useState<string[]>([]); 

    useEffect(() => {
        setReceivedValues((prevValues) => {
            if (!prevValues.includes(value) && value) {
                return [...prevValues, value];
            }
            return prevValues;
        });
    }, [value]);

    const deleteTask = (index: number) => {
        setReceivedValues((prevValues) => prevValues.filter((_, i) => i !== index));
    };

    const editTask = (index: number, currentValue: string) => {
        setEditableIndex(index);
        setTempValue(currentValue);
    };

    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempValue(event.target.value);
    };

    const saveEdit = () => {
        if (editableIndex !== null) {
            const newValues = [...receivedValues];
            newValues[editableIndex] = tempValue;
            setReceivedValues(newValues);
            setEditableIndex(null);
            setTempValue('');
        }
    };
    const CompleteTask = () =>{
        setPropSend(receivedValues);
    }

    return (
        <div className="container">
            {/* Left section: Active tasks */}
            <div className="active-section">
                <TableContainer component={Paper} sx={{ width: '100%', marginTop: 2 }}>
                    <Table className="Tablee">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} align="left">
                                    <h2>Active Task</h2>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {receivedValues.map((task, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {editableIndex === index ? (
                                            <TextField
                                                value={tempValue}
                                                onChange={handleEditChange}
                                                onBlur={saveEdit}
                                                autoFocus
                                            />
                                        ) : (
                                            task
                                        )}
                                        <div>
                                            <IconButton color="primary" aria-label="edit" onClick={() => editTask(index, task)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="secondary" aria-label="delete" onClick={() => deleteTask(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            {editableIndex === index && (
                                                <IconButton color="default" aria-label="submit" onClick={saveEdit}>
                                                    <CheckIcon />
                                                </IconButton>
                                            )}
                                            <IconButton color="default" aria-label="complete" onClick={CompleteTask}>
                                                <CheckIcon /> Complete task
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* Right section: Completed tasks */}
            <div className="complete-section">
                <Complete value={propSend} />
            </div>
        </div>
    );
};
