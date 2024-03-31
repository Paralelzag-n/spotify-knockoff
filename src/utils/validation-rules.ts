export type ValidationRule = (value: string) => true | string;

export function lengthRule(
  minLength: number,
  maxLength?: number,
): ValidationRule {
  return function (value: string): string {
    if (maxLength !== undefined) {
      if (value.length < minLength || value.length > maxLength) {
        return `Input must be between ${minLength} and ${maxLength} characters.`;
      }
    } else {
      if (value.length < minLength) {
        return `Input must be at least ${minLength} characters.`;
      }
    }
    return "";
  };
}

export function emailRule(value: string): string {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) ? "" : "Please enter a valid email.";
}

export function requiredRule(value: string): string {
  return !!value ? "" : "This field is required.";
}

//GLOBAL VALIDATION RULE
export function validate(
  value: string,
  rules: Array<(value: string) => string | null>,
): string {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return "";
}
