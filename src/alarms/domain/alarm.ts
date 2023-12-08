import { AlarmItem } from './alarm-item';
import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAsknowledged: boolean;
  public items = new Array<AlarmItem>();

  constructor(public readonly id: string) {}

  acknowledge() {
    this.isAsknowledged = true;
  }

  addAlarmItem(alarmItem: AlarmItem) {
    this.items.push(alarmItem);
  }
}
