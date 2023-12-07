export class CreateAlarmCommand {
  constructor(
    public name,
    public severity,
  ) {
    this.name = name;
    this.severity = severity;
  }
}
