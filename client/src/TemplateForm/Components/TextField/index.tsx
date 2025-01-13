import TextField from "@mui/material/TextField";
import DynamicTextFieldProps from "./interface";

const DynamicTextField: React.FC<DynamicTextFieldProps> = ({ field, onChange }) => {
    return (
        <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            fullWidth
            margin="normal"
            onChange={onChange}
        />
    );
}

export default DynamicTextField
