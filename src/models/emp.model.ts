import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Emp extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  salary?: number;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  designation?: string;


  constructor(data?: Partial<Emp>) {
    super(data);
  }
}

export interface EmpRelations {
  // describe navigational properties here
}

export type EmpWithRelations = Emp & EmpRelations;
