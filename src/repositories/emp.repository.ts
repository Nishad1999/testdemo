import {DefaultCrudRepository} from '@loopback/repository';
import {Emp, EmpRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmpRepository extends DefaultCrudRepository<
  Emp,
  typeof Emp.prototype.id,
  EmpRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Emp, dataSource);
  }
}
