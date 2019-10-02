import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  AnyType,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
}
  from '@loopback/rest';

import { Emp } from '../models';
import { EmpRepository } from '../repositories';
import { EmpService } from '../services/Emp.service';
import { rejects } from 'assert';
import { promises } from 'fs';

export class HelloController {

  empService: EmpService;

  constructor(
    @repository(EmpRepository) public empRepository: EmpRepository
  ) {
    this.empService = new EmpService(this.empRepository);
  }

  @get('/hello')
  hello(): string {
    return 'Hello world!';
  }
  t1: string | undefined;
  t2: string | undefined;
  @get('/getEmployee')
  async getEmployee(): Promise<string> {

    await this.empService.findEmployee('14').then((value: Emp) => {
      this.t1 = value.city;
      console.log('first logging', this.t1);
    });
    await this.empService.findEmployee('15').then((value: Emp) => {
      this.t2 = value.city;
      console.log('second logging', this.t2);

    });

    return new Promise((resolve, reject) => {
      console.log('t1', this.t1);
      console.log('t2', this.t2);
      if (this.t1 === undefined || this.t2 === undefined) {
        resolve('undefined');
      }
      else if (this.t1 === this.t2) {
        console.log('same solved');
        resolve('same')
      } else {
        console.log('not same solved');
        resolve('different')
      }
    });
  }
  @get('/getEmployee1/{id}')
  async getEmployee1(@param.path.string('id') id: string): Promise<Emp> {
    return new Promise((resolve, reject) => {
      this.empService.findEmployee(id).then((value: Emp) => {
        resolve(value);
      });

    });
  }

  @post('/addEmp')
  async addEmp(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(Emp, {
          title: 'NewEmp',
        }),
      },
    },
  })
  emp: Emp): Promise<Emp> {
    return this.empService.createEmloyee(emp)
  }
  @del('/delete/{id}')
  async delEmp(@param.path.string('id') id: string): Promise<void> {
    return this.empService.deleteEmployee(id);
  }
  @patch('/update/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emp)
        },
      },
    }) emp: Emp) {
    return this.empService.updateEmployee(emp, id);
  }
  //counting employee
  @get('/emps', {
    responses: {
      '200': {
        description: 'Emp  count ',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(@param.query.object('where', getWhereSchemaFor(Emp)) where?: Where<Emp>
  ): Promise<Count> {
    return this.empService.countEmployee();
  }


}
