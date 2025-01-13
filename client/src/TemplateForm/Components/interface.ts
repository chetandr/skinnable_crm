// Define the schema type
export default interface InputField {
    name: string;
    inputType: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
}