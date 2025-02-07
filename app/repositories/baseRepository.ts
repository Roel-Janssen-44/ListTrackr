import { auth } from 'auth';
import db from '@/app/lib/db';

export default abstract class BaseRepository<T> {
  protected auth = auth;
  protected db = db;

  private static instances: { [key: string]: BaseRepository<any> } = {};

  protected constructor() {}

  public static async getInstance<T>(
    repoClass: new () => BaseRepository<T>,
  ): Promise<BaseRepository<T>> {
    const className = repoClass.name;
    if (!BaseRepository.instances[className]) {
      BaseRepository.instances[className] = new repoClass();
    }
    return BaseRepository.instances[className] as BaseRepository<T>;
  }

  abstract saveEntity(entity: T): Promise<string>;
  abstract saveEntityWithChildren(
    entity: T,
    recursive?: boolean,
  ): Promise<string>;

  abstract getEntity(id: string): Promise<T | null>;
  abstract getEntities(): Promise<T[]>;
  abstract getEntitiesWithChildren(): Promise<T[]>;

  abstract deleteEntity(entity: T): Promise<void>;
  abstract deleteEntityWithChildren(entity: T): Promise<void>;
}
