import { AlarmCreatedEvent } from './../../domain/events/alarm-created.event';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AlarmFactory } from './../../domain/factories/alarm.factorie';
import { CreateAlarmCommand } from './create-alarm.command';
import { CreateAlarmRepository } from '../ports/create-alarm.repository';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  constructor(
    private readonly alarmRepository: CreateAlarmRepository,
    private readonly alarmfactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}

  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  execute(command: CreateAlarmCommand): Promise<any> {
    this.logger.debug(`Received command ${command.constructor.name}`);

    const alarm = this.alarmfactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );

    this.eventBus.publish(new AlarmCreatedEvent(alarm));

    return this.alarmRepository.save(alarm);
  }
}
