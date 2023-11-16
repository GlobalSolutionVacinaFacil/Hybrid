import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsString } from "class-validator";

export class GuardianResource {
  @IsString()
  readonly id: string;

  @IsString()
  readonly fullName: string;

  @IsString()
  @Transform(({ value }) => new Date(value))
  readonly bornAt: Date;

  @IsEmail()
  readonly email: string;

  constructor(init?: GuardianResource) {
    this.id = init?.id!;
    this.fullName = init?.fullName!;
    this.bornAt = init?.bornAt!;
    this.email = init?.email!;
  }
}

export class GuardianInputResource {
  @IsString()
  readonly fullName: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly bornAt: Date;

  @IsEmail()
  readonly email: string;

  constructor(init?: GuardianInputResource) {
    this.fullName = init?.fullName!;
    this.bornAt = init?.bornAt!;
    this.email = init?.email!;
  }
}
