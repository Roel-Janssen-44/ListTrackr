import { IBaseRepository } from '../abstractions/IBaseRepository';
import { TableData } from '../abstractions/TableData';

import { sql } from '@vercel/postgres';
import { auth } from 'auth';
import db from '../lib/db';

export class BaseRepository<T> implements IBaseRepository<T> {
  //   private db: Database.Database;
  private tableName: string;

  //   public readonly _collection: Collection;

  constructor(tableName: string) {
    //   this.db = new Database(dbPath);
    this.tableName = tableName;
    //   this.db.exec(`CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT)`);
  }

  async saveEntity(entity: T): Promise<number> {
    //   if (entity.id) {
    //     const stmt = this.db.prepare(`UPDATE ${this.tableName} SET id = ? WHERE id = ?`);
    //     stmt.run(entity.id, entity.id);
    //     return entity.id;
    //   } else {
    //     const stmt = this.db.prepare(`INSERT INTO ${this.tableName} DEFAULT VALUES`);
    //     const result = stmt.run();
    //     return result.lastInsertRowid as number;
    //   }

    throw new Error('Method not implemented.');
  }

  async saveEntityWithChildren(
    entity: T,
    recursive: boolean = false,
  ): Promise<number> {
    //   return this.saveEntity(entity); // Recursive logic would depend on the schema
    throw new Error('Method not implemented.');
  }

  async getEntity(id: number): Promise<T | null> {
    //   const stmt = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`);
    //   return stmt.get(id) as T | null;
    throw new Error('Method not implemented.');
  }

  async getEntities(): Promise<T[]> {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      console.warn('Unauthorized access: No user ID found');
      return [];
    }

    try {
      if (!this.isValidTableName(this.tableName)) {
        throw new Error('Invalid table name');
      }
      //   const query = 'SELECT * FROM comments';
      //   console.log('query');
      //   console.log(query);
      //   const data = await sql`${query}`;

      let tableName = 'tasks';
      if (this.tableName === 'tasks') tableName = 'tasks';
      else if (this.tableName === 'comments') tableName = 'comments';
      else if (this.tableName === 'users') tableName = 'users';
      else if (this.tableName === 'orders') tableName = 'orders';

      const test = await db.selectFrom(tableName).selectAll().execute();

      //   console.log('data');
      //   console.log(data);

      console.log('test');
      console.log(test);

      return test as T[];

      //   const data = await sql<{ rows: T[] }>`SELECT * FROM ${this.tableName};`;

      //   const data = await sql`
      //     SELECT * FROM tasks;
      //   `;
      //   console.log('data');
      //   console.log(data);
      //   return data.rows as T[];
    } catch (error) {
      console.error('Database Error:', error);
      return error;
    }
  }

  async getEntitiesWithChildren(): Promise<T[]> {
    //   return this.getEntities(); // Recursive logic would be needed for child entities
    throw new Error('Method not implemented.');
  }

  async deleteEntity(entity: T): Promise<void> {
    //   if (!entity.id) return;
    //   const stmt = this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`);
    //   stmt.run(entity.id);
    throw new Error('Method not implemented.');
  }

  async deleteEntityWithChildren(entity: T): Promise<void> {
    //   this.deleteEntity(entity); // Additional child deletion logic needed
    throw new Error('Method not implemented.');
  }

  async deleteAllEntities(): Promise<void> {
    //   this.db.exec(`DELETE FROM ${this.tableName}`);
    throw new Error('Method not implemented.');
  }

  private isValidTableName(tableName: string): boolean {
    const allowedTableNames = ['comments', 'tasks', 'users', 'orders']; // Only allow specific table names
    return allowedTableNames.includes(tableName);
  }
}
