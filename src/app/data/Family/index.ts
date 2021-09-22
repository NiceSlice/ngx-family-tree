import { PersonModel } from '../Person';

export class FamilyModel {
  constructor(public selectedPerson?: PersonModel, public fathers?: PersonModel[], public mothers?: PersonModel[], public children?: PersonModel[]) {}
}
