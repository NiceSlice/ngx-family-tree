export class PersonModel {
  constructor(public id: number, public name: string, public sex: string, public parentsId: number[] = [], public childrenId: number[] = []) {}
}
