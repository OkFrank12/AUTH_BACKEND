export interface iAuth {
  userName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  avatarID?: string;
  post?: [];
}

export interface iPost {
  title?: string;
  content?: string;
  image?: string;
  imageID?: string;
  comments?: [];
  views?: Array<string>;
  likes?: [];
  user?: {};
  category?: string;
}
