import type { Rule } from "antd/es/form";

export const photoRules: Rule[] = [
    {
        required: true,
        validator: (_, value) => {
            if (!value || value.length === 0) {
                return Promise.reject("Please upload image!");
            }
            return Promise.resolve();
        },
    },
];
