import { DynamicModule, Module, Type } from '@nestjs/common';

import { AlarmsController } from './presenters/http/alarms.controller';
import { AlarmFactory } from './domain/factories/alarm.factorie';
import { AlarmsService } from './application/alarms.service';
import { CreateAlarmCommandHandler } from './application/commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './application/queries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from './application/handlers/alarm-created.query-handler';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
  ],
})
export class AlarmsModule {
  static withInfrastucture(infrastructureModule: Type | DynamicModule) {
    // 👈 new static method
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
