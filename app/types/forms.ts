export interface FormOption { label: string; value: string | number }
export interface FormFieldDefinition { key: string; label: string; type?: 'text' | 'password' | 'number' | 'date' | 'select'; required?: boolean; placeholder?: string; options?: FormOption[] }
