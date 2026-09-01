import type { Rule } from "antd/es/form";

export const durationRules: Rule[] = [
    {
        type: "number",
        min: 1,
        max: 200000000,
        message: "Duration should be between 1 second and 200,000,000 seconds",
    },
];
