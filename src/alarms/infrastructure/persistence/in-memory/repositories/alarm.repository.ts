import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upset-materalized-alarm.repository';
import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarm.repositoy';
import { AlarmReadModel } from './../../../../domain/read-models/alarm-read.model';

import { Alarm } from '../../../../domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';

import { AlarmMapper } from '../mappers/alarm.mapper';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';

export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = await this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        ...this.materializedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return;
    }
  }
}
