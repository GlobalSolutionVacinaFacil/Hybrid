import { Expose, Transform } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class DependentListResource {
  @IsString()
  readonly id: string;

  constructor(init?: DependentListResource) {
    this.id = init?.id!;
  }
}

export class DependentResource {
  @IsString()
  readonly id: string;

  @IsString()
  @Expose({ name: "fullName" })
  readonly name: string;

  @IsDate()
  @Expose({ name: "bornAt" })
  @Transform(({ value }) => new Date(value))
  readonly birthday: Date;

  constructor(init?: DependentResource) {
    this.id = init?.id!;
    this.name = init?.name!;
    this.birthday = init?.birthday!;
  }
}

export class DependentInputResource {
  @IsString()
  @Expose({ name: "name" })
  readonly fullName: string;

  @IsDate()
  @Expose({ name: "birthday" })
  @Transform(({ value }) => new Date(value))
  readonly bornAt: Date;

  @IsString()
  @Expose({ name: "userId" })
  readonly guardianId: string;

  constructor(init?: DependentInputResource) {
    this.fullName = init?.fullName!;
    this.bornAt = init?.bornAt!;
    this.guardianId = init?.guardianId!;
  }
}

export class DependentUpdateResource {
  @IsString()
  @Expose({ name: "name" })
  readonly fullName: string;

  @IsDate()
  @Expose({ name: "birthday" })
  @Transform(({ value }) => new Date(value))
  readonly bornAt: Date;

  @IsString()
  readonly id: string;

  constructor(init?: DependentUpdateResource) {
    this.fullName = init?.fullName!;
    this.bornAt = init?.bornAt!;
    this.id = init?.id!;
  }
}
