import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
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
export class EmpController {
  empService: EmpService;
  constructor(
    @repository(EmpRepository)
    public empRepository: EmpRepository,
  ) {
    this.empService = new EmpService(empRepository);
  }
  @post('/emps', {
    responses: {
      '200': {
        description: 'Emp model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Emp) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emp, {
            title: 'NewEmp',

          }),
        },
      },
    })
    emp: Emp,
  ): Promise<Emp> {
    return this.empRepository.create(emp);
  }
  @get('/emps/count', {
    responses: {
      '200': {
        description: 'Emp model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Emp)) where?: Where<Emp>,
  ): Promise<Count> {
    return this.empRepository.count(where);
  }
  @get('/emps', {
    responses: {
      '200': {
        description: 'Array of Emp model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Emp) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Emp)) filter?: Filter<Emp>,
  ): Promise<Emp[]> {
    return this.empRepository.find(filter);
  }
  @patch('/emps', {
    responses: {
      '200': {
        description: 'Emp PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emp, { partial: true }),
        },
      },
    })
    emp: Emp,
    @param.query.object('where', getWhereSchemaFor(Emp)) where?: Where<Emp>,
  ): Promise<Count> {
    return this.empRepository.updateAll(emp, where);
  }
  @get('/emps/{id}', {
    responses: {
      '200': {
        description: 'Emp model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Emp) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Emp> {
    return this.empRepository.findById(id);
  }
  //update function

  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emp, { partial: true }),
        },
      },
    })
    emp: Emp,
  ): Promise<Emp> {
    await this.empRepository.updateById(id, emp);
    return new Promise((resolve, reject) => {
      this.empRepository.findById(id).then(data => {
        resolve(data);
      })
    })
  }

  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() emp: Emp,
  ): Promise<void> {
    await this.empRepository.replaceById(id, emp);
  }
  @del('/emps/{id}', {
    responses: {
      '204': {
        description: 'Emp DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empRepository.deleteById(id);
  }
}
