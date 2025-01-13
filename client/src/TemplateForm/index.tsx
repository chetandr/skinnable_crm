import React from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, Button, Typography, SelectChangeEvent, Grid2, Box } from "@mui/material";
import InputField from "./Components/interface";


interface FormSchema {
    fields?: Record<string, any>;
    onSubmit?: (data: Record<string, any>) => void;
}

const TemplateForm: React.FC<FormSchema> = ({ fields, onSubmit }) => {
    const [formData, setFormData] = React.useState<Record<string, any>>({});

    // Handle input changes
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ name?: string; value: unknown }> | SelectChangeEvent<any>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name as string]: value,
        }));
    };

    // Handle checkbox changes
    const handleCheckboxChange = (name: string, value: string) => {
        setFormData((prev) => {
            const existingValues = prev[name] || [];
            const updatedValues = existingValues.includes(value)
                ? existingValues.filter((v: string) => v !== value)
                : [...existingValues, value];
            return {
                ...prev,
                [name]: updatedValues,
            };
        });
    };

    const renderField = (field: InputField) => {
        switch (field.inputType) {
            case "text":
            case "email":
            case "tel":
            case "date":
            case "password":
                return (
                    <TextField
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        required={field.required}
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                );
            case "select":
                return (
                    <FormControl fullWidth margin="normal" key={field.name}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required={field.required}
                        >
                            {field.options?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case "radio":
                return (
                    <FormControl component="fieldset" key={field.name}>
                        <Typography>{field.label}</Typography>
                        <RadioGroup
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                        >
                            {field.options?.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                );
            case "checkbox":
                return (
                    <FormControl component="fieldset" key={field.name}>
                        <Typography>{field.label}</Typography>
                        <FormGroup>
                            {field.options?.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    control={
                                        <Checkbox
                                            checked={formData[field.name]?.includes(option.value) || false}
                                            onChange={() => handleCheckboxChange(field.name, option.value)}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                );
            case "textarea":
                return (
                    <TextField
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        required={field.required}
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                );
            default:
                return null;
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit && onSubmit(formData);
    };

    const renderFields = (fields: Record<string, any>) => {
        return Object.keys(fields).map((field: string) => (
            fields[field].sub ? (
                <>
                    <Typography variant="h6">{fields[field].label}</Typography>
                    <Grid2 container spacing={2} sx={{ padding: 2 }} key={field}>
                        {renderFields(fields[field].sub)}
                    </Grid2>
                </>
            ) : (
                <Grid2 component="div" size={{ xs: 6, sm: 6, md: 4 }} key={field}>
                    {renderField(fields[field])}
                </Grid2>
            )
        ));
    };
    return (
        <form onSubmit={handleSubmit}>
            {
                fields && <Grid2 container spacing={2} sx={{ padding: 2 }}>
                    {renderFields(fields)}
                </Grid2>}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default TemplateForm;

// Usage example:
const formFields: InputField[] = [
    {
        name: "username",
        inputType: "text",
        label: "Username",
        placeholder: "Enter your username",
        required: true,
    },
    {
        name: "gender",
        inputType: "radio",
        label: "Gender",
        options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
        ],
    },
    {
        name: "hobbies",
        inputType: "checkbox",
        label: "Hobbies",
        options: [
            { value: "reading", label: "Reading" },
            { value: "traveling", label: "Traveling" },
        ],
    },
    {
        name: "country",
        inputType: "select",
        label: "Country",
        options: [
            { value: "usa", label: "USA" },
            { value: "india", label: "India" },
        ],
    },
];

// Example of using the component in an app
<TemplateForm
    fields={formFields}
    onSubmit={(data) => console.log("Form Data: ", data)}
/>;
