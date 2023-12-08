import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateAlarmCommand } from './commands/create-alarm.command';
import { Alarm } from '../domain/alarm';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(createAlarmCommand: CreateAlarmCommand): Promise<Alarm> {
    return await this.commandBus.execute(createAlarmCommand);
  }

  async findAll(): Promise<Array<Alarm>> {
    return await this.queryBus.execute(new GetAlarmsQuery());
  }
}
