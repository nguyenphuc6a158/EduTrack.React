import type { Rule } from "antd/es/form";

/**
 * Reusable required validation rule for Ant Design Form
 * @param fieldName The name of the field to display in the message
 * @returns Ant Design Rule object
 */
export const requiredRule = (fieldName: string): Rule => ({
    required: true,
    message: `Vui lòng nhập ${fieldName.toLowerCase()}`,
});

/**
 * Standard email validation rule
 */
export const emailRule: Rule = {
    type: "email",
    message: "Invalid email format",
};
