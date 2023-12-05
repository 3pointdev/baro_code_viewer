import { Expose } from "class-transformer";

export default class MachineDto {
  @Expose({ name: "edge_id" })
  public readonly edgeId: number = 0;

  @Expose({ name: "enterprise_id" })
  public readonly enterpriseId: number = 0;

  @Expose({ name: "machine_no" })
  public readonly machineNo: string = "";

  public readonly autostart: boolean = true;

  public readonly cnctype: string = "";

  public readonly comment: string = "";

  public readonly id: string = "";

  public readonly ip: string = "";

  public readonly mode: string = "";

  public readonly modtime: string = "";

  public readonly name: string = "";

  public readonly port: number = 0;

  public readonly status: string = "";

  public readonly transmitter: string = "";
}
