interface PostEntryRequest {
  entryNo?: number;
  url: string;
  user_id: string | null | undefined;
  site_name: string;
  inclede_category: string | null;
  inclede_subject: string | null;
  inclede_creater: string | null;
  max_count: number | null;
  limit_day: number | null;
  version: string;
}
export default PostEntryRequest;