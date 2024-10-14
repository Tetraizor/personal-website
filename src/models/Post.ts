export default class Post {
  title: string;
  content: string;
  created_at: string;
  tags: string[];
  url_string: string;
  views: number = 0;
  thumbnail_url: string = "";
  post_id: string = "";

  constructor(
    title: string,
    content: string,
    created_at: string,
    url_string: string,
    views: number,
    tags: string[]
  ) {
    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.url_string = url_string;
    this.views = views;
    this.tags = tags;
  }
}
