interface GetEntryResult {
  url:string;
  site_name:string;
  validRegister: boolean;
  validRegisterMsg: string;
  inclede_category:string | null;
  inclede_subject:string | null;
  inclede_creater:string | null;
  max_count:number | null;
  limit_day:number | null;
  version:string;
  }
export default GetEntryResult;