import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AlarmFactory } from './../../domain/factories/alarm.factorie';
import { CreateAlarmCommand } from './create-alarm.command';
import { Alarm } from 'src/alarms/domain/alarm';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly alarmfactory: AlarmFactory,
  ) {}

  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  async execute(command: CreateAlarmCommand): Promise<Alarm> {
    this.logger.debug(`Received command ${command.constructor.name}`);

    const alarm = this.alarmfactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );

    this.eventPublisher.mergeObjectContext(alarm);

    alarm.commit();

    return alarm;
  }
}
