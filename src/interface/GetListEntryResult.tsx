import GetListEntryResultItem from "./GetListEntryResultItem";

interface GetListEntryResult {
  valid: boolean;
  validMsg: string;
  results: GetListEntryResultItem[];
}
export default GetListEntryResult;