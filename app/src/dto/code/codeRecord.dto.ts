import { Expose } from "class-transformer";

export default class CodeRecordDto {
  @Expose({ name: "active_time" })
  public readonly activeTime: number = 0;
  public readonly date: string = "";
  public readonly lot: number = 0;
  public readonly mid: string = "";
  public readonly mkey: number = 0;
  public readonly program: string = "";
}
