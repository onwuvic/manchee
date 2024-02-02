/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { enGB } from 'date-fns/locale';
import { differenceInYears, parse } from 'date-fns';

@ValidatorConstraint({ name: 'notLessThanEighteen', async: false })
export class NotLessThanEighteen implements ValidatorConstraintInterface {
  validate(date: any, args: ValidationArguments) {
    const dateOfBirth = parse(date, 'P', new Date(), {
      locale: enGB,
    });
    const age = differenceInYears(new Date(), dateOfBirth);
    return age >= 18;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'You must be 18+ to sign up!';
  }
}
