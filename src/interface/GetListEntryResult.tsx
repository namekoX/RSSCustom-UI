import GetListEntryResultItem from "./GetListEntryResultItem";

interface GetListEntryResult {
  valid: boolean;
  validMsg: string;
  pagerTotalCount: number;
  pagerActive: number;
  results: GetListEntryResultItem[];
}
export default GetListEntryResult;