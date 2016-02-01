export class Tweet {
  id_str: string;
  created_at: string;
  text: string;
  user_screen_name: string;
  user_name: string;
  user_profile_image_url: string;

  constructor(
    id_str: string,
    created_at: string,
    text: string,
    user_screen_name: string,
    user_name: string,
    user_profile_image_url: string
  ) {
      this.id_str = id_str;
      this.created_at = created_at;
      this.text = text;
      this.user_screen_name = user_screen_name;
      this.user_name = user_name;
      this.user_profile_image_url = user_profile_image_url;
    }
}