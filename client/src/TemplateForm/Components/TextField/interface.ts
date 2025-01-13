import InputField from "../interface";

export default interface DynamicTextFieldProps {
    field: InputField,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}  