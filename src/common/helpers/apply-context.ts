export default (template: string, context: Record<string, any>): string => {
    for(const key in context) {
        template.replace(`{{ ${key} }}`, context[key]);
    }

    return template;
};