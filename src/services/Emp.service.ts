import { repository } from "@loopback/repository";
import { EmpRepository } from "../repositories";
import { Emp } from "../models";
import { param } from "@loopback/rest";
export class EmpService {
    constructor(@repository(EmpRepository) public empRepository: EmpRepository) {
    }
    async findEmployee(id: string): Promise<Emp> {
        return this.empRepository.findById(id);
    }
    async createEmloyee(emp: Emp) {
        return this.empRepository.create(emp);
    }
    async deleteEmployee(id: string) {
        return this.empRepository.deleteById(id);
    }
    //for update function
    async updateEmployee(emp: Emp, id: string) {
        return this.empRepository.updateById(id, emp);
    }
    async countEmployee() {
        return this.empRepository.count();
    }

}
