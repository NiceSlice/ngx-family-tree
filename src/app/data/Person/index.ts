export class PersonModel {
  constructor(
    public id: number,
    public name: string,
    public sex: string,
    public fathersId: number[] = [],
    public mothersId: number[] = [],
    public childrenId: number[] = [],
  ) {}
}
