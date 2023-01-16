import {ReactNode} from "react";

interface FormInputprops {
    children: ReactNode;
    type?: string;
}

export function FormInput({children, type="text"}: FormInputprops){
    return (
        <div className="flex-input">
            <label>
                {children} 
            </label>
            <div className="input-bar">
                <input type={type} />
            </div>
        </div>
    );

}