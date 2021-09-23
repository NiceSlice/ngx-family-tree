import { PersonModel } from '../Person';

export class FamilyModel {
  constructor(public selectedPerson?: PersonModel, public parents?: PersonModel[], public children?: PersonModel[]) {}
}
