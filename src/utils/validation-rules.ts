export type ValidationRule = (value: string) => true | string;

export function lengthRule(
  minLength: number,
  maxLength?: number,
): ValidationRule {
  return function (value: string): true | string {
    if (maxLength !== undefined) {
      if (value.length < minLength || value.length > maxLength) {
        return `Input must be between ${minLength} and ${maxLength} characters.`;
      }
    } else {
      if (value.length < minLength) {
        return `Input must be at least ${minLength} characters.`;
      }
    }
    return true;
  };
}

export function emailRule(value: string): true | string {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) || "Please enter a valid email.";
}

export function requiredRule(value: string): true | string {
  return !!value || "This field is required.";
}
