import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';
import { AcknowledgeAlarmCommandHandler } from './commands/acknowledge-alarm.command-handler';
import { AlarmAcknowledgedEventHandler } from './event-handlers/alarm-acknowledged.event-handler';
import { CascadingAlarmsSaga } from './application/sagas/cascading-alarms.saga';
import { NotifyFacilitySupervisorCommandHandler } from './commands/notify-facility-supervisor.command-handler';
import { UnacknowledgedAlarmsSaga } from './application/sagas/unacknowledged-alarms.saga';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
    AcknowledgeAlarmCommandHandler,
    AlarmAcknowledgedEventHandler,
    CascadingAlarmsSaga,
    NotifyFacilitySupervisorCommandHandler,
    UnacknowledgedAlarmsSaga,
  ],
})
export class AlarmsModule {
  static withInfrastucture(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
