'use server';

import { TableData } from './TableData';

export interface IBaseRepository<T extends TableData> {
  saveEntity(entity: T): Promise<number>;
  saveEntityWithChildren(entity: T, recursive?: boolean): Promise<number>;
  getEntity(id: number): Promise<T | null>;
  getEntities(): Promise<T[]>;
  getEntitiesWithChildren(): Promise<T[]>;
  deleteEntity(entity: T): Promise<void>;
  deleteEntityWithChildren(entity: T): Promise<void>;
  deleteAllEntities(): Promise<void>;
}
