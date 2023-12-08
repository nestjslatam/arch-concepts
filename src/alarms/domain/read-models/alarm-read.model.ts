export class AlarmReadModel {
  constructor(
    public id: string,
    public name: string,
    public severity: string,
    public triggeredAt: Date,
    public isAcknowledged: boolean,
    public items: Array<{ id: string; name: string; type: string }>,
  ) {}
}
