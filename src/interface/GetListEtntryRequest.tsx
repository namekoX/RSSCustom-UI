interface GetListEntryRequest {
  site_name: string | null;
  user_id: string | null | undefined;
  page: number;
  perpage: number;
}
export default GetListEntryRequest;