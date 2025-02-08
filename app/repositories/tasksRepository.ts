import { Task } from '@types';
import { Tasks } from '@lib/db_types';
import BaseRepository from './baseRepository';

export default class TaskRepository extends BaseRepository<Task> {
  private static _instance: TaskRepository;

  private constructor() {
    super();
  }

  public static get instance(): TaskRepository {
    if (!this._instance) {
      this._instance = new TaskRepository();
    }
    return this._instance;
  }

  async getEntity(id: string): Promise<Task | null> {
    try {
      const session = await this.auth();
      const userId = session?.user?.id;
      if (!userId) return;

      const result = await this.db
        .selectFrom('tasks')
        .where('id', '=', id)
        .where('user_id', '=', userId as any)
        .selectAll()
        .execute();

      if (result.length === 0) {
        console.log(`Task with ID ${id} not found.`);
        return null;
      }

      //   @ts-expect-error
      const task = mapDBTaskToApp(result[0]);

      return task as Task;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Could not retrieve task.');
    }
  }

  async getEntitiesWithChildren(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }

  async getEntities(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }

  async saveEntity(entity: Task): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async saveEntityWithChildren(
    entity: Task,
    recursive?: boolean,
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async deleteEntity(entity: Task): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteEntityWithChildren(entity: Task): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export function mapDBTaskToApp(task: Tasks): Task {
  return {
    id: task.id.toString(),
    title: task.title,
    description: task.description ?? undefined,
    completed: task.completed ?? false,
    status: (task.status as Task['status']) ?? '',
    priority: (task.priority as unknown as Task['priority']) ?? '',
    date: task.date ? task.date.toString() : undefined,
    table_id: task.table_id ?? '',
  };
}
