import { Tasks } from '../lib/db_types';
import { BaseRepository } from './BaseRepository';

export class TasksRepository extends BaseRepository<Tasks> {
  constructor() {
    super('tasks');
  }
}
