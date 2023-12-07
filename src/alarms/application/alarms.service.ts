import { Injectable } from '@nestjs/common';

import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmRepository } from './ports/alarm.repository';
import { AlarmFactory } from '../domain/factories/alarm.factorie';
import { Alarm } from '../domain/alarm';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  async create(createAlarmCommand: CreateAlarmCommand): Promise<Alarm> {
    const alarm = this.alarmFactory.create(
      createAlarmCommand.name,
      createAlarmCommand.severity,
    );

    return await this.alarmRepository.save(alarm);
  }

  async findAll(): Promise<Array<Alarm>> {
    return await this.alarmRepository.findAll();
  }
}
