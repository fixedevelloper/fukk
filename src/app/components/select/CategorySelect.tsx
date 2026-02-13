"use client";

import Select from "react-select";
import React from "react";
import { Category } from "../../../types/FrontType";

type CategoryOption = {
    value: number;
    label: string;
    data: Category;
};

export default function CategorySelect({
                                           options,
                                           onChange,
                                           placeholder = "Tous categories",
                                       }: {
    options: Category[];
    onChange: (category: Category | null) => void;
    placeholder?: string;
}) {

    const selectOptions: CategoryOption[] = options.map(cat => ({
        value: cat.id,
        label: cat.name,
        data: cat,
    }));

    return (
        <Select<CategoryOption, false>
            options={selectOptions}
            placeholder={placeholder}
            className="select-active select2-hidden-accessible"
            classNamePrefix="react-select"
            isSearchable
            onChange={(option) => onChange(option ? option.data : null)}
        />
    );
}

