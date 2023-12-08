import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AlarmsInfrastructureModule } from './alarms/infrastructure/alarms-infrastructure.module';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.intreface';
import { AlarmsModule } from './alarms/alarms.module';

@Module({
  imports: [CoreModule, CqrsModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    // 👈 new method
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        AlarmsModule.withInfrastucture(
          AlarmsInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
