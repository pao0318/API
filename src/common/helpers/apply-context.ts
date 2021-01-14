export default (template: string, context: Record<string, string>): string => {
    for(const key in context) {
        template = template.replace(`{{ ${key} }}`, context[key]);
    }
    
    return template;
};