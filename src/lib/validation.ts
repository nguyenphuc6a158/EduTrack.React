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

/**
 * Reusable duplicate name validation rule
 * @param existingItems Array of items to check for duplicates
 * @param fieldName The display name of the field (e.g., "tên khối lớp")
 * @param currentId Optional ID of the current item being edited (to exclude from comparison)
 * @returns Ant Design Rule object
 */
export const duplicateNameValidator = (
    existingItems: Array<{ id?: number; [key: string]: any }>,
    fieldName: string,
    currentId?: number
): Rule => ({
    validator: (_, value) => {
        if (!value) return Promise.resolve();
        
        const isDuplicate = existingItems.some(item => 
            item.gradeName?.toLowerCase() === value.toLowerCase() ||
            item.className?.toLowerCase() === value.toLowerCase() ||
            item.name?.toLowerCase() === value.toLowerCase()
        );

        if (isDuplicate) {
            if (currentId) {
                const isCurrentItem = existingItems.find(item => item.id === currentId);
                if (isCurrentItem && 
                    (isCurrentItem.gradeName?.toLowerCase() === value.toLowerCase() ||
                     isCurrentItem.className?.toLowerCase() === value.toLowerCase() ||
                     isCurrentItem.name?.toLowerCase() === value.toLowerCase())) {
                    return Promise.resolve();
                }
            }
            return Promise.reject(new Error(`${fieldName} này đã tồn tại`));
        }
        
        return Promise.resolve();
    }
});
