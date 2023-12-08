import { AutowiredEvent } from 'src/shared/decorators/autowired-event.decorator';
import { Alarm } from '../alarm';

@AutowiredEvent
export class AlarmCreatedEvent {
  constructor(public readonly alarm: Alarm) {}
}
