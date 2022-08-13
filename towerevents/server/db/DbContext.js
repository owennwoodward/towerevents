import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from '../models/Comment';
import { TicketSchema } from '../models/Ticket';
import { TowerEventSchema } from '../models/TowerEvent';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  TowerEvent = mongoose.model('TowerEvent', TowerEventSchema)
  Ticket = mongoose.model('Ticket', TicketSchema)
  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
