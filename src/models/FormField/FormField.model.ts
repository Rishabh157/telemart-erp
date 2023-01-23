export type TextFieldType = {
    name: string;
    label: string;
    placeholder: string;
    type?: "text";
    optionAccessKey?: never;
  };
  
 export type SelectFieldType<OptionAccessKey> = {
    name: string;
    label: string;
    placeholder: string;
    type?: "select";
    optionAccessKey: OptionAccessKey;
  };

  export type FilePickerFieldType = {
    name: string;
    label: string;
    placeholder: string;
    type?: "file-picker";
    optionAccessKey?: never;
  };
  
export type Field<OptionAccessKey> = TextFieldType | SelectFieldType<OptionAccessKey> | FilePickerFieldType;

export type SelectOption= {
  label: string,
  value: string | number
}