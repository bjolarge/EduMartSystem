import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'matchPassword', async: false })
export class MatchPasswordValidator implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const object = args.object as any;
    return confirmPassword === object[relatedPropertyName];
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must match ${args.constraints[0]}`;
  }
}
