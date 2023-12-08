export class CreateAlarmDto {
  name: string;
  severity: string;
  triggeredAt: Date;
  items: Array<{ name: string; type: string }>;
}
