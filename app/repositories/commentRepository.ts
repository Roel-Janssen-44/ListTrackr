import { Comments } from '../lib/db_types';
import { BaseRepository } from './BaseRepository';

export class CommentRepository extends BaseRepository<Comments> {
  constructor() {
    super('comments');
  }
}
