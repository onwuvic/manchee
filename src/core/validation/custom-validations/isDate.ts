/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { enGB } from 'date-fns/locale';
import { parse, isValid } from 'date-fns';

export function IsDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const parsedDate = parse(value, 'P', new Date(), {
            locale: enGB,
          });
          return isValid(parsedDate);
        },
      },
    });
  };
}
