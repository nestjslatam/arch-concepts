export class CreateAlarmCommand {
  constructor(
    public name: string,
    public severity: string,
    public triggeredAt: Date,
    public items: Array<{ name: string; type: string }>,
  ) {}
}
