import { DynamicModule, Module, Type } from '@nestjs/common';

import { AlarmsController } from './presenters/http/alarms.controller';
import { AlarmFactory } from './domain/factories/alarm.factorie';
import { AlarmsService } from './application/alarms.service';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmFactory],
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
