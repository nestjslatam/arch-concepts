import { AlarmSeverity } from './../../../../domain/value-objects/alarm-severity';
import { Alarm } from '../../../../domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmItem } from 'src/alarms/domain/alarm-item';
import { AlarmItemEntity } from '../entities/alarm-item.entity';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as 'critical' | 'high' | 'medium' | 'low',
    );

    const alarmModel = new Alarm(alarmEntity.id);
    alarmModel.name = alarmEntity.name;
    alarmModel.severity = alarmSeverity;
    alarmModel.triggeredAt = alarmEntity.triggeredAt;
    alarmModel.isAsknowledged = alarmEntity.isAcknowledged;
    alarmModel.items = alarmEntity.items.map(
      (item) => new AlarmItem(item.id, item.name, item.type),
    );

    return alarmModel;
  }
  static toPersistence(alarm: Alarm) {
    const alarmEntity = new AlarmEntity();
    alarmEntity.id = alarm.id;
    alarmEntity.name = alarm.name;
    alarmEntity.severity = alarm.severity.value;
    alarmEntity.triggeredAt = alarm.triggeredAt;
    alarmEntity.isAcknowledged = alarm.isAsknowledged;
    alarmEntity.items = alarm.items.map((item) => {
      const alarmItemEntity = new AlarmItemEntity();
      alarmItemEntity.id = item.id;
      alarmItemEntity.name = item.name;
      alarmItemEntity.type = item.type;
      return alarmItemEntity;
    });

    return alarmEntity;
  }
}
