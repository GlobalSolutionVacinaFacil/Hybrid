export type InsertGuardian = Omit<Guardian, "id">;
export type FetchGuardian = Pick<Guardian, "id">;

export class Guardian {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;

  constructor(init: Guardian) {
    this.id = init.id;
    this.fullName = init.fullName;
    this.email = init.email;
  }
}
