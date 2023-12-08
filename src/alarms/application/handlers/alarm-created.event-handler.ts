import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';

import { SerializedEventPayload } from '../../../shared/domain/interfaces/serializable-event';
import { UpsertMaterializedAlarmRepository } from '../ports/upset-materalized-alarm.repository';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmCreatedEvent>>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmCreatedEvent>) {
    this.logger.log(`Alarm created event: ${JSON.stringify(event)}`);

    // In a real-world application, we would have to ensure that this operation is atomic
    // with the creation of the alarm. Otherwise, we could end up with an alarm that is not reflected
    // in the read model (e.g. because the database operation fails).
    // For more information, check out "Transactional inbox/outbox pattern".
    await this.upsertMaterializedAlarmRepository.upsert({
      // 👈
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity,
      triggeredAt: new Date(event.alarm.triggeredAt),
      isAcknowledged: event.alarm.isAcknowledged,
      items: event.alarm.items,
    });
  }
}
