export class PersonModel {
  constructor(
    public id: number,
    public name: string,
    public sex: 'male' | 'female',
    public fatherId?: number,
    public motherId?: number,
    public childrenId?: number[],
  ) {}
}
